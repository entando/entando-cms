import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  Row,
  Col,
  Button,
  Modal,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { required, code, maxLength } from '@entando/utils';

import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import RenderContentModelInput from 'ui/common/form/RenderContentModelInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';


const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const maxLength50 = maxLength(50);
const maxLength70 = maxLength(70);

class AddContentModelFormBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false,
    };
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalOpen() {
    this.setState({ modalOpened: true });
  }

  handleModalClose() {
    this.setState({ modalOpened: false });
  }

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      mode,
    } = this.props;
    const { modalOpened } = this.state;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <Modal show={modalOpened} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              <FormattedMessage id="cms.contentmodel.form.editassistant" defaultMessage="Help Assistant" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              Let&#39;s see an example on how to activate <strong>INLINE EDITING</strong> on Entando labels
              <br />
              <br />
              <ol>
                <li> Open a <strong>TAG</strong> like div p span... </li>
                <li> add the class <strong>&#39;editContent&#39;</strong> to the TAG. Keep in mind that <strong>&#39;editContentText&#39;</strong> class can be used in case of a text-area. </li>
                <li>then add <strong>data-content-id=&quot;$content.getId()&quot;</strong> </li>
                <li>then add the attribute ID (TITLE) of the desidered label adding <strong>data-attr-id=&quot;TITLE&quot;</strong> and close the tag with &gt;. Please be careful when writing the attribute ID as it is <strong>case sensitive</strong> and it must match the label attribute in the next step </li>
                <li>finally add the label of the desidered attribute that will be rendered on screen writing <strong>$content.TITLE.text</strong>.</li>
                <li>Close the <strong>TAG</strong> (div p span ...) opened at the very beginning.</li>
              </ol>
              Result should look like this:
              <br />
              <br /> OPEN TAG class=&quot;editContent&quot; data-content-id=&quot;$content.getId()&quot; data-attr-id=&quot;TITLE&quot;>
              <br />$content.TITLE.text
              <br />CLOSE TAG
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <div className="AddContentModelForm__required-fields text-right">
                  * <FormattedMessage id="cms.label.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                name="code"
                label={
                  <FormLabel labelId="cms.contentmodel.form.code" helpId="cms.contentmodel.form.codeHelp" required />
                }
                validate={[required, code, maxLength50]}
                disabled={mode === EDIT_MODE}
              />
              <Field
                component={RenderTextInput}
                name="name"
                label={<FormLabel labelId="cms.label.name" helpId="cms.contentmodel.form.codeHelp" required />}
                validate={[required, maxLength70]}
              />
              <Field
                component={RenderDropdownTypeaheadInput}
                name="contentType"
                label={<FormLabel labelId="cms.contentmodel.list.contentTypeHeader" helpId="cms.contentmodel.form.codeHelp" required />}
                options={[
                  {
                    id: 10013,
                    contentType: 'Generic Content',
                  },
                  {
                    id: 10002,
                    contentType: 'News',
                  },
                ]}
                labelKey="contentType"
                placeholder="Choose Content Type..."
              />
            </fieldset>
          </Col>
          <Col xs={12}>
            <Field
              name="model"
              label={<FormLabel labelId="cms.contentmodel.form.htmlmodel" helpId="cms.contentmodel.form.codeHelp" required />}
              prepend={(
                <>
                  <Button className="AddContentModelForm__editassistbtn" onClick={this.handleModalOpen}><FormattedMessage id="cms.contentmodel.form.editassistant" defaultMessage="Help Assistant" /></Button>
                  <p>
                    Content Assist is <strong>ON</strong><br />
                    Help About Attributes Type is <strong>OFF</strong><br />
                    If you want to change the status, you should set them in Admin Configuration Area
                  </p>
                </>
              )}
              component={RenderContentModelInput}
              cols="50"
              rows="8"
              className="form-control"
              validate={[required]}
            />
          </Col>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="stylesheet"
              label={<FormLabel labelId="cms.contentmodel.form.stylesheet" helpId="cms.contentmodel.form.codeHelp" />}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="cms.label.save" />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

AddContentModelFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
};

AddContentModelFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: NEW_MODE,
};

const AddContentModelForm = reduxForm({
  form: 'contentmodelform',
})(AddContentModelFormBody);

export default AddContentModelForm;
