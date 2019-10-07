import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
  Icon,
} from 'patternfly-react';
import DeleteContentMetadataModalContainer from 'ui/content-settings/metadata/DeleteContentMetadataModalContainer';
import { reduxForm, Field } from 'redux-form';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

class ContentSettingsMetadataListBody extends Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickDelete(ev) {
    const { onPromptDelete } = this.props;
    const { key, metadata } = ev.currentTarget.dataset;
    onPromptDelete({ key, metadata });
  }

  render() {
    const { handleSubmit, metadatas } = this.props;
    return (
      <>
        <form onSubmit={handleSubmit}>
          {metadatas.map(meta => (
            <Row className="ContentSettingsMetadata__list-row" key={meta.key}>
              <Col xs={12} md={2} className="text-right ContentSettingsMetadata__list-label-padded">
                {`'${meta.key}' Metadata`}
              </Col>
              <Col xs={9} md={9}>
                <Field
                  component={RenderTextInput}
                  labelSize={12}
                  inputSize={12}
                  name={`meta${meta.key}`}
                  alignClass="text-left"
                  label={(
                    <FormLabel
                      labelId="cms.contentsettings.form.metadatamapping"
                      helpId="cms.contentsettings.form.metadatamapping.help"
                      helpValues={{ key: meta.key }}
                    />
                  )}
                />
              </Col>
              <Col xs={12} md={1} className="text-right ContentSettingsMetadata__list-cell-del">
                <Button
                  bsStyle="danger"
                  data-key={meta.key}
                  data-metadata={meta.metadata}
                  onClick={this.onClickDelete}
                >
                  <Icon name="trash" />
                </Button>
              </Col>
            </Row>
          ))}
        </form>
        <DeleteContentMetadataModalContainer />
      </>
    );
  }
}

ContentSettingsMetadataListBody.propTypes = {
  metadatas: PropTypes.arrayOf(PropTypes.shape({})),
  handleSubmit: PropTypes.func.isRequired,
  onPromptDelete: PropTypes.func.isRequired,
};

ContentSettingsMetadataListBody.defaultProps = {
  metadatas: [],
};

const ContentSettingsMetadataList = reduxForm({
  form: 'settingsmetadata',
  enableReinitialize: true,
})(ContentSettingsMetadataListBody);


export default ContentSettingsMetadataList;
