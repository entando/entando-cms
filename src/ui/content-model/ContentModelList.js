import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner, Paginator } from 'patternfly-react';
import ContentModelListItem from 'ui/content-model/ContentModelListItem';
import DeleteContentModelModalContainer from 'ui/content-model/DeleteContentModelModalContainer';

const perPageOptions = [5, 10, 15, 25, 50];

class ContentModelList extends Component {
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
    const { fetchList, pageSize } = this.props;
    fetchList({ page, pageSize });
  }

  changePageSize(pageSize) {
    const { fetchList } = this.props;
    fetchList({ page: 1, pageSize });
  }

  render() {
    const {
      contentModels,
      loading,
      onClickDelete,
      page,
      pageSize,
      totalItems,
    } = this.props;

    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions,
    };

    const renderRow = contentModels
      .map(item => (
        <ContentModelListItem key={item.id} onDelete={onClickDelete} {...item} />
      ));
    return (
      <div className="ContentModelList__wrap">
        <Spinner loading={!!loading}>
          <table className="table table-striped table-bordered table-hover ContentModelList__table">
            <thead>
              <tr>
                <th width="20%">
                  <FormattedMessage id="cms.contentmodel.list.contentTypeHeader" />
                </th>
                <th width="70%">
                  <FormattedMessage id="cms.contentmodel.list.contentModelNameHeader" />
                </th>
                <th width="10%" className="text-center">
                  <FormattedMessage id="cms.contentmodel.list.actionsHeader" />
                </th>
              </tr>
            </thead>
            <tbody>{renderRow}</tbody>
          </table>
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
          />
          <DeleteContentModelModalContainer />
        </Spinner>
      </div>
    );
  }
}

ContentModelList.propTypes = {
  contentModels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  fetchList: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

ContentModelList.defaultProps = {
  loading: false,
};

export default ContentModelList;
