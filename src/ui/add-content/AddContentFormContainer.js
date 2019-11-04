import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { formValueSelector } from 'redux-form';
import { routeConverter } from '@entando/utils';

import {
  fetchGroups,
  clearEditContentForm,
  setOwnerGroupDisable,
  setWorkMode,
  saveContent,
} from 'state/edit-content/actions';
import { sendPublishContent } from 'state/contents/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { ROUTE_CMS_CONTENTS } from 'app-init/routes';
import { addToast, TOAST_SUCCESS } from '@entando/messages';

import EditContentForm from 'ui/edit-content/EditContentForm';
import { getUsername } from '@entando/apimanager';

import { getLocale } from 'state/locale/selectors';

import {
  getGroups,
  getWorkMode,
  getNewContentsType,
  getOwnerGroupDisabled,
  getSaveType,
} from 'state/edit-content/selectors';
import {
  CONTINUE_SAVE_TYPE, APPROVE_SAVE_TYPE, REGULAR_SAVE_TYPE, WORK_MODE_ADD,
} from 'state/edit-content/types';

const publishContentMsgs = defineMessages({
  published: {
    id: 'cms.contents.published',
    defaultMessage: '{name} published.',
  },
  unpublished: {
    id: 'cms.contents.unpublished',
    defaultMessage: '{name} unpublished.',
  },
});

export const mapStateToProps = state => ({
  workMode: getWorkMode(state),
  language: getLocale(state),
  contentType: getNewContentsType(state),
  groups: getGroups(state),
  currentUser: getUsername(state),
  ownerGroupDisabled: getOwnerGroupDisabled(state),
  selectedJoinGroups: formValueSelector('editcontentform')(state, 'joinGroups'),
  selectedCategories: formValueSelector('editcontentform')(state, 'contentCategories'),
  saveType: getSaveType(state),
});

export const mapDispatchToProps = (dispatch, { intl, history }) => ({
  onDidMount: () => {
    dispatch(setWorkMode(WORK_MODE_ADD));
    dispatch(fetchGroups());
    dispatch(fetchCategoryTree());
  },
  onSetOwnerGroupDisable: disabled => dispatch(setOwnerGroupDisable(disabled)),
  onWillUnmount: () => dispatch(clearEditContentForm()),
  onCancel: () => history.push(routeConverter(ROUTE_CMS_CONTENTS)),
  onIncompleteData: () => history.push(routeConverter(ROUTE_CMS_CONTENTS)),
  onSubmit: (values, categories) => {
    const { saveType } = values;
    switch (saveType) {
      case CONTINUE_SAVE_TYPE:
        dispatch(saveContent(values, categories));
        break;
      case APPROVE_SAVE_TYPE:
        dispatch(saveContent(Object.assign(values, { onLine: true }), categories));
        history.push(routeConverter(ROUTE_CMS_CONTENTS));
        break;
      case REGULAR_SAVE_TYPE:
        dispatch(saveContent(values, categories));
        history.push(routeConverter(ROUTE_CMS_CONTENTS));
        break;
      default:
        dispatch(saveContent(values, categories));
        history.push(routeConverter(ROUTE_CMS_CONTENTS));
        break;
    }
  },
  onUnpublish: content => dispatch(sendPublishContent(content.id, 'draft')).then((res) => {
    if (res) {
      dispatch(
        addToast(
          intl.formatMessage(publishContentMsgs.unpublished,
            { modelname: content.description }),
          TOAST_SUCCESS,
        ),
      );
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
