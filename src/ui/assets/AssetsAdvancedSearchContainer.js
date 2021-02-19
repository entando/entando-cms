import { connect } from 'react-redux';

import { change, formValueSelector } from 'redux-form';
import { fetchGroups } from 'state/edit-content/actions';
import { getGroups } from 'state/edit-content/selectors';

import AssetsAdvancedSearch from 'ui/assets/AssetsAdvancedSearch';
import { advancedSearchFilter } from 'state/assets/actions';

export const mapStateToProps = state => ({
  groups: getGroups(state),
  groupFilter: formValueSelector('assetsAdvancedSearch')(state, 'group'),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: () => {
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
  },
  onSubmit: values => dispatch(advancedSearchFilter(
    values, undefined, ownProps.ownerGroup, ownProps.joinGroups,
  )),
  onSetGroup: group => dispatch(change('assetsAdvancedSearch', 'group', group)),
});

const AssetsAdvancedSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AssetsAdvancedSearch);

export default AssetsAdvancedSearchContainer;
