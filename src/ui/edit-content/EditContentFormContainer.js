import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  change, formValueSelector, submit, destroy,
} from 'redux-form';
import { routeConverter } from '@entando/utils';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import {
  fetchGroups,
  fetchContent,
  clearEditContentForm,
  setOwnerGroupDisable,
  saveContent,
} from 'state/edit-content/actions';
import { fetchCategoryTreeAll } from 'state/categories/actions';
import { sendPublishContent } from 'state/contents/actions';
import { setVisibleModal } from 'state/modal/actions';
import EditContentForm from 'ui/edit-content/EditContentForm';
import { getUsername } from '@entando/apimanager';
import { getLocale } from 'state/locale/selectors';
import {
  getOwnerGroupDisabled,
  getContent,
  getWorkMode,
  getGroups,
  getJoinedCategories,
  getSaveType,
} from 'state/edit-content/selectors';
import { getLoading } from 'state/loading/selectors';
import {
  ROUTE_CMS_CONTENTS,
} from 'app-init/routes';
import { CONTINUE_SAVE_TYPE, APPROVE_SAVE_TYPE } from 'state/edit-content/types';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

const publishContentMsgs = defineMessages({
  published: {
    id: 'cms.contents.published',
    defaultMessage: 'Published.',
  },
  unpublished: {
    id: 'cms.contents.unpublished',
    defaultMessage: 'Unpublished.',
  },
  saved: {
    id: 'cms.contents.saved',
    defaultMessage: 'Saved.',
  },
});

export const mapStateToProps = (state, { match: { params } }) => ({
  workMode: getWorkMode(state),
  language: getLocale(state),
  content: getContent(state),
  groups: getGroups(state),
  currentUser: getUsername(state),
  contentId: params.id,
  ownerGroupDisabled: getOwnerGroupDisabled(state),
  selectedJoinGroups: formValueSelector('editcontentform')(state, 'groups'),
  selectedOwnerGroup: formValueSelector('editcontentform')(state, 'mainGroup'),
  status: formValueSelector('editcontentform')(state, 'status'),
  selectedCategories: getJoinedCategories(state),
  saveType: getSaveType(state),
  loading: getLoading(state).editContent,
});

export const mapDispatchToProps = (dispatch, { history, intl }) => ({
  onDidMount: (fetchContentParams) => {
    dispatch(fetchContent(fetchContentParams))
      .catch(() => history.push(routeConverter(ROUTE_CMS_CONTENTS)));
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchCategoryTreeAll());
  },
  onWillUnmount: () => { dispatch(clearEditContentForm()); dispatch(destroy('ContentType')); },
  onSetOwnerGroupDisable: disabled => dispatch(setOwnerGroupDisable(disabled)),
  onIncompleteData: () => history.push(routeConverter(ROUTE_CMS_CONTENTS)),
  onSubmit: (values, categories) => {
    const { saveType, contentId } = values;
    return dispatch(saveContent(values, categories)).then((res) => {
      if (res) {
        dispatch(
          addToast(
            intl.formatMessage(publishContentMsgs.saved),
            TOAST_SUCCESS,
          ),
        );
        if (saveType === APPROVE_SAVE_TYPE) {
          dispatch(sendPublishContent(contentId, 'published'));
          history.push(routeConverter(ROUTE_CMS_CONTENTS));
        } else if (saveType !== CONTINUE_SAVE_TYPE) {
          history.push(routeConverter(ROUTE_CMS_CONTENTS));
        } else {
          dispatch(fetchContent(`/${res.id}`));
        }
      }
    });
  },
  onUnpublish: content => dispatch(sendPublishContent(content.id, 'draft')).then((res) => {
    if (res) {
      dispatch(
        addToast(
          intl.formatMessage(publishContentMsgs.unpublished),
          TOAST_SUCCESS,
        ),
      );
      history.push(routeConverter(ROUTE_CMS_CONTENTS));
    }
  }),
  onSave: () => {
    dispatch(setVisibleModal(''));
    dispatch(submit('editcontentform'));
  },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_CMS_CONTENTS)); },
  changeStatus: value => dispatch(change('editcontentform', 'status', value)),
});

const EditContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(EditContentForm);

export default withRouter(injectIntl(EditContentContainer));
