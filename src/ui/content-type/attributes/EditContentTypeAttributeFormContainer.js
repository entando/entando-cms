import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { METHODS } from '@entando/apimanager';
import { clearErrors } from '@entando/messages';
import { routeConverter } from '@entando/utils';

import EditContentTypeAttributeForm from 'ui/common/form/EditContentTypeAttributeForm';
import {
  fetchAttributeFromContentType,
  handlerAttributeFromContentType,
  fetchContentTypeAttributes,
  fetchContentTypeAttribute,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
} from 'state/content-type/actions';

import {
  getSelectedAttributeType,
  getContentTypeAttributesIdList,
  getContentTypeSelectedAttributeAllowedRoles,
  getSelectedCompositeAttributes,
  getActionModeContentTypeSelectedAttribute,
  getContentTypeSelectedAttribute,
  getIsMonolistCompositeAttributeType,
} from 'state/content-type/selectors';

import { ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD } from 'app-init/routes';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: getActionModeContentTypeSelectedAttribute(state) || 'edit',
  attributeCode: params.attributeCode,
  contentTypeAttributeCode: params.entityCode,
  joinAllowedOptions:
    formValueSelector('attribute')(state, 'joinRoles')
    || formValueSelector('attribute')(state, 'joinAllowedOptions')
    || [],
  selectedAttributeType: getSelectedAttributeType(state),
  selectedAttributeTypeForAddComposite: getContentTypeSelectedAttribute(state),
  attributesList: getContentTypeAttributesIdList(state),
  allowedRoles: getContentTypeSelectedAttributeAllowedRoles(state),
  compositeAttributes: getSelectedCompositeAttributes(state),
  isMonolistCompositeType: getIsMonolistCompositeAttributeType(state),
  nestedAttributeComposite: formValueSelector('attribute')(state, 'nestedAttribute.type') || '',
});

export const mapDispatchToProps = (dispatch, { match: { params }, history }) => ({
  onDidMount: ({ contentTypeAttributeCode, attributeCode }) => {
    dispatch(clearErrors());
    dispatch(fetchAttributeFromContentType('attribute', contentTypeAttributeCode, attributeCode));
    dispatch(fetchContentTypeAttributes());
  },
  onSubmit: (values, allowedRoles, mode) => {
    dispatch(
      handlerAttributeFromContentType(
        METHODS.PUT,
        values,
        allowedRoles,
        mode,
        params.entityCode,
        history,
      ),
    );
  },
  onAddAttribute: (props) => {
    const { attributeCode, contentTypeAttributeCode, selectedAttributeType } = props;
    dispatch(
      fetchContentTypeAttribute(
        attributeCode,
        () => history.push(
          routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD, {
            entityCode: contentTypeAttributeCode,
          }),
        ),
        selectedAttributeType,
        'attribute',
      ),
    );
  },
  onClickDelete: (attributeCode, isMonolistCompositeType) => {
    dispatch(removeAttributeFromComposite(attributeCode, isMonolistCompositeType));
  },
  onMove: (fromIndex, toIndex, isMonolistCompositeType) => {
    dispatch(moveAttributeFromComposite(fromIndex, toIndex, isMonolistCompositeType));
  },
});

const EditContentTypeAttributeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(EditContentTypeAttributeForm);

export default withRouter(EditContentTypeAttributeFormContainer);
