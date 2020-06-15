import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
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
  loading: getLoading(state).versionings,
  pagination: {
    page: getCurrentPage(state),
    pageSize: getPageSize(state),
  },
  totalItems: getTotalItems(state),
  attachments: getVersioningList(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('attachments'));
    dispatch(fetchVersionings(page));
  },
  fetchAttachments: (pagination = { page: 1, pageSize: 10 }) => {
    dispatch(fetchVersionings(pagination));
  },
  removeAttachment: (attachmentId) => {
    dispatch(removeVersion(attachmentId));
  },
  recoverAttachment: (attachmentId, attachmentVersion) => {
    dispatch(recoverVersion(attachmentId, attachmentVersion));
  },
  onSubmit: (params) => {
    const like = FILTER_OPERATORS.LIKE;
    const { description } = params;
    const formValues = {
      ...(description && { description }),
    };
    const operators = {
      ...(description && { status: like }),
    };
    const queryString = convertToQueryString({
      formValues,
      operators,
    });
    dispatch(fetchVersionings({ page: 1, pageSize: 10 }, queryString));
  },
});

const AttachmentsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttachmentsList);

export default AttachmentsListContainer;
