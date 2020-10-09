import { connect } from 'react-redux';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { get } from 'lodash';
import { injectIntl } from 'react-intl';
import { routeConverter } from '@entando/utils';
import { getContentTemplateList } from 'state/content-template/selectors';
import SingleContentConfigForm, { SingleContentConfigFormBody, SingleContentConfigContainerId } from 'ui/widget-forms/publish-single-content-config/SingleContentConfigFormBody';
import { fetchContentTemplateListPaged } from 'state/content-template/actions';
import { sendPutWidgetConfig } from 'state/page-config/actions';
import { ROUTE_APP_BUILDER_PAGE_CONFIG, ROUTE_CMS_ADD_CONTENT } from 'app-init/routes';
import {
  formValueSelector, submit, change,
} from 'redux-form';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ContentsFilterModalID } from 'ui/widget-forms/contents-filter/ContentsFilterModal';
import { PAGE_STATUS_DRAFT } from 'state/pages/const';
import { fetchPage } from 'state/pages/actions';
import { getContentTypeList } from 'state/content-type/selectors';
import { setNewContentsType, setWorkMode } from 'state/edit-content/actions';
import { setCurrentStatusShow } from 'state/contents/actions';
import { WORK_MODE_ADD } from 'state/edit-content/types';

export const mapStateToProps = (state, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', SingleContentConfigContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  const formSelect = formValueSelector(formToUse);
  let widgetConfig = null;
  if (ownProps.widgetConfig !== null && ownProps.widgetConfig !== undefined) {
    const { contents, ...rest } = ownProps.widgetConfig;
    widgetConfig = rest;
  }
  return {
    contentTemplates: getContentTemplateList(state),
    initialValues: widgetConfig || {},
    chosenContent: widgetConfig,
    ownerGroup: formSelect(state, putPrefixField('ownerGroup')),
    joinGroups: formSelect(state, putPrefixField('joinGroups')),
    contentTypes: getContentTypeList(state),
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
        pageCode, frameId, intl, history, widgetCode,
      } = ownProps;
      const configItem = {
        config: {
          ...values,
          ...(values.modelId != null && { modelId: values.modelId }),
        },
        code: widgetCode,
      };
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
      dispatch(change(formToUse, putPrefixField('contentId'), selectContent.id));
      dispatch(change(formToUse, putPrefixField('contentDescription'), selectContent.description));
      dispatch(setVisibleModal(''));
    },
    onClickAddContent: (contentType) => {
      const {
        history, pageCode, widgetCode, frameId,
      } = ownProps;
      dispatch(setWorkMode(WORK_MODE_ADD));
      dispatch(setCurrentStatusShow('all'));
      dispatch(setNewContentsType(contentType));
      const newRoute = routeConverter(ROUTE_CMS_ADD_CONTENT, { contentType: contentType.typeCode });
      history.push(
        `${newRoute}?callbackWidget=${widgetCode}&callbackPage=${pageCode}&callbackFrame=${frameId}`,
      );
    },
  };
};

export const formBody = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(SingleContentConfigFormBody));

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(SingleContentConfigForm));
