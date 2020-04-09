import { connect } from 'react-redux';

import ContentAttributes from 'ui/edit-content/content-attributes/ContentAttributes';
import { getSelectedContentTypeAttributes } from 'state/content-type/selectors';
import { fetchContentType, setSelectedContentType } from 'state/content-type/actions';
import { fetchContentSettings } from 'state/content-settings/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getAttrInitialValue } from 'helpers/attrUtils';
import { getActiveLanguages, getLanguages } from 'state/languages/selectors';
import { initialize } from 'redux-form';

export const mapStateToProps = (state, { attributes: contentAttributes = [] }) => {
  const languages = (getLanguages(state) && getActiveLanguages(state)) || [];
  const langCodes = languages.map(({ code }) => code);

  return {
    attributes: (getSelectedContentTypeAttributes(state) || []).map((attr, i) => ({
      ...attr,
      ...(contentAttributes[i] || (getAttrInitialValue(attr, langCodes))),
    })),
    languages,
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
  reInitializeForm: (formName, data) => dispatch(initialize(formName, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentAttributes);
