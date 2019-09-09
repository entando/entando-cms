import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner, Paginator } from 'patternfly-react';
import DeleteContentTypeModalContainer from 'ui/content-type/DeleteContentTypeModalContainer';
import ContentTypeListItem from 'ui/content-type/ContentTypeListItem';

class ContentTypeList extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  changePage(page) {
    const { onDidMount, pageSize } = this.props;
    onDidMount({ page, pageSize });
  }

  changePageSize(pageSize) {
    const { onDidMount } = this.props;
    onDidMount({ page: 1, pageSize });
  }

  render() {
    const {
      contentTypes,
      loading,
      onClickDelete,
      page,
      pageSize,
      totalItems,
    } = this.props;

    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions: [5, 10, 15, 25, 50],
    };
    const renderRow = contentTypes
      .map(item => (
        <ContentTypeListItem key={item.code} onDelete={onClickDelete} {...item} />
      ));
    return (
      <div className="ContentTypeList__wrap">
        <Spinner loading={!!loading}>
          <table className="table table-striped table-bordered table-hover ContentTypeList__table">
            <thead>
              <tr>
                <th><FormattedMessage id="cms.contenttype.list.contentTypeNameHeader" /></th>
                <th width="10%"><FormattedMessage id="cms.contenttype.list.contentTypeCodeHeader" /></th>
                <th width="10%"><FormattedMessage id="cms.contenttype.list.contentTypeStatusHeader" /></th>
                <th width="10%" className="text-center"><FormattedMessage id="cms.contenttype.list.actionsHeader" /></th>
              </tr>
            </thead>
            <tbody>
              {renderRow}
            </tbody>
          </table>
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
          />
          <DeleteContentTypeModalContainer />
        </Spinner>
      </div>
    );
  }
}

ContentTypeList.propTypes = {
  contentTypes: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  loading: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

ContentTypeList.defaultProps = {
  loading: false,
};

export default ContentTypeList;
