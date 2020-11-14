import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { get } from 'lodash';
import { clearErrors } from '@entando/messages';
import { getContentTemplateList } from 'state/content-template/selectors';
import ContentConfigForm, { MultipleContentsConfigContainerId, ContentConfigFormBody } from 'ui/widget-forms/ContentConfigFormBody';
import { fetchContentTemplateListPaged } from 'state/content-template/actions';
import { fetchSearchPages, fetchPage } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPagesRaw } from 'state/pages/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import {
  formValueSelector, change,
} from 'redux-form';
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
  };
};

const beforeSubmit = (dispatch, values) => new Promise((resolve) => {
  dispatch(clearErrors());
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
  resolve(payload);
});

export const formBody = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentConfigFormBody));

formBody.reduxFormId = MultipleContentsConfigContainerId;
formBody.beforeSubmit = beforeSubmit;

const MultipleContentsConfigContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentConfigForm));

MultipleContentsConfigContainer.reduxFormId = MultipleContentsConfigContainerId;
MultipleContentsConfigContainer.beforeSubmit = beforeSubmit;

export default MultipleContentsConfigContainer;
