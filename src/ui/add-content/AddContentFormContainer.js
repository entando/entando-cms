import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { formValueSelector } from 'redux-form';

import {
  setWorkMode,
  fetchGroups,
  sendPostAddContent,
  setOwnerGroupDisable,
} from 'state/edit-content/actions';

import { fetchCategoryTree } from 'state/categories/actions';
import { ROUTE_CMS_CONTENTMODEL_LIST } from 'app-init/routes';
import { addToast, TOAST_SUCCESS } from '@entando/messages';

import EditContentForm from 'ui/edit-content/EditContentForm';
import { getCurrentUser } from '@entando/apimanager/dist/state/current-user/selectors';

import {
  getGroups,
  getWorkMode,
  getLanguage,
  getNewContentsType,
  getOwnerGroupDisabled,
} from 'state/edit-content/selectors';
import { WORK_MODE_ADD } from 'state/edit-content/types';

const contentModelMsgs = defineMessages({
  saved: {
    id: 'cms.contentmodel.form.saved',
    defaultMessage: '{name} saved.',
  },
});

export const mapStateToProps = state => ({
  workMode: getWorkMode(state),
  language: getLanguage(state),
  contentType: getNewContentsType(state),
  groups: getGroups(state),
  currentUser: getCurrentUser(state),
  ownerGroupDisabled: getOwnerGroupDisabled(state),
  selectedJoinGroups: formValueSelector('editcontentform')(state, 'joinGroups'),
  selectedCategories: formValueSelector('editcontentform')(state, 'contentCategories'),
});

export const mapDispatchToProps = (dispatch, { intl, history }) => ({
  onDidMount: () => {
    dispatch(setWorkMode(WORK_MODE_ADD));
    dispatch(fetchGroups());
    dispatch(fetchCategoryTree());
  },
  onSetOwnerGroupDisable: disabled => dispatch(setOwnerGroupDisable(disabled)),
  onSubmit: values => dispatch(
    sendPostAddContent({
      ...values,
      content: values.editContent,
    }),
  ).then((res) => {
    if (res) {
      dispatch(
        addToast(
          intl.formatMessage(contentModelMsgs.saved, { modelname: values.descr }),
          TOAST_SUCCESS,
        ),
      );
      history.push(ROUTE_CMS_CONTENTMODEL_LIST);
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
