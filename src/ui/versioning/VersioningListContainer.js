import { connect } from 'react-redux';
import { convertToQueryString } from '@entando/utils';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { getContentTypeList } from 'state/content-type/selectors';

import VersioningList from 'ui/versioning/VersioningList';
import { getVersioningList } from 'state/versioning/selectors';
import { fetchVersionings, setSelectedVersioningType } from 'state/versioning/actions';

const noPage = { page: 1, pageSize: 0 };

export const mapStateToProps = state => ({
  loading: getLoading(state).versionings,
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  contentTypes: getContentTypeList(state),
  versioningList: getVersioningList(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('contents'));
    dispatch(fetchVersionings(page));
    dispatch(fetchContentTypeListPaged(noPage));
  },
  fetchVersioningList: (page) => {
    dispatch(fetchVersionings(page));
  },
  onSubmit: (params) => {
    let queryString = convertToQueryString({
      sorting: {
        attribute: 'description',
      },
    });
    if (params.description) {
      queryString = `${queryString}&description=${params.description}`;
    }
    if (params.type) {
      queryString = `${queryString}&type=${params.type}`;
    }
    dispatch(fetchVersionings({ page: 1, pageSize: 10 }, queryString));
  },
});

const VersioningListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VersioningList);

export default VersioningListContainer;
