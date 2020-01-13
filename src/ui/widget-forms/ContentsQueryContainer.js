import { connect } from 'react-redux';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { injectIntl } from 'react-intl';
import { change, formValueSelector } from 'redux-form';
import { routeConverter } from '@entando/utils';
import { ROUTE_APP_BUILDER_PAGE_CONFIG } from 'app-init/routes';

import { sendPutWidgetConfig } from 'state/page-config/actions';
import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { fetchContentModelsByContentType } from 'state/content-model/actions';

import { getContentTypeList } from 'state/content-type/selectors';
import { getCategoryTree } from 'state/categories/selectors';
import ContentsQueryForm from 'ui/widget-forms/ContentsQueryForm';
import { getContentModelList } from 'state/content-model/selectors';
import { getLocale } from 'state/locale/selectors';
import { getSearchPagesRaw } from 'state/pages/selectors';
import { getActiveLanguages } from 'state/languages/selectors';

const nopage = { page: 1, pageSize: 0 };

export const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.widgetConfig,
  language: getLocale(state),
  languages: getActiveLanguages(state),
  contentTypes: getContentTypeList(state),
  pages: getSearchPagesRaw(state),
  categories: getCategoryTree(state),
  contentModels: getContentModelList(state),
  selectedContentType: formValueSelector('widgets.contentsQuery')(state, 'contentType'),
  selectedCategories: formValueSelector('widgets.contentsQuery')(state, 'categories'),
  selectedInclusiveOr: formValueSelector('widgets.contentsQuery')(state, 'orClauseCategoryFilter'),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: () => {
    dispatch(fetchLanguages(nopage));
    dispatch(fetchContentTypeListPaged(nopage));
    dispatch(fetchCategoryTree());
    dispatch(fetchSearchPages(nopage));
  },
  onSubmit: (values) => {
    const {
      pageCode, frameId, widgetCode, history, intl,
    } = ownProps;
    const checkedValues = Object.assign({}, values);
    if (values.modelId === '') delete checkedValues.modelId;
    checkedValues.filters = checkedValues.filters && checkedValues.filters.filter(f => f != null);
    checkedValues.userFilters = checkedValues.userFilters
    && checkedValues.userFilters.filter(f => f != null);
    const configItem = Object.assign({ config: checkedValues }, { code: widgetCode });
    dispatch(clearErrors());
    dispatch(sendPutWidgetConfig(pageCode, frameId, configItem)).then(() => {
      dispatch(addToast(
        intl.formatMessage({ id: 'widget.update.success' }),
        TOAST_SUCCESS,
      ));
      history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
    });
  },
  onResetFilterOption: (name, i) => dispatch(change('widgets.contentsQuery', `${name}.[${i}].option`, '')),
  onChangeContentType: (contentType) => {
    if (contentType) dispatch(fetchContentModelsByContentType(contentType));
  },
  onResetModelId: () => dispatch(change('widgets.contentsQuery', 'modelId', '')),
  onToggleInclusiveOr: value => dispatch(change('widgets.contentsQuery', 'orClauseCategoryFilter', value === 'true' ? '' : 'true')),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentsQueryForm));
