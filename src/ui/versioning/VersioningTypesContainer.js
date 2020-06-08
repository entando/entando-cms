import { connect } from 'react-redux';

import VersioningTypes from 'ui/versioning/VersioningTypes';

export const mapStateToProps = () => ({
});

export const mapDispatchToProps = () => ({
});

const VersioningTypesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VersioningTypes);

export default VersioningTypesContainer;
