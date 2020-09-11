import { connect } from 'react-redux';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { get } from 'lodash';
import { injectIntl } from 'react-intl';
import { change, formValueSelector, submit } from 'redux-form';
import { routeConverter } from '@entando/utils';
import { ROUTE_APP_BUILDER_PAGE_CONFIG } from 'app-init/routes';

import { sendPutWidgetConfig } from 'state/page-config/actions';
import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { fetchContentTypeListPaged, fetchContentType } from 'state/content-type/actions';
import { fetchContentTemplatesByContentType } from 'state/content-template/actions';

import { getContentTypeList, getSelectedContentType } from 'state/content-type/selectors';
import { getCategoryTree } from 'state/categories/selectors';
import ContentsQueryConfig, { ContentsQueryContainerId, ContentsQueryFormBody } from 'ui/widget-forms/ContentsQueryConfig';
import { getContentTemplateList } from 'state/content-template/selectors';
import { getLocale } from 'state/locale/selectors';
import { getSearchPagesRaw } from 'state/pages/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

const nopage = { page: 1, pageSize: 0 };

export const mapStateToProps = (state, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', ContentsQueryContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => parentField !== '' ? `${parentField}.${field}` : field; 
  return {
    initialValues: ownProps.widgetConfig,
    language: getLocale(state),
    languages: getActiveLanguages(state),
    contentTypes: getContentTypeList(state),
    contentType: getSelectedContentType(state),
    pages: getSearchPagesRaw(state),
    categories: getCategoryTree(state),
    contentTemplates: getContentTemplateList(state),
    selectedContentType: formValueSelector(formToUse)(state, putPrefixField('contentType')),
    selectedCategories: formValueSelector(formToUse)(state, putPrefixField('categories')),
    selectedInclusiveOr: formValueSelector(formToUse)(state, putPrefixField('orClauseCategoryFilter')),
  }
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', ContentsQueryContainerId);
  const parentField = get(ownProps, 'input.name', '');
  console.log('parentField', parentField);
  const putPrefixField = (field) => {
    console.log(parentField, `${parentField}.${field}`, formToUse);
    return parentField !== '' ? `${parentField}.${field}` : field;
  };
  return {
    onDidMount: () => {
      dispatch(fetchLanguages(nopage));
      dispatch(fetchContentTypeListPaged(nopage));
      dispatch(fetchCategoryTree());
      dispatch(fetchSearchPages(nopage));
    },
    putPrefixField,
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
    onResetFilterOption: (name, i) => (
      dispatch(change(formToUse, `${name}.[${i}].option`, ''))
    ),
    onChangeFilterAttribute: (name, i, value) => (
      dispatch(change(formToUse, `${name}.[${i}].attributeFilter`, value))
    ),
    onChangeFilterValue: (name, i, value) => (
      dispatch(change(formToUse, `${name}.[${i}]`, value))
    ),

    onChangeContentType: (contentType) => {
      if (contentType) {
        dispatch(fetchContentTemplatesByContentType(contentType));
        dispatch(fetchContentType(contentType));
      }
    },
    onResetModelId: () => dispatch(change(formToUse, putPrefixField('modelId'), '')),
    onToggleInclusiveOr: value => dispatch(change(formToUse, putPrefixField('orClauseCategoryFilter'), value === 'true' ? '' : 'true')),
    onSave: () => { dispatch(setVisibleModal('')); dispatch(submit(ContentsQueryContainerId)); },
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
})(injectIntl(ContentsQueryFormBody));

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentsQueryConfig));
