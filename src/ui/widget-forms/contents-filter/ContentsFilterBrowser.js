import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { Spinner } from 'patternfly-react';
import ContentsFilter from 'ui/contents/ContentsFilter';
import ContentsFilterTabs from 'ui/widget-forms/contents-filter/ContentsFilterTabs';
import ContentsFilterTable from 'ui/widget-forms/contents-filter/ContentsFilterTable';

const AVAILABLE_COLUMNS = [
  {
    name: 'Name',
    code: 'description',
  },
  {
    name: 'Created By',
    code: 'firstEditor',
  },
  {
    name: 'Last Edited',
    code: 'lastModified',
  },
  {
    name: 'Type',
    code: 'typeCode',
  },
  {
    name: 'Created Date',
    code: 'created',
  },
  {
    name: 'Owner Group',
    code: 'mainGroup',
  },
  {
    name: 'Join Groups',
    code: 'groups',
  },
  {
    name: 'Status',
    code: 'onLine',
  },
  {
    name: 'Restrictions',
    code: 'restriction',
  },
  {
    name: 'Code',
    code: 'code',
  },
];

class ContentsFilterBrowser extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  componentWillUnmount() {
    const { onWillUnmount } = this.props;
    onWillUnmount();
  }

  render() {
    const {
      intl,
      page, totalItems, pageSize, contents, lastPage, loading,
      currentQuickFilter, onSetQuickFilter, onFilteredSearch,
      contentTypes, groups, language, filteringCategories, statusChecked,
      onCheckStatus, onCheckAccess, accessChecked, onCheckAuthor, authorChecked,
      currentAuthorShow, currentStatusShow, currentColumnsShow,
      onSetCurrentAuthorShow, onSetCurrentStatusShow, onSetCurrentColumnsShow,
      onSetContentType,
      onSetGroup,
      sortingColumns,
      onSetSort,
      selectedRows,
      onSelectRow,
      currentUsername,
      onAdvancedFilterSearch, users,
      pickedContents,
      onContentPicked,
    } = this.props;

    const messages = defineMessages({
      columns: {
        id: 'cms.contents.columns',
        defaultMessage: 'Columns',
      },
    });

    return (
      <Fragment>
        <ContentsFilter
          intl={intl}
          language={language}
          currentQuickFilter={currentQuickFilter}
          onSetQuickFilter={onSetQuickFilter}
          contentTypes={contentTypes}
          groups={groups}
          filteringCategories={filteringCategories}
          statusChecked={statusChecked}
          onCheckStatus={onCheckStatus}
          onCheckAccess={onCheckAccess}
          accessChecked={accessChecked}
          onCheckAuthor={onCheckAuthor}
          authorChecked={authorChecked}
          onSetContentType={onSetContentType}
          onSetGroup={onSetGroup}
          currentUsername={currentUsername}
          onAdvancedFilterSearch={onAdvancedFilterSearch}
          users={users}
          inModal
        />
        <div className="Contents__body">
          {!pickedContents && (
            <ContentsFilterTabs
              intl={intl}
              availableColumns={AVAILABLE_COLUMNS}
              messages={messages}
              contents={contents}
              contentTypes={contentTypes}
              currentAuthorShow={currentAuthorShow}
              currentStatusShow={currentStatusShow}
              currentColumnsShow={currentColumnsShow}
              onSetCurrentAuthorShow={onSetCurrentAuthorShow}
              onSetCurrentStatusShow={onSetCurrentStatusShow}
              onSetCurrentColumnsShow={onSetCurrentColumnsShow}
              currentUsername={currentUsername}
              inModal
            />
          )}
          <div>
            <Spinner loading={!!loading}>
              <ContentsFilterTable
                intl={intl}
                page={page}
                lastPage={lastPage}
                totalItems={totalItems}
                pageSize={pageSize}
                contents={contents}
                sortingColumns={sortingColumns}
                activeColumns={currentColumnsShow}
                onSetSort={onSetSort}
                selectedRows={selectedRows}
                onSelectRow={onSelectRow}
                onFilteredSearch={onFilteredSearch}
                availableColumns={AVAILABLE_COLUMNS}
                groups={groups}
                pickedContents={pickedContents}
                onContentPicked={onContentPicked}
              />
            </Spinner>
          </div>
        </div>
      </Fragment>
    );
  }
}

ContentsFilterBrowser.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  currentQuickFilter: PropTypes.shape({}).isRequired,
  onSetQuickFilter: PropTypes.func.isRequired,
  onFilteredSearch: PropTypes.func.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filteringCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  sortingColumns: PropTypes.shape({}).isRequired,
  onCheckStatus: PropTypes.func.isRequired,
  statusChecked: PropTypes.string.isRequired,
  accessChecked: PropTypes.string.isRequired,
  onCheckAccess: PropTypes.func.isRequired,
  authorChecked: PropTypes.string.isRequired,
  onCheckAuthor: PropTypes.func.isRequired,
  currentAuthorShow: PropTypes.string.isRequired,
  currentStatusShow: PropTypes.string.isRequired,
  currentColumnsShow: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDidMount: PropTypes.func.isRequired,
  onSetCurrentAuthorShow: PropTypes.func.isRequired,
  onSetCurrentStatusShow: PropTypes.func.isRequired,
  onSetCurrentColumnsShow: PropTypes.func.isRequired,
  onSetContentType: PropTypes.func.isRequired,
  onSetGroup: PropTypes.func.isRequired,
  onContentPicked: PropTypes.func,
  onSetSort: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectRow: PropTypes.func.isRequired,
  currentUsername: PropTypes.string.isRequired,
  onAdvancedFilterSearch: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})),
  onWillUnmount: PropTypes.func.isRequired,
  pickedContents: PropTypes.arrayOf(PropTypes.string),
};

ContentsFilterBrowser.defaultProps = {
  loading: false,
  users: [],
  pickedContents: null,
  onContentPicked: () => {},
};


export default injectIntl(ContentsFilterBrowser);
