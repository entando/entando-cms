import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { formValueSelector } from 'redux-form';
import { routeConverter } from '@entando/utils';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import {
  fetchGroups,
  fetchContent,
  clearEditContentForm,
  setOwnerGroupDisable,
  saveContent,
} from 'state/edit-content/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { sendPublishContent } from 'state/contents/actions';
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
  selectedJoinGroups: formValueSelector('editcontentform')(state, 'joinGroups'),
  selectedCategories: getJoinedCategories(state),
  saveType: getSaveType(state),
  loading: getLoading(state).contents,
});

export const mapDispatchToProps = (dispatch, { history, intl }) => ({
  onDidMount: (fetchContentParams) => {
    dispatch(fetchContent(fetchContentParams))
      .catch(() => history.push(routeConverter(ROUTE_CMS_CONTENTS)));
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchCategoryTree());
  },
  onWillUnmount: () => dispatch(clearEditContentForm()),
  onSetOwnerGroupDisable: disabled => dispatch(setOwnerGroupDisable(disabled)),
  onIncompleteData: () => history.push(routeConverter(ROUTE_CMS_CONTENTS)),
  onSubmit: (values, categories) => {
    const { saveType, contentId } = values;
    dispatch(saveContent(values, categories)).then((res) => {
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
  onCancel: () => history.push(routeConverter(ROUTE_CMS_CONTENTS)),
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
