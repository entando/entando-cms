import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner } from 'patternfly-react';
import ContentModelListItem from 'ui/content-model/ContentModelListItem';

class ContentModelList extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const { contentModels, loading } = this.props;
    const renderRow = contentModels
      .map(item => (
        <ContentModelListItem key={item.id} {...item} />
      ));
    return (
      <div className="ContentModelList__wrap">
        <Spinner loading={!!loading}>
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
        </Spinner>
      </div>
    );
  }
}

ContentModelList.propTypes = {
  contentModels: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  loading: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
};

ContentModelList.defaultProps = {
  loading: false,
};

export default ContentModelList;
