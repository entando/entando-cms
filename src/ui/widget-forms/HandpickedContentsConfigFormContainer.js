import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import { getContentModelList } from 'state/content-model/selectors';
import HandpickedContentsConfigForm from 'ui/widget-forms/HandpickedContentsConfigForm';
import { fetchContentModelListPaged } from 'state/content-model/actions';
import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPagesRaw } from 'state/pages/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { sendPutWidgetConfig } from 'state/page-config/actions';
import { ROUTE_APP_BUILDER_PAGE_CONFIG } from 'app-init/routes';
import { formValueSelector } from 'redux-form';

const MULTIPLE_CONTENTS_WIDGET = 'row_content_viewer_list';

export const mapStateToProps = (state, ownProps) => {
  const multipleContentsMode = ownProps.widgetCode === MULTIPLE_CONTENTS_WIDGET;
  let propWidgetConfig = ownProps.widgetConfig;
  let widgetConfig = null;
  if (multipleContentsMode) {
    widgetConfig = propWidgetConfig;
  } else {
    if (propWidgetConfig !== null && propWidgetConfig !== undefined) {
      const { contents, ...rest } = propWidgetConfig;
      propWidgetConfig = rest;
    }
    widgetConfig = propWidgetConfig !== null && propWidgetConfig !== undefined
      ? {
        contents: [propWidgetConfig],
        maxElemForItem: propWidgetConfig.maxElemForItem,
      } : null;
  }
  return ({
    contentModels: getContentModelList(state),
    initialValues: widgetConfig,
    languages: getActiveLanguages(state),
    pages: getSearchPagesRaw(state),
    language: getLocale(state),
    widgetCode: ownProps.widgetCode,
    chosenContents: formValueSelector('widgets.singleContentConfig')(state, 'contents'),
  });
};

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: () => {
    dispatch(fetchContentModelListPaged({ page: 1, pageSize: 0 }));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchSearchPages({ page: 1, pageSize: 0 }));
  },
  onSubmit: (values) => {
    dispatch(clearErrors());
    const {
      pageCode, frameId, intl, history,
    } = ownProps;
    const contents = values.contents || [];
    const multipleContentsMode = ownProps.widgetCode === MULTIPLE_CONTENTS_WIDGET;
    const configContents = contents.map(cc => Object.assign(
      {},
      {
        contentId: cc.contentId,
        ...(cc.modelId != null && { modelId: cc.modelId }),
        contentDescription: cc.contentDescription,
      },
    ));
    const payload = multipleContentsMode
      ? { ...values, contents: configContents }
      : { ...values, ...configContents[0], contents: undefined };
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
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(HandpickedContentsConfigForm));
