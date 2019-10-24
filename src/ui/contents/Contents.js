import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  intlShape, defineMessages, FormattedMessage,
} from 'react-intl';
import { Button } from 'patternfly-react';
import ContentsFilter from 'ui/contents/ContentsFilter';
import ContentsTable from 'ui/contents/ContentsTable';
import ContentsTabs from 'ui/contents/ContentsTabs';

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
    code: 'typeDescription',
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
    code: 'status',
  },
  {
    name: 'Actions',
    code: 'actions',
  },
];

class Contents extends Component {
  constructor(props) {
    super(props);
    this.messages = defineMessages({
      downloadButton: {
        id: 'cms.contents.downloadAs',
        defaultMessage: 'Download As',
      },
      addContent: {
        id: 'cms.contents.addContent',
        defaultMessage: 'Add Content',
      },
      columns: {
        id: 'cms.contents.columns',
        defaultMessage: 'Columns',
      },
      selectedContents: {
        id: 'cms.contents.selectedContents',
        defaultMessage: 'You have selected {number} content(s), you can',
      },
    });
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const {
      page, totalItems, pageSize, contents, lastPage,
      currentQuickFilter, onSetQuickFilter, onFilteredSearch, intl,
      contentTypes, groups, language, filteringCategories, statusChecked,
      onCheckStatus, onCheckAccess, accessChecked, onCheckAuthor, authorChecked,
      currentAuthorShow, currentStatusShow, currentColumnsShow,
      onSetCurrentAuthorShow, onSetCurrentStatusShow, onSetCurrentColumnsShow,
      onSetContentType, onSetGroup, sortingColumns, onSetSort, selectedRows,
      onSelectRow, onSelectAllRows, onEditContent, onClickDelete, onClickPublish,
    } = this.props;

    const { selectedContents } = this.messages;
    const selectedRowsData = contents.filter(c => selectedRows.includes(c.id));
    const renderSelectedRows = selectedRows.length > 0 ? (
      <div className="Contents__selected-contents">
        {intl.formatMessage(selectedContents, { number: selectedRows.length })}
        <Button>
          <FormattedMessage
            id="cms.contents.reloadReferences"
            defaultMessage="Reload References"
          />
        </Button>
        <Button>
          <FormattedMessage
            id="cms.contents.categoriesToAdd"
            defaultMessage="Select Categories to add"
          />
        </Button>
        <Button onClick={() => onClickPublish(selectedRowsData, true)}>
          <FormattedMessage
            id="cms.contents.publish"
            defaultMessage="Publish"
          />
        </Button>
      </div>
    ) : null;
    return (
      <div>
        <ContentsFilter
          intl={intl}
          language={language}
          currentQuickFilter={currentQuickFilter}
          onSetQuickFilter={onSetQuickFilter}
          onFilteredSearch={onFilteredSearch}
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
        />
        <div className="Contents__body">
          <ContentsTabs
            intl={intl}
            availableColumns={AVAILABLE_COLUMNS}
            messages={this.messages}
            contentTypes={contentTypes}
            currentAuthorShow={currentAuthorShow}
            currentStatusShow={currentStatusShow}
            currentColumnsShow={currentColumnsShow}
            onSetCurrentAuthorShow={onSetCurrentAuthorShow}
            onSetCurrentStatusShow={onSetCurrentStatusShow}
            onSetCurrentColumnsShow={onSetCurrentColumnsShow}
          />
          {renderSelectedRows}
          <div>
            <ContentsTable
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
              onSelectAllRows={onSelectAllRows}
              onFilteredSearch={onFilteredSearch}
              availableColumns={AVAILABLE_COLUMNS}
              onEditContent={onEditContent}
              onClickDelete={onClickDelete}
              onClickPublish={onClickPublish}
            />
          </div>
        </div>
      </div>
    );
  }
}

Contents.propTypes = {
  intl: intlShape.isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  onDidMount: PropTypes.func.isRequired,
  currentQuickFilter: PropTypes.shape({}).isRequired,
  onSetQuickFilter: PropTypes.func.isRequired,
  onFilteredSearch: PropTypes.func.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filteringCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onCheckStatus: PropTypes.func.isRequired,
  statusChecked: PropTypes.string.isRequired,
  accessChecked: PropTypes.string.isRequired,
  onCheckAccess: PropTypes.func.isRequired,
  authorChecked: PropTypes.string.isRequired,
  onCheckAuthor: PropTypes.func.isRequired,
  currentAuthorShow: PropTypes.string.isRequired,
  currentStatusShow: PropTypes.string.isRequired,
  currentColumnsShow: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSetCurrentAuthorShow: PropTypes.func.isRequired,
  onSetCurrentStatusShow: PropTypes.func.isRequired,
  onSetCurrentColumnsShow: PropTypes.func.isRequired,
  onSetContentType: PropTypes.func.isRequired,
  onSetGroup: PropTypes.func.isRequired,
  sortingColumns: PropTypes.shape({}).isRequired,
  onSetSort: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectRow: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
  onEditContent: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickPublish: PropTypes.func.isRequired,
};

export default Contents;
