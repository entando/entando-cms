import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
  ListView,
} from 'patternfly-react';

import AttachmentsListItem from 'ui/versioning/attachments/AttachmentsListItem';

const AttachmentsList = (props) => {
  const {
    fetchAttachments,
    loading,
    pagination,
    attachments,
    removeAttachment,
    recoverAttachment,
  } = props;

  useEffect(() => fetchAttachments(pagination), [fetchAttachments, pagination]);

  return (
    <ListView>
      <Spinner loading={!!loading}>
        {attachments.map(
          attachment => (
            <AttachmentsListItem
              key={attachment.id}
              attachment={attachment}
              onClickRemove={removeAttachment}
              onClickRecover={recoverAttachment}
            />
          ),
        )}
      </Spinner>
    </ListView>
  );
};

AttachmentsList.propTypes = {
  fetchAttachments: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
  }),
  attachments: PropTypes.arrayOf(PropTypes.shape()),
  removeAttachment: PropTypes.func,
  recoverAttachment: PropTypes.func,
};

AttachmentsList.defaultProps = {
  fetchAttachments: () => {},
  loading: false,
  pagination: {
    page: 1,
    pageSize: 10,
  },
  attachments: [],
  removeAttachment: () => {},
  recoverAttachment: () => {},
};

export default AttachmentsList;