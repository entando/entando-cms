import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage, injectIntl, intlShape,
} from 'react-intl';
import { Spinner, Paginator } from 'patternfly-react';
import ContentTemplateListItem from 'ui/content-template/ContentTemplateListItem';
import DeleteContentTemplateModalContainer from 'ui/content-template/DeleteContentTemplateModalContainer';
import paginatorMessages from 'ui/common/paginatorMessages';

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
      intl,
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


    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <div className="ContentTemplateList__wrap">
        <Spinner loading={!!loading}>
          <table className="table table-striped table-bordered table-hover ContentTemplateList__table">
            <thead>
              <tr>
                <th width="10%">
                  <FormattedMessage id="cms.contenttemplate.list.contentTypeIdHeader" />
                </th>
                <th width="20%">
                  <FormattedMessage id="cms.contenttemplate.list.contentTypeHeader" />
                </th>
                <th width="60%">
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
            messages={messages}
          />
          <DeleteContentTemplateModalContainer />
        </Spinner>
      </div>
    );
  }
}

ContentTemplateList.propTypes = {
  intl: intlShape.isRequired,
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

export default injectIntl(ContentTemplateList);
