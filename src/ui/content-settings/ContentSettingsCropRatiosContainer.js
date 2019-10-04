import { connect } from 'react-redux';

import {
  getCropRatios,
} from 'state/content-settings/selectors';
import {
  addCropRatio,
  removeCropRatio,
} from 'state/content-settings/actions';
import ContentSettingsCropRatios from 'ui/content-settings/ContentSettingsCropRatios';

const mapStateToProps = state => ({
  cropRatios: getCropRatios(state),
});

const mapDispatchToProps = dispatch => ({
  onAdd: (cropRatio) => {
    dispatch(addCropRatio(cropRatio));
  },
  onDelete: (cropRatio) => {
    dispatch(removeCropRatio(cropRatio));
  },
});

const ContentSettingsCropRatiosContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentSettingsCropRatios);

export default ContentSettingsCropRatiosContainer;
