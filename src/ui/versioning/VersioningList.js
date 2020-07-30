import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage, injectIntl, intlShape,
} from 'react-intl';
import { Spinner, Paginator } from 'patternfly-react';
import VersioningSearchForm from 'ui/versioning/VersioningSearchForm';
import VersioningListItem from 'ui/versioning/VersioningListItem';
import paginatorMessages from 'ui/common/paginatorMessages';

const perPageOptions = [5, 10, 15, 25, 50];

class VersioningList extends Component {
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
    const { fetchVersioningList, pageSize } = this.props;
    fetchVersioningList({ page, pageSize });
  }

  changePageSize(pageSize) {
    const { fetchVersioningList } = this.props;
    fetchVersioningList({ page: 1, pageSize });
  }

  render() {
    const {
      intl,
      versioningList,
      loading,
      page,
      pageSize,
      totalItems,
      contentTypes,
      onSubmit,
    } = this.props;

    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions,
    };

    const renderRows = versioningList
      .map(item => (
        <VersioningListItem key={item.id} {...item} />
      ));

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <div className="VersioningList__wrap">
        <Spinner loading={!!loading}>
          <VersioningSearchForm contentTypes={contentTypes} onSubmit={onSubmit} />
          <table className="table table-striped table-bordered table-hover VersioningList__table">
            <thead>
              <tr>
                <th width="30%">
                  <FormattedMessage id="cms.versioning.list.description" defaultMessage="Description" />
                </th>
                <th width="10%" className="text-center">
                  <FormattedMessage id="cms.versioning.list.id" defaultMessage="Id" />
                </th>
                <th width="20%" className="text-center">
                  <FormattedMessage id="cms.versioning.list.contentType" defaultMessage="Content Type" />
                </th>
                <th width="15%" className="text-center">
                  <FormattedMessage id="cms.versioning.list.editor" defaultMessage="Editor" />
                </th>
                <th width="15%" className="text-center">
                  <FormattedMessage id="cms.versioning.list.lastModify" defaultMessage="Last Modified" />
                </th>
                <th width="10%" className="text-center">
                  <FormattedMessage id="cms.versioning.list.actions" defaultMessage="Actions" />
                </th>
              </tr>
            </thead>
            <tbody>{renderRows}</tbody>
          </table>
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
            messages={messages}
          />
        </Spinner>
      </div>
    );
  }
}

VersioningList.propTypes = {
  intl: intlShape.isRequired,
  versioningList: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fetchVersioningList: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})),
};

VersioningList.defaultProps = {
  loading: false,
  versioningList: [],
  contentTypes: [],
};

export default injectIntl(VersioningList);
