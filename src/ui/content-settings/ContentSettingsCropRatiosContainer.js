import { connect } from 'react-redux';

import ContentSettingsCropRatios from 'ui/content-settings/ContentSettingsCropRatios';

const mapStateToProps = ({ contentSettings: { cropRatios } }) => ({
  cropRatios,
});

const mapDispatchToProps = dispatch => ({
  onAdd: (cropRatio) => {
    dispatch(addCropRatio(cropRatio));
  },
  onDelete: (cropRatio) => {
    dispatch(deleteCropRatio(cropRatio));
  },
  onSave: (cropRatios) => {
    dispatch(saveCropRatios(cropRatios));
  },
});

const ContentSettingsCropRatiosContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentSettingsCropRatios);

export default ContentSettingsCropRatiosContainer;
