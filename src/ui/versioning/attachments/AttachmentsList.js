import React from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
  ListView,
} from 'patternfly-react';

import AttachmentsListItem from 'ui/versioning/attachments/AttachmentsListItem';


class AttachmentsList extends React.Component {
  componentDidMount() {
    const { fetchAttachments, pagination } = this.props;
    fetchAttachments(pagination);
  }

  render() {
    const {
      loading,
      attachments,
      removeAttachment,
      recoverAttachment,
    } = this.props;

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
  }
}

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
