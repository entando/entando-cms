import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner, Paginator } from 'patternfly-react';
import ContentTemplateListItem from 'ui/content-template/ContentTemplateListItem';
import DeleteContentTemplateModalContainer from 'ui/content-template/DeleteContentTemplateModalContainer';

const perPageOptions = [5, 10, 15, 25, 50];

class ContentTemplateList extends Component {
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
      contentTemplates,
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

    const renderRow = contentTemplates
      .map(item => (
        <ContentTemplateListItem key={item.id} onDelete={onClickDelete} {...item} />
      ));
    return (
      <div className="ContentTemplateList__wrap">
        <Spinner loading={!!loading}>
          <table className="table table-striped table-bordered table-hover ContentTemplateList__table">
            <thead>
              <tr>
                <th width="20%">
                  <FormattedMessage id="cms.contenttemplate.list.contentTypeHeader" />
                </th>
                <th width="70%">
                  <FormattedMessage id="cms.contenttemplate.list.contentTemplateNameHeader" />
                </th>
                <th width="10%" className="text-center">
                  <FormattedMessage id="cms.contenttemplate.list.actionsHeader" />
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
          <DeleteContentTemplateModalContainer />
        </Spinner>
      </div>
    );
  }
}

ContentTemplateList.propTypes = {
  contentTemplates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  fetchList: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

ContentTemplateList.defaultProps = {
  loading: false,
};

export default ContentTemplateList;
