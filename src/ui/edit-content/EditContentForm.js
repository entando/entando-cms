import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, defineMessages, FormattedMessage } from 'react-intl';
import {
  Row, Col, FormGroup, ControlLabel,
} from 'patternfly-react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { required } from '@entando/utils';

import SectionTitle from 'ui/common/SectionTitle';
import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderVersionText from 'ui/common/form/RenderVersionText';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import MultiSelectRenderer from 'ui/common/form/MultiSelectRenderer';
import CategoryTreeContainer from 'ui/categories/common/CategoryTreeSelectorContainer';
import StickySave from 'ui/common/StickySave';

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

const defaultOwnerGroup = 'free';

class EditContentFormBody extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { initialize, onDidMount } = this.props;
    initialize({ ownerGroup: defaultOwnerGroup });
    onDidMount();
  }

  render() {
    const {
      intl,
      groups,
      content,
      language,
      handleSubmit,
      selectedJoinGroups,
      ownerGroupDisabled,
      onSetOwnerGroupDisable,
      currentUser: { username: currentUserName },
    } = this.props;

    const { version, creatorUserName, modifierUserName } = content || {};
    const { contentType: newContentsType } = this.props;
    const contentType = content.contentType || newContentsType;
    const groupsWithEmptyOption = [...groups];

    return (
      <form onSubmit={handleSubmit} className="EditContentForm form-horizontal">
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
              <FormGroup>
                <Col xs={12}>
                  <Field
                    component={RenderTextInput}
                    name="contentDescription"
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
            </fieldset>
          </Row>
          <Row className="GroupsFormBody">
            <SectionTitle nameId="cms.contents.edit.groups" />
            <fieldset className="no-padding">
              <Col xs={12}>
                <FormGroup>
                  <Field
                    component={RenderSelectInput}
                    name="ownerGroup"
                    defaultValue="df"
                    append={
                      !ownerGroupDisabled ? (
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
                    validate={[required]}
                    defaultValueCode="freeAccess"
                    disabled={ownerGroupDisabled}
                  />
                </FormGroup>
                <FormGroup>
                  <FormGroup>
                    <ControlLabel htmlFor="joinGroups" className="col-xs-12 col-sm-2 text-right">
                      <FormLabel labelId="cms.contents.edit.groups.joinGroup.label" required />
                    </ControlLabel>
                    <Col xs={12} sm={10}>
                      <FieldArray
                        component={MultiSelectRenderer}
                        name="joinGroups"
                        intl={intl}
                        options={groups}
                        selectedValues={selectedJoinGroups}
                        labelKey="name"
                        valueKey="code"
                      />
                    </Col>
                  </FormGroup>
                </FormGroup>
              </Col>
            </fieldset>
          </Row>
          <Row className="GroupsFormBody">
            <SectionTitle nameId="cms.contents.edit.categories" />
            <fieldset className="no-padding">
              <FormGroup>
                <ControlLabel htmlFor="contentCategory" className="col-xs-2">
                  <FormLabel labelId="cms.contents.edit.categories" />
                </ControlLabel>
                <Col xs={10}>
                  <Field
                    component={CategoryTreeContainer}
                    language={language}
                    name="contentCategory"
                    treeNameId="cms.contents.edit.categories.categoriesTree"
                  />
                </Col>
              </FormGroup>
            </fieldset>
          </Row>
          <Row>
            <SectionTitle nameId="cms.contents.edit.contentAttributes" />
          </Row>
        </div>
        <Row>
          <StickySave intl={intl} />
        </Row>
      </form>
    );
  }
}
EditContentFormBody.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
  content: PropTypes.shape({}),
  contentType: PropTypes.string,
  currentUser: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedJoinGroups: PropTypes.arrayOf(PropTypes.string.isRequired),
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  onDidMount: PropTypes.func.isRequired,
  ownerGroupDisabled: PropTypes.bool,
  onSetOwnerGroupDisable: PropTypes.func.isRequired,
};

EditContentFormBody.defaultProps = {
  ownerGroupDisabled: false,
  selectedJoinGroups: [],
  content: {},
  contentType: '',
};

const EditContentForm = reduxForm({
  form: 'editcontentform',
})(EditContentFormBody);

export default EditContentForm;
