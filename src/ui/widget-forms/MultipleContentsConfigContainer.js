import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import { getContentTemplateList } from 'state/content-template/selectors';
import ContentConfigFormBody from 'ui/widget-forms/ContentConfigFormBody';
import { fetchContentTemplateListPaged } from 'state/content-template/actions';
import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPagesRaw } from 'state/pages/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { sendPutWidgetConfig } from 'state/page-config/actions';
import { ROUTE_APP_BUILDER_PAGE_CONFIG } from 'app-init/routes';
import { formValueSelector, reduxForm, submit } from 'redux-form';
import { MULTIPLE_CONTENTS_CONFIG } from 'ui/widget-forms/const';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

const MultipleContentsConfigContainerId = `widgets.${MULTIPLE_CONTENTS_CONFIG}`;

export const mapStateToProps = (state, ownProps) => ({
  contentTemplates: getContentTemplateList(state),
  initialValues: ownProps.widgetConfig,
  languages: getActiveLanguages(state),
  pages: getSearchPagesRaw(state),
  language: getLocale(state),
  widgetCode: ownProps.widgetCode,
  chosenContents: formValueSelector(MultipleContentsConfigContainerId)(state, 'contents'),
});

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
    const payload = { ...values, contents: configContents };
    const configItem = Object.assign({ config: payload }, { code: ownProps.widgetCode });
    dispatch(clearErrors());
    dispatch(sendPutWidgetConfig(pageCode, frameId, configItem)).then(() => {
      dispatch(addToast(
        intl.formatMessage({ id: 'widget.update.success' }),
        TOAST_SUCCESS,
      ));
      history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
    });
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit(MultipleContentsConfigContainerId)); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => {
    dispatch(setVisibleModal(''));
    const { history, pageCode } = ownProps;
    history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(reduxForm({
  form: MultipleContentsConfigContainerId,
})(ContentConfigFormBody)));
