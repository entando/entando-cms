import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape, defineMessages } from 'react-intl';
import { CKEDITOR_OPTION_NODE } from 'state/content-settings/const';
import RadioInput from 'ui/common/form/RenderRadioInput';

import { Row, Col, Button, Icon } from 'patternfly-react';

const messages = defineMessages({
  none: {
    id: 'cms.label.none',
    defaultMessage: 'None',
  },
  saving: {
    id: 'cms.label.saving',
    defaultMessage: 'Waiting',
  },
  reloading: {
    id: 'cms.label.reloading',
    defaultMessage: 'Refreshing',
  },
});

class ContentSettingsGeneral extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const {
      intl,
      referenceStatus,
      indexesStatus,
      indexesLastReloadDate,
      indexesLastReloadResult,
      editorSettings,
      onEditorChange,
      onReloadReferences,
      onReloadIndexes,
      isReloadingReferences,
      isReloadingIndexes,
      isEditorChanging,
    } = this.props;

    const editorInput = {
      value: editorSettings.key,
      name: 'editor',
      onChange: onEditorChange,
    };

    const EDITOR_OPTIONS = [
      {
        id: 'none',
        label: intl.formatMessage(messages.none),
      },
      CKEDITOR_OPTION_NODE,
    ];

    const saving = intl.formatMessage(messages.saving);
    const reloading = intl.formatMessage(messages.reloading);

    const reloadStatusId = 'cms.contentsettings.label.reloadstatus';

    let lastReloadRemarkId = '';
    if (indexesLastReloadDate) {
      lastReloadRemarkId = `${reloadStatusId}.remark.${
        indexesLastReloadResult ? 'success' : 'failed'
      }`;
    }

    const statuses = defineMessages({
      reference: {
        id: `${reloadStatusId}.${referenceStatus}`,
      },
      indexes: {
        id: `${reloadStatusId}.${indexesStatus}`,
      },
    });

    const generateEditorSwitch = () => (
      <Row>
        <Col xs={12} sm={2} className="text-right">
          <FormattedMessage id="cms.contentsettings.label.editor" defaultMessage="Editor" />
        </Col>
        <Col xs={12} sm={10}>
          <div className="ContentSettingsGeneral__editor-switch">
            <RadioInput
              input={editorInput}
              toggleElement={EDITOR_OPTIONS}
              defaultValue={editorSettings.key}
              meta={{ touched: false, error: false }}
            />
          </div>{' '}
          {isEditorChanging ? (
            <span>
              ({saving}... <Icon title={`${saving}...`} name="spinner" type="fa" />)
            </span>
          ) : (
            ''
          )}
        </Col>
      </Row>
    );

    return (
      <div className="ContentSettingsGeneral__form-group">
        <Row>
          <Col xs={12} sm={2} className="text-right">
            <FormattedMessage
              id="cms.contentsettings.label.reloadreferences"
              defaultMessage="Reload references"
            />
          </Col>
          <Col xs={12} sm={10}>
            <Button bsStyle="primary" onClick={onReloadReferences}>
              <FormattedMessage
                id="cms.contentsettings.label.reloadreferences"
                defaultMessage="Reload references"
              />
            </Button>{' '}
            {isReloadingReferences ? (
              <span>
                ({reloading}... <Icon title={`${reloading}...`} name="spinner" type="fa" />)
              </span>
            ) : (
              <span>({intl.formatMessage(statuses.reference)})</span>
            )}
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12} sm={2} className="text-right">
            <FormattedMessage
              id="cms.contentsettings.label.reloadindexes"
              defaultMessage="Reload indexes"
            />
          </Col>
          <Col xs={12} sm={10}>
            <Button bsStyle="primary" onClick={onReloadIndexes}>
              <FormattedMessage
                id="cms.contentsettings.label.reloadindexes"
                defaultMessage="Reload indexes"
              />
            </Button>{' '}
            {isReloadingIndexes ? (
              <span>
                ({reloading}... <Icon title={`${reloading}...`} name="spinner" type="fa" />)
              </span>
            ) : (
              <span>({intl.formatMessage(statuses.indexes)})</span>
            )}
          </Col>
        </Row>
        {lastReloadRemarkId ? (
          <Row>
            <Col xs={12} sm={2} />
            <Col xs={12} sm={10}>
              <div className="ContentSettingsGeneral__last-reload-remark">
                <FormattedMessage
                  id={lastReloadRemarkId}
                  values={{ date: indexesLastReloadDate }}
                />
              </div>
            </Col>
          </Row>
        ) : (
          ''
        )}
        <br />
        {generateEditorSwitch()}
      </div>
    );
  }
}

ContentSettingsGeneral.propTypes = {
  intl: intlShape.isRequired,
  onDidMount: PropTypes.func.isRequired,
  editorSettings: PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.string,
  }),
  indexesStatus: PropTypes.number,
  indexesLastReloadDate: PropTypes.string,
  indexesLastReloadResult: PropTypes.bool,
  referenceStatus: PropTypes.number,
  onReloadReferences: PropTypes.func.isRequired,
  onReloadIndexes: PropTypes.func.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  isReloadingReferences: PropTypes.bool,
  isReloadingIndexes: PropTypes.bool,
  isEditorChanging: PropTypes.bool,
};

ContentSettingsGeneral.defaultProps = {
  indexesStatus: 1,
  referenceStatus: 1,
  editorSettings: { label: '', key: '' },
  indexesLastReloadDate: '',
  indexesLastReloadResult: PropTypes.bool,
  isReloadingReferences: false,
  isReloadingIndexes: false,
  isEditorChanging: false,
};

export default injectIntl(ContentSettingsGeneral);
