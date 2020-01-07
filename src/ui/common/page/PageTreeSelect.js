import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/common/RowSpinner';


class PageTreeSelect extends Component {
  constructor() {
    super();
    this.state = {
      selectedPage: null,
    };
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  handleRowClick(pageCode) {
    this.setState({
      selectedPage: pageCode,
    });
    const { onPageSelect } = this.props;
    onPageSelect(pageCode);
  }

  renderRows() {
    const { pages, onExpandPage } = this.props;
    const { selectedPage } = this.state;

    return pages.map((page, i) => {
      const onClickExpand = () => {
        if (!page.isEmpty) {
          onExpandPage(page.code);
        }
      };
      const className = ['PageTreeSelect__tree-column-td'];
      if (page.isEmpty) {
        className.push('PageTreeSelect__tree-column-td--empty');
      }

      const isPageSelected = selectedPage === page.code;

      return (
        <tr
          key={`${page.code}`}
          className={`PageTreeSelect__row${isPageSelected ? '--selected' : ''}`}
          onClick={() => this.handleRowClick(page.code)}
        >
          <td className={className.join(' ')}>
            <span
              role="button"
              tabIndex={i}
              className="PageTreeSelect__icons-label"
              style={{ marginLeft: page.depth * 24 }}
              onClick={onClickExpand}
              onKeyDown={onClickExpand}
            >
              <TreeNodeExpandedIcon expanded={page.expanded} />
              <TreeNodeFolderIcon empty={page.isEmpty} />
              <span className="PageTreeSelect__page-name">
                { page.title }
              </span>
              <RowSpinner loading={!!page.loading} />
            </span>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <table className="PageTreeSelect table table-bordered table-hover table-treegrid">
          <thead>
            <tr>
              <th width="70%">
                <FormattedMessage id="cms.linkconfig.pagetree" />
              </th>
            </tr>
          </thead>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </div>
    );
  }
}

PageTreeSelect.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    displayedInMenu: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  })),
  onExpandPage: PropTypes.func,
  onDidMount: PropTypes.func,
  onPageSelect: PropTypes.func,
};

PageTreeSelect.defaultProps = {
  pages: [],
  onExpandPage: () => {},
  onDidMount: () => {},
  onPageSelect: () => {},
};

export default PageTreeSelect;
