import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  intlShape, defineMessages,
} from 'react-intl';
import ContentSearch from 'ui/common/content/ContentSearch';
import ContentList from 'ui/common/content/ContentList';

const AVAILABLE_COLUMNS = [
  {
    name: 'Name',
    code: 'description',
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
      contentTypes, currentColumnsShow, onSetContentType, sortingColumns,
      onSetSort, selectedRows, onAdvancedFilterSearch, onContentSelect,
    } = this.props;

    return (
      <div>
        <ContentSearch
          intl={intl}
          currentQuickFilter={currentQuickFilter}
          onSetQuickFilter={onSetQuickFilter}
          contentTypes={contentTypes}
          onSetContentType={onSetContentType}
          onAdvancedFilterSearch={onAdvancedFilterSearch}
        />
        <div className="Contents__body">
          <ContentList
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
            onFilteredSearch={onFilteredSearch}
            availableColumns={AVAILABLE_COLUMNS}
            onContentSelect={onContentSelect}
            onAdvancedFilterSearch={onAdvancedFilterSearch}
          />
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
  onDidMount: PropTypes.func.isRequired,
  currentQuickFilter: PropTypes.shape({}).isRequired,
  onSetQuickFilter: PropTypes.func.isRequired,
  onFilteredSearch: PropTypes.func.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentColumnsShow: PropTypes.arrayOf(PropTypes.string),
  onSetContentType: PropTypes.func.isRequired,
  sortingColumns: PropTypes.shape({}).isRequired,
  onSetSort: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdvancedFilterSearch: PropTypes.func.isRequired,
  onContentSelect: PropTypes.func.isRequired,
};

Contents.defaultProps = {
  currentColumnsShow: ['description', 'typeCode', 'lastModified', 'created'],
};

export default Contents;
