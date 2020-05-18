import { connect } from 'react-redux';
import { formValueSelector, submit } from 'redux-form';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { METHODS } from '@entando/apimanager';
import { clearErrors } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import AddContentTypeAttributeForm from 'ui/common/form/AddContentTypeAttributeForm';
import {
  setActionMode,
  fetchContentTypeAttributeRefs,
  handlerAttributeFromContentType,
  fetchContentTypeAttributeRef,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
} from 'state/content-type/actions';

import {
  getContentTypeSelectedAttribute,
  getContentTypeSelectedAttributeCode,
  getContentTypeAttributesIdList,
  getContentTypeSelectedAttributeAllowedRoles,
  getActionModeContentTypeSelectedAttribute,
  getSelectedCompositeAttributes,
} from 'state/content-type/selectors';

import { ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD, ROUTE_CMS_CONTENTTYPE_EDIT } from 'app-init/routes';
import { TYPE_COMPOSITE, MODE_ADD } from 'state/content-type/const';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: getActionModeContentTypeSelectedAttribute(state) || 'add',
  contentTypeAttributeCode: params.entityCode,
  joinAllowedOptions: formValueSelector('addAttribute')(state, 'joinRoles') || [],
  selectedAttributeType: getContentTypeSelectedAttribute(state),
  attributesList: getContentTypeAttributesIdList(state),
  initialValues: {
    type: getContentTypeSelectedAttributeCode(state),
    compositeAttributeType: TYPE_COMPOSITE,
  },
  allowedRoles: getContentTypeSelectedAttributeAllowedRoles(state),
  compositeAttributes: getSelectedCompositeAttributes(state),
});

export const mapDispatchToProps = (dispatch, { match: { params }, history }) => ({
  onDidMount: () => {
    dispatch(clearErrors());
    dispatch(fetchContentTypeAttributeRefs());
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('addAttribute')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: params.entityCode })); },
  onSubmit: (values, allowedRoles, mode) => {
    console.log('onSubmit', values, allowedRoles, mode, params.entityCode);
    dispatch(
      handlerAttributeFromContentType(
        METHODS.POST,
        values,
        allowedRoles,
        mode,
        params.entityCode,
        history,
      ),
    );
  },
  onAddAttribute: (props) => {
    const {
      attributeCode,
      entityCode,
      selectedAttributeType: { code },
    } = props;
    dispatch(setActionMode(MODE_ADD));
    dispatch(
      fetchContentTypeAttributeRef(
        attributeCode,
        () => history.push(routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD, { entityCode })),
        code,
        'addAttribute',
      ),
    );
  },
  onClickDelete: (attributeCode) => {
    dispatch(removeAttributeFromComposite(attributeCode));
  },
  onMove: (fromIndex, toIndex) => {
    dispatch(moveAttributeFromComposite(fromIndex, toIndex));
  },
});

export default injectIntl(withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
      pure: false,
    },
  )(AddContentTypeAttributeForm),
));
