import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { formValueSelector, submit } from 'redux-form';
import { routeConverter } from '@entando/utils';

import {
  fetchGroups,
  clearEditContentForm,
  setOwnerGroupDisable,
  setWorkMode,
  saveContent,
  fetchContent,
} from 'state/edit-content/actions';
import { setVisibleModal } from 'state/modal/actions';
import { fetchContentType } from 'state/content-type/actions';
import { sendPublishContent } from 'state/contents/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { ROUTE_CMS_CONTENTS } from 'app-init/routes';
import { addToast, TOAST_SUCCESS } from '@entando/messages';

import EditContentForm from 'ui/edit-content/EditContentForm';
import { getUsername } from '@entando/apimanager';
import { getSelectedContentType } from 'state/content-type/selectors';
import { getLocale } from 'state/locale/selectors';

import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

import {
  getGroups,
  getWorkMode,
  getOwnerGroupDisabled,
  getSaveType,
  getContent,
} from 'state/edit-content/selectors';
import {
  CONTINUE_SAVE_TYPE, WORK_MODE_ADD, WORK_MODE_EDIT, APPROVE_SAVE_TYPE,
} from 'state/edit-content/types';

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

export const mapStateToProps = state => ({
  workMode: getWorkMode(state),
  language: getLocale(state),
  groups: getGroups(state),
  currentUser: getUsername(state),
  ownerGroupDisabled: getOwnerGroupDisabled(state),
  selectedJoinGroups: formValueSelector('editcontentform')(state, 'groups'),
  selectedCategories: formValueSelector('editcontentform')(state, 'contentCategories'),
  saveType: getSaveType(state),
  content: getContent(state),
  contentType: getSelectedContentType(state),
});

export const mapDispatchToProps = (dispatch, { intl, history, match: { params } }) => ({
  onDidMount: () => {
    dispatch(setWorkMode(WORK_MODE_ADD));
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchCategoryTree());
    dispatch(fetchContentType(params.contentType))
      .catch(() => history.push(routeConverter(ROUTE_CMS_CONTENTS)));
  },
  onSetOwnerGroupDisable: disabled => dispatch(setOwnerGroupDisable(disabled)),
  onWillUnmount: () => dispatch(clearEditContentForm()),
  onIncompleteData: () => history.push(routeConverter(ROUTE_CMS_CONTENTS)),
  onSubmit: (values, categories) => {
    const { saveType } = values;
    dispatch(saveContent(values, categories)).then((res) => {
      if (res) {
        dispatch(
          addToast(
            intl.formatMessage(publishContentMsgs.saved),
            TOAST_SUCCESS,
          ),
        );
        if (saveType === APPROVE_SAVE_TYPE) {
          const contentId = res.id ? res.id : res[0].id;
          dispatch(sendPublishContent(contentId, 'published'));
          history.push(routeConverter(ROUTE_CMS_CONTENTS));
        } else if (saveType !== CONTINUE_SAVE_TYPE) {
          history.push(routeConverter(ROUTE_CMS_CONTENTS));
        } else if (res && res[0]) {
          dispatch(setWorkMode(WORK_MODE_EDIT));
          dispatch(fetchContent(`/${res[0].id}`));
        } else if (res && res.id) {
          dispatch(setWorkMode(WORK_MODE_EDIT));
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
    }
  }),
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('editcontentform')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_CMS_CONTENTS)); },
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
