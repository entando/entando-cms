import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { formValueSelector } from 'redux-form';

import {
  fetchGroups,
  setWorkMode,
  fetchContent,
  setOwnerGroupDisable,
} from 'state/edit-content/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import EditContentForm from 'ui/edit-content/EditContentForm';
import { getCurrentUser } from '@entando/apimanager/dist/state/current-user/selectors';

import {
  getOwnerGroupDisabled,
  getContent,
  getWorkMode,
  getGroups,
  getLanguage,
} from 'state/edit-content/selectors';
import { WORK_MODE_EDIT } from 'state/edit-content/types';

export const mapStateToProps = state => ({
  workMode: getWorkMode(state),
  language: getLanguage(state),
  content: getContent(state),
  groups: getGroups(state),
  currentUser: getCurrentUser(state),
  ownerGroupDisabled: getOwnerGroupDisabled(state),
  selectedJoinGroups: formValueSelector('editcontentform')(state, 'joinGroups'),
  selectedCategories: formValueSelector('editcontentform')(state, 'contentCategory'),
});

// eslint-disable-next-line
export const mapDispatchToProps = (dispatch, { intl, history }) => ({
  onDidMount: () => {
    dispatch(setWorkMode(WORK_MODE_EDIT));
    dispatch(fetchContent());
    dispatch(fetchGroups());
    dispatch(fetchCategoryTree());
  },
  onSetOwnerGroupDisable: disabled => dispatch(setOwnerGroupDisable(disabled)),
  onSubmit: values => dispatch(console.log('Posting Editting of a form', values)),
});

const EditContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditContentForm);

export default withRouter(injectIntl(EditContentContainer));
