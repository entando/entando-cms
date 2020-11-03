import { connect } from 'react-redux';

import { duplicateEngFieldValues } from 'state/edit-content/actions';
import ContentAttributes from 'ui/edit-content/content-attributes/ContentAttributes';
import { getSelectedContentTypeAttributes } from 'state/content-type/selectors';
import { fetchContentType, setSelectedContentType } from 'state/content-type/actions';
import { fetchContentSettings } from 'state/content-settings/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getAttrInitialValue } from 'helpers/attrUtils';
import { getActiveLanguages, getLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { initialize } from 'redux-form';
import { getLocale } from 'state/locale/selectors';

export const mapStateToProps = (state, { attributes: contentAttributes = [] }) => {
  const languages = (getLanguages(state) && getActiveLanguages(state)) || [];
  const langCodes = languages.map(({ code }) => code);

  return {
    attributes: (getSelectedContentTypeAttributes(state) || []).map((attr, i) => ({
      ...attr,
      ...(contentAttributes[i] || (getAttrInitialValue(attr, langCodes))),
    })),
    defaultLang: getDefaultLanguage(state),
    languages,
    locale: getLocale(state),
  };
};

export const mapDispatchToProps = (dispatch, { typeCode }) => ({
  onDidMount: () => {
    dispatch(fetchContentType(typeCode));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchContentSettings());
  },
  onWillUnmount: () => {
    // Clear selected content type to avoid using previous one when the component remounts.
    dispatch(setSelectedContentType({}));
  },
  onDuplicateContent: () => {
    dispatch(duplicateEngFieldValues());
  },
  reInitializeForm: (formName, data) => dispatch(initialize(formName, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentAttributes);
