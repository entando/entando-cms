import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, defineMessages, injectIntl } from 'react-intl';
import { Spinner } from 'patternfly-react';
import ContentsFilter from 'ui/contents/ContentsFilter';
import ContentsFilterTabs from 'ui/widget-forms/contents-filter/ContentsFilterTabs';
import ContentsFilterTable from 'ui/widget-forms/contents-filter/ContentsFilterTable';

const messages = defineMessages({
  description: {
    id: 'cms.contents.description',
    defaultMessage: 'Name',
  },
  lastModified: {
    id: 'cms.contents.lastModified',
    defaultMessage: 'Last Edited',
  },
  typeCode: {
    id: 'cms.contents.typeCode',
    defaultMessage: 'Type',
  },
  created: {
    id: 'cms.contents.created',
    defaultMessage: 'Created date',
  },
  firstEditor: {
    id: 'cms.contents.firstEditor',
    defaultMessage: 'Created by',
  },
  mainGroup: {
    id: 'cms.contents.mainGroup',
    defaultMessage: 'Owner Group',
  },
  groups: {
    id: 'cms.contents.groups',
    defaultMessage: 'Join Groups',
  },
  onLine: {
    id: 'cms.contents.onLine',
    defaultMessage: 'Status',
  },
  restriction: {
    id: 'cms.contents.restriction',
    defaultMessage: 'Restrictions',
  },
  code: {
    id: 'cms.contents.code',
    defaultMessage: 'Code',
  },
  columns: {
    id: 'cms.contents.columns',
    defaultMessage: 'Columns',
  },
});

const AVAILABLE_COLUMN_CODES = [
  'description', 'firstEditor', 'lastModified',
  'typeCode', 'created', 'mainGroup', 'groups',
  'onLine', 'restriction', 'code',
];

class ContentsFilterBrowser extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  componentDidUpdate(prevProps) {
    const { ownerGroup, joinGroups, onFilteredSearch } = this.props;
    if (ownerGroup !== '' && ownerGroup !== prevProps.ownerGroup) {
      onFilteredSearch(null, null, null, false);
    } else if (joinGroups && JSON.stringify(joinGroups) !== JSON.stringify(prevProps.joinGroups)) {
      onFilteredSearch(null, null, null, false);
    }
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

    const availableColumns = AVAILABLE_COLUMN_CODES.map(code => ({
      name: intl.formatMessage(messages[code]),
      code,
    }));

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
              availableColumns={availableColumns}
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
                availableColumns={availableColumns}
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
  currentColumnsShow: PropTypes.arrayOf(PropTypes.string),
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
  ownerGroup: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ContentsFilterBrowser.defaultProps = {
  loading: false,
  users: [],
  pickedContents: null,
  onContentPicked: () => {},
  currentColumnsShow: ['description', 'firstEditor', 'lastModified', 'typeCode', 'created', 'onLine', 'restriction', 'actions'],
};


export default injectIntl(ContentsFilterBrowser);
