import React from 'react';
import {
  Row, Col, Button, Grid,
} from 'patternfly-react';
import { ToggleButton, ButtonToolbar } from 'react-bootstrap';
import { intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { formatDate, PermissionCheck } from '@entando/utils';
import { REGULAR_SAVE_TYPE, APPROVE_SAVE_TYPE, CONTINUE_SAVE_TYPE } from 'state/edit-content/types';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import { withPermissionValues } from 'ui/common/auth/withPermissions';
import { VALIDATE_CONTENTS_PERMISSION } from 'state/permissions/const';

import ToggleButtonGroupField from 'ui/common/form/ToggleButtonGroupField';

const messages = defineMessages({
  chooseOption: {
    id: 'cms.chooseAnOption',
  },
  new: {
    id: 'cms.new',
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
    id: 'cms.label.cancel',
  },
  saveAndContinue: {
    id: 'cms.saveAndContinue',
  },
});

const isValidDateTimeStr = (dateTime) => {
  const formattedDateTime = formatDate(dateTime);
  return (typeof formattedDateTime === 'string') && !(['N/A', 'INVALID DATE'].includes(formattedDateTime.toUpperCase()));
};

const StickySave = ({
  lastAutoSaveTime, intl, invalid, submitting, onLine, onSubmit, handleSubmit,
  onUnpublish, content, isDirty, onCancel, onDiscard, onSave, userPermissions,
  enableTranslationWarning,
}) => (
  <Grid className="no-padding">
    <Col xs={12} className="StickySave">
      <Row className="toolbar-pf table-view-pf-toolbar" style={{ backgroundColor: 'white' }}>
        <Col xs={12}>
          {
            isValidDateTimeStr(lastAutoSaveTime) ? (
              <Row className="StickySave__row">
                <Col xs={12} className="StickySave__column">
                  <strong>
                    <FormattedMessage
                      id="cms.stickySave.lastAutoSave"
                      defaultMessage="Last save was:"
                    />
                    {formatDate(lastAutoSaveTime)}
                  </strong>
                </Col>
              </Row>
            ) : ''
          }
          <Row className="toolbar-pf-actions">
            <Col xs={12} md={6} className="StickySave__column">
              <Col xs={12} className="no-padding ToggleButtonGroup">
                <strong>
                  <FormattedMessage id="cms.contents.ready" defaultMessage="Ready for approval" />
                </strong>
                <ButtonToolbar>
                  <Field
                    name="status"
                    component={ToggleButtonGroupField}
                  >
                    <ToggleButton
                      checked
                      value="ready"
                    >
                      <FormattedMessage id="cms.label.yes" />
                    </ToggleButton>
                    <ToggleButton
                      value="draft"
                    >
                      <FormattedMessage id="cms.label.no" />
                    </ToggleButton>
                  </Field>
                </ButtonToolbar>
              </Col>
            </Col>
            <Col xs={12} md={6} className="no-padding text-right">
              <Button
                bsStyle="primary"
                type="submit"
                onClick={handleSubmit(values => onSubmit({
                  ...values,
                  saveType: REGULAR_SAVE_TYPE,
                }, undefined, !enableTranslationWarning))}
                disabled={invalid || submitting || !isDirty}
              >
                {intl.formatMessage(messages.save)}
              </Button>
            </Col>
          </Row>
          <Row className="toolbar-pf-results">
            <Col xs={12} md={8} lg={6} lgOffset={6} mdOffset={4} className="no-padding">
              <Col xs={12} className="text-right">
                <strong className="StickySave__saveText">
                  <FormattedMessage id="cms.setContentAs" defaultMessage="Set content as" />
                </strong>
                <Button
                  type="submit"
                  disabled={invalid || submitting || !isDirty}
                  className="StickySave__actionButton"
                  onClick={handleSubmit(values => onSubmit({
                    ...values,
                    saveType: CONTINUE_SAVE_TYPE,
                  }, undefined, !enableTranslationWarning))}
                >
                  {intl.formatMessage(messages.saveAndContinue)}
                </Button>
                <PermissionCheck
                  requiredPermissions={VALIDATE_CONTENTS_PERMISSION}
                  userPermissions={userPermissions}
                >
                  <>
                    <Button
                      type="submit"
                      disabled={invalid || submitting || !isDirty}
                      className="StickySave__actionButton"
                      bsStyle="success"
                      onClick={handleSubmit(values => onSubmit({
                        ...values,
                        contentId: content.id,
                        saveType: APPROVE_SAVE_TYPE,
                      }, undefined, !enableTranslationWarning))}
                    >
                      {intl.formatMessage(messages.saveAndApprove)}
                    </Button>
                    {onLine && (
                      <Button
                        className="StickySave__actionButton"
                        bsStyle="warning"
                        onClick={() => onUnpublish(content)}
                      >
                        <span className="icon fa fa-pause" />
                        {` ${intl.formatMessage(messages.unpublish)}`}
                      </Button>
                    )}
                  </>
                </PermissionCheck>
                <Button
                  className="AddContentTypeFormBody__cancel--btn"
                  bsStyle="default"
                  onClick={isDirty ? onCancel : onDiscard}
                >
                  <FormattedMessage id="cms.label.cancel" />
                </Button>
                <ConfirmCancelModalContainer
                  contentText={intl.formatMessage({ id: 'cms.label.modal.confirmCancel' })}
                  invalid={invalid}
                  submitting={submitting}
                  onSave={onSave}
                  onDiscard={onDiscard}
                />
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  </Grid>
);

StickySave.propTypes = {
  intl: intlShape.isRequired,
  content: PropTypes.shape({
    id: PropTypes.string,
  }),
  lastAutoSaveTime: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUnpublish: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onLine: PropTypes.bool,
  isDirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  enableTranslationWarning: PropTypes.bool.isRequired,
};

StickySave.defaultProps = {
  lastAutoSaveTime: ' skipped',
  onLine: false,
  content: {},
  isDirty: false,
  userPermissions: [],
};

export default withPermissionValues(StickySave);
