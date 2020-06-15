import React from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
  ListView,
  Paginator,
} from 'patternfly-react';

import AttachmentsListItem from 'ui/versioning/attachments/AttachmentsListItem';

const perPageOptions = [5, 10, 15, 25, 50];

class AttachmentsList extends React.Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { fetchAttachments, pagination } = this.props;
    fetchAttachments(pagination);
  }

  changePage(page) {
    const { fetchAttachments, pagination: { pageSize } } = this.props;
    fetchAttachments({ page, pageSize });
  }

  changePageSize(pageSize) {
    const { fetchAttachments } = this.props;
    fetchAttachments({ page: 1, pageSize });
  }

  render() {
    const {
      loading,
      attachments,
      pagination: {
        page,
        pageSize,
      },
      totalItems,
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
          <Paginator
            pagination={{
              page,
              perPage: pageSize,
              perPageOptions,
            }}
            viewType="list"
            itemCount={totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
          />
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
  totalItems: PropTypes.number,
};

AttachmentsList.defaultProps = {
  fetchAttachments: () => {},
  loading: false,
  pagination: {
    page: 1,
    pageSize: 10,
  },
  attachments: [],
  totalItems: 0,
  removeAttachment: () => {},
  recoverAttachment: () => {},
};

export default AttachmentsList;
