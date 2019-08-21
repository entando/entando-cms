import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Spinner, Modal, Button } from 'patternfly-react';
import ContentModelListItem from 'ui/content-model/ContentModelListItem';

class ContentModelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delModalOpened: false,
      modelToDelete: null,
    };
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  handleModalOpen(modelToDelete) {
    this.setState({ modelToDelete });
    this.setState({ delModalOpened: true });
  }

  handleModalClose() {
    this.setState({ delModalOpened: false });
  }

  handleConfirmDelete() {
    const { onConfirmDelete } = this.props;
    const { modelToDelete } = this.state;
    onConfirmDelete(modelToDelete);
    this.handleModalClose();
  }

  render() {
    const { delModalOpened, modelToDelete } = this.state;
    const { contentModels, loading } = this.props;
    const renderRow = contentModels
      .map(item => (
        <ContentModelListItem key={item.id} onDelete={this.handleModalOpen} {...item} />
      ));
    return (
      <div className="ContentModelList__wrap">
        <Modal
          className="AddContentModelForm__editassistmodal"
          show={delModalOpened}
          onHide={this.handleModalClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              <FormattedMessage id="cms.contentmodel.delete.label" defaultMessage="Delete" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormattedHTMLMessage id="cms.contentmodel.delete.messageprompt" values={modelToDelete} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalClose}><FormattedMessage id="cms.label.back" defaultMessage="close" /></Button>
            <Button bsStyle="danger" onClick={this.handleConfirmDelete}><FormattedMessage id="cms.label.delete" defaultMessage="Remove" /></Button>
          </Modal.Footer>
        </Modal>
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
  onConfirmDelete: PropTypes.func.isRequired,
};

ContentModelList.defaultProps = {
  loading: false,
};

export default ContentModelList;
