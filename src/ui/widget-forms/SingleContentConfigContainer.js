import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import { getContentTemplateList } from 'state/content-template/selectors';
import SingleContentConfigFormBody from 'ui/widget-forms/SingleContentConfigFormBody';
import { fetchContentTemplateListPaged } from 'state/content-template/actions';
import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getLocale } from 'state/locale/selectors';
import { sendPutWidgetConfig } from 'state/page-config/actions';
import { ROUTE_APP_BUILDER_PAGE_CONFIG } from 'app-init/routes';
import { formValueSelector, reduxForm, submit } from 'redux-form';
import { SINGLE_CONTENT_CONFIG } from 'ui/widget-forms/const';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ContentsFilterModalID } from './contents-filter/ContentsFilterModal';

const SingleContentConfigContainerId = `widgets.${SINGLE_CONTENT_CONFIG}`;

export const mapStateToProps = (state, ownProps) => {
  let propWidgetConfig = ownProps.widgetConfig;
  let widgetConfig = null;
  if (propWidgetConfig !== null && propWidgetConfig !== undefined) {
    const { contents, ...rest } = propWidgetConfig;
    propWidgetConfig = rest;
  }
  widgetConfig = propWidgetConfig !== null && propWidgetConfig !== undefined
    ? {
      contents: propWidgetConfig.contentId ? [propWidgetConfig] : [],
      maxElemForItem: propWidgetConfig.maxElemForItem,
    } : null;
  return ({
    contentTemplates: getContentTemplateList(state),
    initialValues: widgetConfig,
    language: getLocale(state),
    widgetCode: ownProps.widgetCode,
    chosenContents: formValueSelector(SingleContentConfigContainerId)(state, 'contents'),
  });
};

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: () => {
    dispatch(fetchContentTemplateListPaged({ page: 1, pageSize: 0 }));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchSearchPages({ page: 1, pageSize: 0 }));
  },
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
    const payload = { ...values, ...configContents[0], contents: undefined };
    const configItem = Object.assign({ config: payload }, { code: ownProps.widgetCode });
    dispatch(clearErrors());
    dispatch(sendPutWidgetConfig(pageCode, frameId, configItem)).then((res) => {
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
  onSelectContent: () => dispatch(console.log('onSelectContent')),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(reduxForm({
  form: SingleContentConfigContainerId,
})(SingleContentConfigFormBody)));
