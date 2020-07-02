import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, defineMessages, FormattedMessage } from 'react-intl';
import {
  Row, Col, FormGroup, ControlLabel, Spinner,
} from 'patternfly-react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import Panel from 'react-bootstrap/lib/Panel';
import { required } from '@entando/utils';

import StickySave from 'ui/common/StickySave';
import SectionTitle from 'ui/common/SectionTitle';
import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderVersionText from 'ui/common/form/RenderVersionText';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import MultiSelectRenderer from 'ui/common/form/MultiSelectRenderer';
import CategoryTreeContainer from 'ui/categories/common/CategoryTreeSelectorContainer';

import { WORK_MODE_ADD, WORK_MODE_EDIT } from 'state/edit-content/types';
import ContentAttributesContainer from 'ui/edit-content/content-attributes/ContentAttributesContainer';
import SingleContentVersioningHistoryContainer from 'ui/versioning/SingleContentVersioningHistoryContainer';

const messages = defineMessages({
  contentDesctiption: {
    id: 'cms.contents.edit.contentDescription.placeholder',
    defaultMessage: 'Descriptions help you archive, sort, and find contents',
  },
  creator: {
    id: 'cms.contents.edit.version.creator',
    defaultMessage: 'created - by',
  },
  modifier: {
    id: 'cms.contents.edit.version.modifier',
    defaultMessage: 'modified by',
  },
  sameAuthor: {
    id: 'cms.contents.edit.version.you',
    defaultMessage: 'you',
  },
});

const defaultOwnerGroup = '';

export class EditContentFormBody extends React.Component {
  componentDidMount() {
    const {
      initialize, onDidMount, match: { params = {} },
      onIncompleteData,
    } = this.props;
    const { id: contentId, contentType } = params;
    const fetchContentParams = `/${contentId}`;
    if (contentType == null && contentId == null) return onIncompleteData();
    // if contentId from params is null, it means we are creating a new content
    if (contentId == null) {
      initialize({ mainGroup: defaultOwnerGroup, contentType });
    }
    return onDidMount(fetchContentParams);
  }

  componentWillUnmount() {
    const { onWillUnmount } = this.props;
    onWillUnmount();
  }

  render() {
    const {
      intl,
      groups,
      content,
      language,
      workMode,
      handleSubmit,
      onSubmit,
      invalid,
      submitting,
      onUnpublish,
      selectedJoinGroups,
      ownerGroupDisabled,
      contentType: cType,
      onSetOwnerGroupDisable,
      currentUser: currentUserName,
      dirty,
      onCancel,
      onDiscard,
      onSave,
      loading,
      match: { params = {} },
      selectedOwnerGroup,
    } = this.props;
    const { id } = params;
    const {
      version, lastModified, firstEditor: creatorUserName, lastEditor: modifierUserName,
      onLine,
    } = content || {};
    const newContentsType = {
      typeDescription: cType.name,
      typeCode: cType.code,
    };
    const contentType = content.typeDescription || newContentsType.typeDescription || '';
    const typeCode = content.typeCode || newContentsType.typeCode;
    const groupsWithEmptyOption = [...groups];
    const disableOwnerGroupFunction = (e) => {
      if (e.target.value) {
        onSetOwnerGroupDisable(true);
      }
    };
    const showAllSettings = (workMode === WORK_MODE_ADD && ownerGroupDisabled)
    || workMode === WORK_MODE_EDIT;
    const showStyle = { style: { display: showAllSettings ? 'block' : 'none' } };
    const renderContentVersioningHistory = workMode === WORK_MODE_EDIT && id && (
      <Row className="no-padding">
        <Panel>
          <Panel.Heading>
        Content Info
          </Panel.Heading>
          <Panel.Body>
            <legend>
          History
            </legend>
            <SingleContentVersioningHistoryContainer id={id} />
          </Panel.Body>
        </Panel>
      </Row>
    );
    return (
      <Spinner loading={!!loading}>
        <form
          className="EditContentForm form-horizontal"
        >
          <div className="EditContentForm__content">
            <Row className="InfoFormBody">
              <SectionTitle nameId="cms.contents.edit.info" />
              <fieldset className="no-padding">
                <FormGroup>
                  <Col xs={12}>
                    <Field
                      component={RenderVersionText}
                      name="id"
                      label={<FormLabel labelId="cms.contents.edit.version.label" />}
                      version={version || '0.0'}
                      labelSize={2}
                      currentUserName={currentUserName}
                      creatorUserName={creatorUserName || currentUserName}
                      modifierUserName={modifierUserName || currentUserName}
                      modifierText={intl.formatMessage(messages.modifier)}
                      creatorText={intl.formatMessage(messages.creator)}
                      sameAuthorText={intl.formatMessage(messages.sameAuthor)}
                      disabled
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col xs={12}>
                    <Field
                      component={RenderTextInput}
                      name="contentType"
                      label={<FormLabel labelId="cms.contents.edit.contentType.label" />}
                      disabled
                      input={{ value: contentType }}
                    />
                  </Col>
                </FormGroup>
                <div id="contentDescriptionWrapper" {...showStyle}>
                  <FormGroup>
                    <Col xs={12}>
                      <Field
                        component={RenderTextInput}
                        name="description"
                        validate={[required]}
                        label={(
                          <FormLabel
                            labelId="cms.contents.edit.contentDescription.label"
                            helpId="cms.contents.edit.contentDescription.tooltip"
                          />
    )}
                        placeholder={intl.formatMessage(messages.contentDesctiption)}
                      />
                    </Col>
                  </FormGroup>
                </div>
              </fieldset>
            </Row>
            <Row className="GroupsFormBody">
              <SectionTitle nameId="cms.contents.edit.groups" />
              <fieldset className="no-padding">
                <Col xs={12}>
                  <FormGroup>
                    <Field
                      component={RenderSelectInput}
                      name="mainGroup"
                      onChange={disableOwnerGroupFunction}
                      append={
                      !ownerGroupDisabled && workMode === WORK_MODE_ADD ? (
                        <button
                          type="button"
                          onClick={() => onSetOwnerGroupDisable(true)}
                          className="btn btn-primary"
                        >
                          <FormattedMessage id="cms.contents.edit.groups.ownerGroup.button" />
                        </button>
                      ) : null
                    }
                      label={(
                        <FormLabel
                          labelId="cms.contents.edit.groups.ownerGroup.label"
                          helpId="cms.contents.edit.groups.ownerGroup.tooltip"
                          required
                        />
)}
                      labelSize={2}
                      options={groupsWithEmptyOption}
                      optionValue="code"
                      optionDisplayName="name"
                      defaultOptionId="cms.label.chooseoption"
                      disabled={workMode === WORK_MODE_EDIT ? true : ownerGroupDisabled}
                    />
                  </FormGroup>
                  <div id="contentGroupsWrapper" {...showStyle}>
                    <FormGroup>
                      <FormGroup>
                        <ControlLabel htmlFor="groups" className="col-xs-12 col-sm-2 text-right">
                          <FormLabel labelId="cms.contents.edit.groups.joinGroup.label" />
                        </ControlLabel>
                        <Col xs={12} sm={10}>
                          <FieldArray
                            component={MultiSelectRenderer}
                            name="groups"
                            intl={intl}
                            options={groups}
                            selectedValues={selectedJoinGroups}
                            labelKey="name"
                            valueKey="code"
                          />
                        </Col>
                      </FormGroup>
                    </FormGroup>
                  </div>
                </Col>
              </fieldset>
            </Row>
            <div id="attributesWrapper" {...showStyle}>
              <Fragment>
                <Row className="GroupsFormBody">
                  <SectionTitle nameId="cms.contents.edit.categories" />
                  <fieldset className="no-padding">
                    <FormGroup>
                      <ControlLabel htmlFor="contentCategories" className="col-xs-2">
                        <FormLabel labelId="cms.contents.edit.categories" />
                      </ControlLabel>
                      <Col xs={10}>
                        <Field
                          component={CategoryTreeContainer}
                          language={language}
                          name="contentCategories"
                          treeNameId="cms.contents.edit.categories.categoriesTree"
                        />
                      </Col>
                    </FormGroup>
                  </fieldset>
                </Row>
                <Row>
                  <SectionTitle nameId="cms.contents.edit.contentAttributes" />
                  {(content.attributes || typeCode) && (
                  <ContentAttributesContainer
                    attributes={content.attributes}
                    typeCode={typeCode}
                    content={content}
                    mainGroup={selectedOwnerGroup}
                  />
                  )}
                </Row>
              </Fragment>
            </div>
            {renderContentVersioningHistory}
          </div>
          <div className="AssetsList__footer">
            <StickySave
              intl={intl}
              lastAutoSaveTime={lastModified}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              invalid={invalid}
              isDirty={dirty}
              onCancel={onCancel}
              onDiscard={onDiscard}
              onSave={onSave}
              submitting={submitting}
              onLine={onLine}
              content={content}
              onUnpublish={onUnpublish}
            />
          </div>
        </form>
      </Spinner>
    );
  }
}
EditContentFormBody.propTypes = {
  intl: intlShape.isRequired,
  workMode: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  content: PropTypes.shape({
    typeDescription: PropTypes.string,
    typeCode: PropTypes.string,
    mainGroup: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  currentUser: PropTypes.string.isRequired,
  location: PropTypes.shape({}).isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  selectedJoinGroups: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  onDidMount: PropTypes.func.isRequired,
  ownerGroupDisabled: PropTypes.bool,
  onSetOwnerGroupDisable: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({}) }).isRequired,
  onIncompleteData: PropTypes.func.isRequired,
  onWillUnmount: PropTypes.func.isRequired,
  onUnpublish: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  contentType: PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  }),
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  selectedOwnerGroup: PropTypes.string,
};

EditContentFormBody.defaultProps = {
  ownerGroupDisabled: false,
  selectedJoinGroups: [],
  content: {},
  invalid: false,
  submitting: false,
  contentType: {},
  dirty: false,
  loading: false,
  groups: [],
  selectedOwnerGroup: '',
};

const EditContentForm = reduxForm({
  form: 'editcontentform',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(EditContentFormBody);

export default EditContentForm;
