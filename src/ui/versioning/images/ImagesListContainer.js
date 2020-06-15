import { connect } from 'react-redux';
import { convertToQueryString } from '@entando/utils';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';

import ImagesList from 'ui/versioning/images/ImagesList';
import { getVersioningList } from 'state/versioning/selectors';
import {
  setSelectedVersioningType,
  fetchVersionings,
  removeVersion,
  recoverVersion,
} from 'state/versioning/actions';

export const mapStateToProps = state => ({
  loading: getLoading(state).versionings,
  pagination: {
    page: getCurrentPage(state),
    pageSize: getPageSize(state),
  },
  totalItems: getTotalItems(state),
  images: getVersioningList(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('images'));
    dispatch(fetchVersionings(page));
  },
  fetchImages: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchVersionings(page));
  },
  removeImage: (imageId) => {
    dispatch(removeVersion(imageId));
  },
  recoverImage: (imageId, imageVersion) => {
    dispatch(recoverVersion(imageId, imageVersion));
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
    dispatch(fetchVersionings({ page: 1, pageSize: 10 }, queryString));
  },
});

const ImagesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImagesList);

export default ImagesListContainer;
