import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { formValueSelector } from 'redux-form';
import { routeConverter } from '@entando/utils';

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
  getJoinedCategories,
} from 'state/edit-content/selectors';
import {
  ROUTE_CMS_CONTENTS,
} from 'app-init/routes';
import { WORK_MODE_EDIT } from 'state/edit-content/types';

export const mapStateToProps = (state, { match: { params } }) => ({
  workMode: getWorkMode(state),
  language: getLanguage(state),
  content: getContent(state),
  groups: getGroups(state),
  currentUser: getCurrentUser(state),
  contentId: params.id,
  ownerGroupDisabled: getOwnerGroupDisabled(state),
  selectedJoinGroups: formValueSelector('editcontentform')(state, 'joinGroups'),
  selectedCategories: getJoinedCategories(state),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onDidMount: (fetchContentParams) => {
    dispatch(setWorkMode(WORK_MODE_EDIT));
    dispatch(fetchContent(fetchContentParams));
    dispatch(fetchGroups());
    dispatch(fetchCategoryTree());
  },
  onSetOwnerGroupDisable: disabled => dispatch(setOwnerGroupDisable(disabled)),
  onSubmit: (values) => {
    // eslint-disable-next-line no-console
    dispatch(console.log('Posting Editting of a form', values));
  },
  onCancel: () => history.push(routeConverter(ROUTE_CMS_CONTENTS)),
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
