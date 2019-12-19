import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/common/RowSpinner';


class PageTree extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  renderRows() {
    const { pages, onExpandPage } = this.props;

    return pages.map((page, i) => {
      const onClickExpand = () => {
        if (!page.isEmpty) {
          onExpandPage(page.code);
        }
      };
      const className = ['PageTree__tree-column-td'];
      if (page.isEmpty) {
        className.push('PageTree__tree-column-td--empty');
      }

      return (
        <tr key={`${page.code}`}>
          <td className={className.join(' ')}>
            <span
              role="button"
              tabIndex={i}
              className="PageTree__icons-label"
              style={{ marginLeft: page.depth * 24 }}
              onClick={onClickExpand}
              onKeyDown={onClickExpand}
            >
              <TreeNodeExpandedIcon expanded={page.expanded} />
              <TreeNodeFolderIcon empty={page.isEmpty} />
              <span className="PageTree__page-name">
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
        <table className="PageTree table table-bordered table-hover table-treegrid">
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

PageTree.propTypes = {
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
};

PageTree.defaultProps = {
  pages: [],
  onExpandPage: () => {},
  onDidMount: () => {},
};

export default PageTree;
