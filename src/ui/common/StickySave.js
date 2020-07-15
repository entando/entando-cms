import React from 'react';
import {
  Row, Col, Button, Grid,
} from 'patternfly-react';
import { intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { formatDate, PermissionCheck } from '@entando/utils';
import { REGULAR_SAVE_TYPE, APPROVE_SAVE_TYPE, CONTINUE_SAVE_TYPE } from 'state/edit-content/types';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import { withPermissionValues } from 'ui/common/auth/withPermissions';
import { VALIDATE_CONTENTS_PERMISSION } from 'state/permissions/const';

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
    id: 'cms.label.cancel',
  },
  saveAndContinue: {
    id: 'cms.saveAndContinue',
  },
});

const StickySave = ({
  lastAutoSaveTime, intl, invalid, submitting, onLine, onSubmit, handleSubmit,
  onUnpublish, content, isDirty, onCancel, onDiscard, onSave, userPermissions,
}) => (
  <Grid className="no-padding">
    <Col xs={12} className="StickySave">
      <Row className="toolbar-pf table-view-pf-toolbar">
        <Col xs={12}>
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
          <Row className="toolbar-pf-actions">
            <Col xs={12} md={6} className="StickySave__column">
              <Col xs={12} className="no-padding">
                <strong>
                  <FormattedMessage id="cms.stickySave.status" defaultMessage="Status" />
                </strong>
                <Field name="status" component="select" className="form-control StickySave__select">
                  <option value="">
                    {intl.formatMessage(messages.chooseOption)}
                  </option>
                  <option key="draft" value="draft">{intl.formatMessage(messages.draft)}</option>
                  <option key="ready" value="ready">{intl.formatMessage(messages.ready)}</option>
                </Field>
              </Col>
            </Col>
            <Col xs={12} md={6} className="no-padding text-right">
              <Button
                bsStyle="primary"
                type="submit"
                onClick={handleSubmit(values => onSubmit({
                  ...values,
                  saveType: REGULAR_SAVE_TYPE,
                }))}
                disabled={invalid || submitting}
              >
                {intl.formatMessage(messages.save)}
              </Button>
            </Col>
          </Row>
          <Row className="toolbar-pf-results">
            <Col xs={12} md={8} lg={6} lgOffset={6} mdOffset={4} className="no-padding">
              <Col xs={12} className="text-right">
                <strong className="StickySave__saveText">
                  <FormattedMessage id="rame" defaultMessage="Set content as" />
                </strong>
                <Button
                  type="submit"
                  disabled={invalid || submitting}
                  className="StickySave__actionButton"
                  onClick={handleSubmit(values => onSubmit({
                    ...values,
                    saveType: CONTINUE_SAVE_TYPE,
                  }))}
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
                      disabled={invalid || submitting}
                      className="StickySave__actionButton"
                      bsStyle="success"
                      onClick={handleSubmit(values => onSubmit({
                        ...values,
                        contentId: content.id,
                        saveType: APPROVE_SAVE_TYPE,
                      }))}
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
};

StickySave.defaultProps = {
  lastAutoSaveTime: ' skipped',
  onLine: false,
  content: {},
  isDirty: false,
  userPermissions: [],
};

const StickySaveContainer = reduxForm({
  form: 'editcontentform',
})(StickySave);

export default withPermissionValues(StickySaveContainer);
