import { connect } from 'react-redux';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { get } from 'lodash';
import { injectIntl } from 'react-intl';
import { routeConverter } from '@entando/utils';
import { getContentTemplateList } from 'state/content-template/selectors';
import SingleContentConfigForm, { SingleContentConfigFormBody, SingleContentConfigContainerId } from 'ui/widget-forms/publish-single-content-config/SingleContentConfigFormBody';
import { fetchContentTemplateListPaged } from 'state/content-template/actions';
import { sendPutWidgetConfig } from 'state/page-config/actions';
import { ROUTE_APP_BUILDER_PAGE_CONFIG } from 'app-init/routes';
import {
  formValueSelector, submit, change,
} from 'redux-form';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ContentsFilterModalID } from 'ui/widget-forms/contents-filter/ContentsFilterModal';
import { PAGE_STATUS_DRAFT } from 'state/pages/const';
import { fetchPage } from 'state/pages/actions';

export const mapStateToProps = (state, ownProps) => {
  let propWidgetConfig = ownProps.widgetConfig;
  let widgetConfig = null;
  if (propWidgetConfig !== null && propWidgetConfig !== undefined) {
    const { contents, ...rest } = propWidgetConfig;
    propWidgetConfig = rest;
  }
  widgetConfig = propWidgetConfig !== null && propWidgetConfig !== undefined
    ? {
      chosenContent: propWidgetConfig.contentId ? propWidgetConfig : null,
    } : null;
  const formToUse = get(ownProps, 'extFormName', SingleContentConfigContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  return {
    contentTemplates: getContentTemplateList(state),
    initialValues: widgetConfig || {},
    chosenContent: formValueSelector(formToUse)(state, putPrefixField('chosenContent')) || {},
    ownerGroup: formValueSelector(formToUse)(state, putPrefixField('ownerGroup')),
    joinGroups: formValueSelector(formToUse)(state, putPrefixField('joinGroups')),
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', SingleContentConfigContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  return {
    onDidMount: () => {
      dispatch(fetchContentTemplateListPaged({ page: 1, pageSize: 0 }));
      dispatch(fetchPage(ownProps.pageCode, PAGE_STATUS_DRAFT)).then((res) => {
        const { ownerGroup, joinGroups } = res.payload || {};
        dispatch(change(formToUse, putPrefixField('ownerGroup'), ownerGroup));
        dispatch(change(formToUse, putPrefixField('joinGroups'), joinGroups));
      });
    },
    putPrefixField,
    onSubmit: (values) => {
      dispatch(clearErrors());
      const {
        pageCode, frameId, intl, history,
      } = ownProps;
      const content = values.chosenContent || {};
      const payload = {
        contentId: content.id || content.contentId,
        ...(content.modelId != null && { modelId: content.modelId }),
        contentDescription: content.description || content.contentDescription,
      };
      const configItem = Object.assign({ config: payload }, { code: ownProps.widgetCode });
      dispatch(clearErrors());
      return dispatch(sendPutWidgetConfig(pageCode, frameId, configItem)).then((res) => {
        if (res) {
          dispatch(addToast(
            intl.formatMessage({ id: 'widget.update.success' }),
            TOAST_SUCCESS,
          ));
          history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
        }
      });
    },
    onSave: () => { dispatch(setVisibleModal('')); dispatch(submit(SingleContentConfigContainerId)); },
    onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
    onDiscard: () => {
      dispatch(setVisibleModal(''));
      const { history, pageCode } = ownProps;
      history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
    },
    showFilterModal: () => dispatch(setVisibleModal(ContentsFilterModalID)),
    onSelectContent: (selectContent) => {
      dispatch(change(formToUse, putPrefixField('chosenContent'), selectContent));
      dispatch(setVisibleModal(''));
    },
  };
};

export const formBody = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(SingleContentConfigFormBody));

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(SingleContentConfigForm));
