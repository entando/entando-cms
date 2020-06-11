import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';

import AttachmentsList from 'ui/versioning/attachments/AttachmentsList';
import { getVersioningList } from 'state/versioning/selectors';
import {
  setSelectedVersioningType,
  fetchVersionings,
  removeVersion,
  recoverVersion,
} from 'state/versioning/actions';

export const mapStateToProps = state => ({
  loading: getLoading(state).attachmentVersioning,
  pagination: {
    page: getCurrentPage(state),
    pageSize: getPageSize(state),
  },
  totalItems: getTotalItems(state),
  attachments: getVersioningList(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: (pagination = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('attachments'));
    dispatch(fetchVersionings(pagination));
  },

  removeAttachment: (attachmentId) => {
    dispatch(removeVersion(attachmentId));
  },
  recoverAttachment: (attachmentId, attachmentVersion) => {
    dispatch(recoverVersion(attachmentId, attachmentVersion));
  },
});

const AttachmentsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttachmentsList);

export default AttachmentsListContainer;
