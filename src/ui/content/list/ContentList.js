import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ContentListItem from 'ui/content/list/ContentListItem';


class ContentList extends Component {
  componentWillMount() {
    const { onWillMount } = this.props;
    onWillMount();
  }

  render() {
    const { contents } = this.props;
    const renderRow = contents
      .map(item => (
        <ContentListItem key={item.id} {...item} />
      ));
    return (
      <table className="table table-striped table-bordered table-hover ContentModelList__table">
        <thead>
          <tr>
            <th width="20%"><FormattedMessage id="cms.content.list.contentTypeHeader" /></th>
            <th width="70%"><FormattedMessage id="cms.content.list.contentNameHeader" /></th>
            <th width="10%" className="text-center"><FormattedMessage id="cms.content.list.actionsHeader" /></th>
          </tr>
        </thead>
        <tbody>
          {renderRow}
        </tbody>
      </table>
    );
  }
}

ContentList.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  contents: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default ContentList;
