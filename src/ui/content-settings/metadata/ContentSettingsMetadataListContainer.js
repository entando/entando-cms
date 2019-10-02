import { connect } from 'react-redux';
import {
  getMetadataMappingList,
  getMetadataMappingFormData,
} from 'state/content-settings/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/content-settings/metadata/DeleteContentMetadataModal';

import ContentSettingsMetadataList from 'ui/content-settings/metadata/ContentSettingsMetadataList';


export const mapStateToProps = state => ({
  metadatas: getMetadataMappingList(state),
  initialValues: {
    ...getMetadataMappingFormData(state),
  },
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: () => {},
  onPromptDelete: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo(item));
  },
});

const ContentSettingsMetadataListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentSettingsMetadataList);

export default ContentSettingsMetadataListContainer;
