import { connect } from 'react-redux';

import ContentAttributes from 'ui/edit-content/content-attributes/ContentAttributes';
import { getSelectedContentTypeAttributes } from 'state/content-type/selectors';
import { fetchContentType } from 'state/content-type/actions';
import { fetchContentSettings } from 'state/content-settings/actions';

// FIXME: Remove default attributes value when fetchContent() is fixed
export const mapStateToProps = (state, { attributes = [] }) => ({
  attributes: (getSelectedContentTypeAttributes(state) || []).map((attr, i) => ({
    ...attr,
    ...(attributes[i] || {}),
  })),
});

// FIXME: Remove default typeCode value when fetchContent() is fixed
export const mapDispatchToProps = (dispatch, { typeCode = 'TES' }) => ({
  onDidMount: () => {
    // FIXME: use fetchContentTypeAttributes() when API endpoint is implemented
    dispatch(fetchContentType(typeCode));
    dispatch(fetchContentSettings());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentAttributes);
