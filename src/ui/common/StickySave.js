import React from 'react';
import {
  Row, Col, Button, Grid,
} from 'patternfly-react';
import { intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

const messages = defineMessages({
  chooseOption: {
    id: 'cms.chooseAnOption',
  },
  new: {
    id: 'cms.new',
  },
  draft: {
    id: 'cms.contents.draft',
  },
  ready: {
    id: 'cms.contents.ready',
  },
  save: {
    id: 'cms.save',
  },
  saveAndApprove: {
    id: 'cms.saveAndApprove',
  },
  unpublish: {
    id: 'cms.unpublish',
  },
  setContentAs: {
    id: 'cms.setContentAs',
  },
  cancel: {
    id: 'cms.cancel',
  },
  saveAndContinue: {
    id: 'cms.saveAndContinue',
  },
});

const StickySave = ({ lastAutoSaveTime, intl, onCancel }) => {
  const statusCompontent = (props) => {
    // eslint-disable-next-line react/prop-types
    const { input } = props;
    return (
      <select className="form-control StickySave__select" disabled={false} {...props} {...input}>
        <option value="">
          {intl.formatMessage(messages.chooseOption)}
        </option>
        <option value="draft">{intl.formatMessage(messages.draft)}</option>
        <option value="ready">{intl.formatMessage(messages.ready)}</option>
      </select>
    );
  };
  return (
    <Grid className="no-padding">
      <Col xs={12} className="StickySave no-padding">
        <Row className="toolbar-pf table-view-pf-toolbar">
          <Col xs={12}>
            <Row className="StickySave__row">
              <Col xs={12} className="StickySave__column">
                <strong>
                  <FormattedMessage
                    id="cms.stickySave.lastAutoSave"
                    defaultMessage="Last autosave was:"
                  />
                  {lastAutoSaveTime}
                </strong>
              </Col>
            </Row>
            <Row className="toolbar-pf-actions">
              <Col xs={12} md={6} className="StickySave__column">
                <Col xs={12} className="no-padding">
                  <strong>
                    <FormattedMessage id="cms.stickySave.status" defaultMessage="Status" />
                  </strong>
                  <Field
                    component={statusCompontent}
                    name="contentStatus"
                  />
                </Col>
              </Col>
              <Col xs={12} md={6} className="no-padding text-right">
                <Button bsStyle="primary">{intl.formatMessage(messages.save)}</Button>
              </Col>
            </Row>
            <Row className="toolbar-pf-results">
              <Col xs={12} md={8} lg={6} lgOffset={6} mdOffset={4} className="no-padding">
                <Col xs={12} className="text-right">
                  <strong className="StickySave__saveText">
                    <FormattedMessage id="rame" defaultMessage="Set content as" />
                  </strong>
                  <Button className="StickySave__actionButton">
                    {intl.formatMessage(messages.saveAndContinue)}
                  </Button>
                  <Button className="StickySave__actionButton" bsStyle="success">
                    {intl.formatMessage(messages.saveAndApprove)}
                  </Button>
                  <Button className="StickySave__actionButton" bsStyle="warning">
                    <span className="icon fa fa-pause" />
                    {` ${intl.formatMessage(messages.unpublish)}`}
                  </Button>
                  <Button className="StickySave__actionButton--last" bsStyle="danger" onClick={() => onCancel()}>
                    {intl.formatMessage(messages.cancel)}
                  </Button>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Grid>
  );
};

StickySave.propTypes = {
  intl: intlShape.isRequired,
  lastAutoSaveTime: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
};

StickySave.defaultProps = {
  lastAutoSaveTime: ' skipped',
};

const StickySaveContainer = reduxForm({
  form: 'editcontentform',
})(StickySave);

export default StickySaveContainer;
