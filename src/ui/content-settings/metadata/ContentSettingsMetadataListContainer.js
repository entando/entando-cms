import { connect } from 'react-redux';
import {
  getMetadataMappingList,
  getMetadataMappingFormData,
} from 'state/content-settings/selectors';

import ContentSettingsMetadataList from 'ui/content-settings/metadata/ContentSettingsMetadataList';


export const mapStateToProps = state => ({
  metadatas: getMetadataMappingList(state),
  initialValues: {
    ...getMetadataMappingFormData(state),
  },
});

export const mapDispatchToProps = () => ({
  onSubmit: () => {},
});

const ContentSettingsMetadataListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentSettingsMetadataList);

export default ContentSettingsMetadataListContainer;
