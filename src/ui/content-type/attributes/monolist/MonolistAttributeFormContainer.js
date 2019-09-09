import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearErrors } from '@entando/messages';
import { formValueSelector } from 'redux-form';
import { routeConverter } from '@entando/utils';

import {
  fetchAttributeFromContentType,
  fetchContentTypeAttribute,
  sendPutAttributeFromContentTypeMonolist,
  setActionMode,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
} from 'state/content-type/actions';
import {
  getActionModeContentTypeSelectedAttribute,
  getContentTypeAttributesIdList,
  getContentTypeSelectedAttribute,
  getSelectedCompositeAttributes,
} from 'state/content-type/selectors';
import {
  TYPE_COMPOSITE,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
  MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'state/content-type/const';

import { ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD, ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD } from 'app-init/routes';

import MonolistAttributeForm from 'ui/common/form/MonolistAttributeForm';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: getActionModeContentTypeSelectedAttribute(state),
  attributeCode: params.attributeCode,
  contentTypeCode: params.entityCode,
  isIndexable: formValueSelector('monoListAttribute')(state, 'nestedAttribute.indexable'),
  type: formValueSelector('monoListAttribute')(state, 'nestedAttribute.type'),
  selectedAttributeTypeForAddComposite: getContentTypeSelectedAttribute(state),
  selectedAttributeType: formValueSelector('monoListAttribute')(state, 'type'),
  attributesList: getContentTypeAttributesIdList(state),
  compositeAttributes: getSelectedCompositeAttributes(state),
});


export const mapDispatchToProps = (dispatch, { match: { params }, history }) => ({
  onWillMount: ({ attributeCode, contentTypeCode, mode }) => {
    dispatch(clearErrors());
    if (mode === MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE) {
      dispatch(fetchContentTypeAttribute(
        TYPE_COMPOSITE,
        () => (
          history.push(
            routeConverter(
              ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_MONOLIST_ADD,
              { entityCode: contentTypeCode, attributeCode },
            ),
          )
        ),
        '',
        'monoListAttribute',
      ));
    } else {
      dispatch(fetchAttributeFromContentType('monoListAttribute', contentTypeCode, attributeCode));
    }
  },
  onSubmit: (values) => {
    dispatch(sendPutAttributeFromContentTypeMonolist(values, params.entityCode, history));
  },
  onAddAttribute: ({ contentTypeCode, type }) => {
    dispatch(setActionMode(MODE_ADD_SUB_ATTRIBUTE_MONOLIST_COMPOSITE));
    dispatch(fetchContentTypeAttribute(
      type,
      () => (
        history.push(
          routeConverter(
            ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_ADD,
            { entityCode: contentTypeCode },
          ),
        )
      ),
      type,
      'addAttribute',
    ));
  },
  onClickDelete: (attributeCode) => {
    dispatch(removeAttributeFromComposite(attributeCode));
  },
  onMove: (fromIndex, toIndex) => {
    dispatch(moveAttributeFromComposite(fromIndex, toIndex));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MonolistAttributeForm));
