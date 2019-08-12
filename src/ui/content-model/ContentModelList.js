import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ContentModelListItem from 'ui/content-model/ContentModelListItem';

class ContentModelList extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const { contentModels } = this.props;
    const renderRow = contentModels
      .map(item => (
        <ContentModelListItem key={item.id} {...item} />
      ));
    return (
      <table className="table table-striped table-bordered table-hover ContentModelList__table">
        <thead>
          <tr>
            <th width="20%"><FormattedMessage id="cms.contentmodel.list.contentTypeHeader" /></th>
            <th width="70%"><FormattedMessage id="cms.contentmodel.list.contentModelNameHeader" /></th>
            <th width="10%" className="text-center"><FormattedMessage id="cms.contentmodel.list.actionsHeader" /></th>
          </tr>
        </thead>
        <tbody>
          {renderRow}
        </tbody>
      </table>
    );
  }
}

ContentModelList.propTypes = {
  contentModels: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  onDidMount: PropTypes.func.isRequired,
};

export default ContentModelList;
