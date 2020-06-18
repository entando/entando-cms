import { connect } from 'react-redux';
import { getDomain } from '@entando/apimanager';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getLoading } from 'state/loading/selectors';
import { getResourceVersioningList } from 'state/versioning/selectors';
import {
  setSelectedVersioningType,
  recoverVersion,
  fetchResourceVersionings,
} from 'state/versioning/actions';
import { REMOVE_RESOURCE_MODAL_ID } from 'ui/versioning/common/RemoveResourceModal';
import AttachmentsList from 'ui/versioning/attachments/AttachmentsList';

export const mapStateToProps = state => ({
  loading: getLoading(state).versionings,
  pagination: {
    page: getCurrentPage(state),
    pageSize: getPageSize(state),
  },
  totalItems: getTotalItems(state),
  attachments: getResourceVersioningList(state),
  domain: getDomain(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('Attach'));
    dispatch(fetchResourceVersionings(page));
  },
  fetchAttachments: (pagination = { page: 1, pageSize: 10 }) => {
    dispatch(fetchResourceVersionings(pagination));
  },
  removeAttachment: (attachment) => {
    dispatch(setVisibleModal(REMOVE_RESOURCE_MODAL_ID));
    dispatch(setInfo(attachment));
  },
  recoverAttachment: (attachmentId) => {
    dispatch(recoverVersion(attachmentId));
  },
  onSubmit: (params) => {
    const like = FILTER_OPERATORS.LIKE;
    const { description } = params;
    const formValues = {
      ...(description && { description }),
    };
    const operators = {
      ...(description && { description: like }),
    };
    const queryString = convertToQueryString({
      formValues,
      operators,
    }).replace('?', '&');
    dispatch(fetchResourceVersionings({ page: 1, pageSize: 10 }, queryString));
  },
});

const AttachmentsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttachmentsList);

export default AttachmentsListContainer;
