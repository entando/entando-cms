import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { get } from 'lodash';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import { getContentTemplateList } from 'state/content-template/selectors';
import ContentConfigForm, { MultipleContentsConfigContainerId, ContentConfigFormBody } from 'ui/widget-forms/ContentConfigFormBody';
import { fetchContentTemplateListPaged } from 'state/content-template/actions';
import { fetchSearchPages, fetchPage } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPagesRaw } from 'state/pages/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { sendPutWidgetConfig } from 'state/page-config/actions';
import { ROUTE_APP_BUILDER_PAGE_CONFIG } from 'app-init/routes';
import {
  formValueSelector, submit, change,
} from 'redux-form';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { PAGE_STATUS_DRAFT } from 'state/pages/const';

export const mapStateToProps = (state, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', MultipleContentsConfigContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  return {
    contentTemplates: getContentTemplateList(state),
    initialValues: ownProps.widgetConfig || {},
    languages: getActiveLanguages(state),
    pages: getSearchPagesRaw(state),
    language: getLocale(state),
    widgetCode: ownProps.widgetCode,
    chosenContents: formValueSelector(formToUse)(state, putPrefixField('contents')),
    ownerGroup: formValueSelector(formToUse)(state, putPrefixField('ownerGroup')),
    joinGroups: formValueSelector(formToUse)(state, putPrefixField('joinGroups')),
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', MultipleContentsConfigContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  return {
    onDidMount: () => {
      dispatch(fetchContentTemplateListPaged({ page: 1, pageSize: 0 }));
      dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
      dispatch(fetchSearchPages({ page: 1, pageSize: 0 }));
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
      const contents = values.contents || [];
      const configContents = contents.map(cc => Object.assign(
        {},
        {
          contentId: cc.contentId,
          ...(cc.modelId != null && { modelId: cc.modelId }),
          contentDescription: cc.contentDescription,
        },
      ));
      const payload = { ...values, contents: configContents };
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
    onSave: () => { dispatch(setVisibleModal('')); dispatch(submit(MultipleContentsConfigContainerId)); },
    onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
    onDiscard: () => {
      dispatch(setVisibleModal(''));
      const { history, pageCode } = ownProps;
      history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
    },
  };
};

export const formBody = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentConfigFormBody));

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentConfigForm));
