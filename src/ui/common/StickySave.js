import React from 'react';
import {
  Row, Col, Button, DropdownButton, MenuItem,
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
}) => {
  const handleActionSelected = (saveType) => {
    handleSubmit(values => onSubmit({
      ...values,
      saveType,
    }, undefined, !enableTranslationWarning, content.attributes));
  };

  return (
    <Col xs={12} className="StickySave">
      <Row className="StickySave__row--top">
        <Col xs={12} className="text-right">
          {isValidDateTimeStr(lastAutoSaveTime) && (
            <strong className="StickySave__btnlabel">
              <FormattedMessage
                id="cms.stickySave.lastAutoSave"
                defaultMessage="Last save was:"
              />
              {formatDate(lastAutoSaveTime)}
            </strong>
          )}
          <Button
            className="AddContentTypeFormBody__cancel--btn"
            bsStyle="default"
            onClick={isDirty ? onCancel : onDiscard}
          >
            <FormattedMessage id="cms.label.cancel" />
          </Button>
          <DropdownButton
            title="Save"
            id="saveopts"
            onSelect={handleActionSelected}
          >
            <MenuItem eventKey={REGULAR_SAVE_TYPE}>
              <FormattedMessage id="cms.save" />
            </MenuItem>
            <MenuItem
              eventKey={CONTINUE_SAVE_TYPE}
              disabled={invalid || submitting || !isDirty}
              className="StickySave__actionButton"
            >
              <FormattedMessage id="cms.saveAndContinue" />
            </MenuItem>
            <PermissionCheck
              requiredPermissions={VALIDATE_CONTENTS_PERMISSION}
              userPermissions={userPermissions}
            >
              <MenuItem
                eventKey={APPROVE_SAVE_TYPE}
                disabled={invalid || submitting || !isDirty}
              >
                <FormattedMessage id="cms.saveAndApprove" />
              </MenuItem>
            </PermissionCheck>
          </DropdownButton>
          {onLine && (
            <Button
              className="StickySave__actionButton StickySave__btnwide"
              bsStyle="warning"
              onClick={() => onUnpublish(content)}
            >
              <span className="icon fa fa-pause" />
              {` ${intl.formatMessage(messages.unpublish)}`}
            </Button>
          )}
        </Col>
      </Row>
      <Row className="StickySave__row">
        <Col xs={12} className="StickySave__column ToggleButtonGroup text-right">
          <strong className="StickySave__btnlabel">
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
      </Row>
      <ConfirmCancelModalContainer
        contentText={intl.formatMessage({ id: 'cms.label.modal.confirmCancel' })}
        invalid={invalid}
        submitting={submitting}
        onSave={onSave}
        onDiscard={onDiscard}
      />
    </Col>
  );
};

StickySave.propTypes = {
  intl: intlShape.isRequired,
  content: PropTypes.shape({
    id: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.shape({})),
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
