import { connect } from 'react-redux';

import ContentAttributes from 'ui/edit-content/content-attributes/ContentAttributes';
import { getSelectedContentTypeAttributes } from 'state/content-type/selectors';
import { fetchContentType } from 'state/content-type/actions';
import { fetchContentSettings } from 'state/content-settings/actions';
import { getAttrInitialValue } from 'helpers/attrUtils';

export const mapStateToProps = (state, { attributes: contentAttributes = [] }) => ({
  attributes: (getSelectedContentTypeAttributes(state) || []).map((attr, i) => ({
    ...attr,
    ...(contentAttributes[i] || (getAttrInitialValue(attr))),
  })),
});

export const mapDispatchToProps = (dispatch, { typeCode }) => ({
  onDidMount: () => {
    dispatch(fetchContentType(typeCode));
    dispatch(fetchContentSettings());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentAttributes);
