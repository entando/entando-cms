import { connect } from 'react-redux';
import { formValueSelector, submit } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { METHODS } from '@entando/apimanager';
import { clearErrors } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import { MODE_EDIT_COMPOSITE, MODE_ADD_ATTRIBUTE_COMPOSITE } from 'state/content-type/const';

import EditContentTypeAttributeForm from 'ui/common/form/EditContentTypeAttributeForm';
import {
  setActionMode,
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
  getContentTypeSelectedAttributeSearchable,
  getContentTypeSelectedAttributeIndexable,
} from 'state/content-type/selectors';

import {
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD,
  ROUTE_CMS_CONTENTTYPE_EDIT,
  ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT,
} from 'app-init/routes';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

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
  isSearchable: getContentTypeSelectedAttributeIndexable(state),
  isIndexable: getContentTypeSelectedAttributeSearchable(state),
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
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('attribute')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: (mode) => {
    dispatch(setVisibleModal(''));
    console.log('lemode', mode);
    if (mode === MODE_ADD_ATTRIBUTE_COMPOSITE) {
      dispatch(setActionMode(MODE_EDIT_COMPOSITE));
      history.push(
        routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT, {
          entityCode: params.entityCode,
          attributeCode: params.attributeCode,
        }),
      );
    } else {
      history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: params.entityCode }));
    }
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
        () => history.push(routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD, {
          entityCode: contentTypeAttributeCode,
        })),
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

export default injectIntl(withRouter(EditContentTypeAttributeFormContainer));
