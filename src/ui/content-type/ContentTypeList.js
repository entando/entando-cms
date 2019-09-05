import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner } from 'patternfly-react';
import DeleteContentTypeModalContainer from 'ui/content-type/DeleteContentTypeModalContainer';
import ContentTypeListItem from 'ui/content-type/ContentTypeListItem';

class ContentTypeList extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const { contentTypes, loading, onClickDelete } = this.props;
    const renderRow = contentTypes
      .map(item => (
        <ContentTypeListItem key={item.code} onDelete={onClickDelete} {...item} />
      ));
    return (
      <div className="ContentTypeList__wrap">
        <Spinner loading={!!loading}>
          <table className="table table-striped table-bordered table-hover ContentTypeList__table">
            <thead>
              <tr>
                <th><FormattedMessage id="cms.contenttype.list.contentTypeNameHeader" /></th>
                <th width="10%"><FormattedMessage id="cms.contenttype.list.contentTypeCodeHeader" /></th>
                <th width="10%"><FormattedMessage id="cms.contenttype.list.contentTypeStatusHeader" /></th>
                <th width="10%" className="text-center"><FormattedMessage id="cms.contenttype.list.actionsHeader" /></th>
              </tr>
            </thead>
            <tbody>
              {renderRow}
            </tbody>
          </table>
          <DeleteContentTypeModalContainer />
        </Spinner>
      </div>
    );
  }
}

ContentTypeList.propTypes = {
  contentTypes: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  loading: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
};

ContentTypeList.defaultProps = {
  loading: false,
};

export default ContentTypeList;
