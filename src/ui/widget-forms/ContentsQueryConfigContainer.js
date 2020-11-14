import { connect } from 'react-redux';
import { clearErrors } from '@entando/messages';
import { get } from 'lodash';
import { injectIntl } from 'react-intl';
import { change, formValueSelector } from 'redux-form';

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

const nopage = { page: 1, pageSize: 0 };

export const mapStateToProps = (state, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', ContentsQueryContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
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
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', ContentsQueryContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  return {
    onDidMount: () => {
      dispatch(fetchLanguages(nopage));
      dispatch(fetchContentTypeListPaged(nopage));
      dispatch(fetchCategoryTree());
      dispatch(fetchSearchPages(nopage));
    },
    putPrefixField,
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
  };
};

const beforeSubmit = (dispatch, values) => new Promise((resolve) => {
  const checkedValues = Object.assign({}, values);
  if (values.modelId === '') delete checkedValues.modelId;
  checkedValues.filters = checkedValues.filters && checkedValues.filters.filter(f => f != null);
  checkedValues.userFilters = checkedValues.userFilters
      && checkedValues.userFilters.filter(f => f != null);
  dispatch(clearErrors());
  resolve(checkedValues);
});

export const formBody = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentsQueryFormBody));

formBody.reduxFormId = ContentsQueryContainerId;
formBody.beforeSubmit = beforeSubmit;

const ContentsQueryContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentsQueryConfig));

ContentsQueryContainer.reduxFormId = ContentsQueryContainerId;
ContentsQueryContainer.beforeSubmit = beforeSubmit;

export default ContentsQueryContainer;
