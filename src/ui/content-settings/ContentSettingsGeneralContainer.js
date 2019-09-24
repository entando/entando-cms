import { connect } from 'react-redux';
import {
  getIndexesStatus,
  getReferencesStatus,
  getIndexesLastReload,
  getEditorSettings,
} from 'state/content-settings/selectors';
import { getLoading } from 'state/loading/selectors';
import {
  fetchContentSettings,
  sendPostReloadReferences,
  sendPostReloadIndexes,
  sendPutEditorSettings,
} from 'state/content-settings/actions';
import ContentSettingsGeneral from 'ui/content-settings/ContentSettingsGeneral';

export const mapStateToProps = (state) => {
  const loads = getLoading(state);
  return {
    indexesStatus: getIndexesStatus(state),
    referenceStatus: getReferencesStatus(state),
    editorSettings: getEditorSettings(state),
    indexesLastReload: getIndexesLastReload(state),
    isReloadingReferences: loads.reloadReferences,
    isReloadingIndexes: loads.reloadIndexes,
    isEditorChanging: loads.putEditorSettings,
    loading: loads.contentSettings,
  };
};

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchContentSettings()),
  onReloadReferences: () => dispatch(sendPostReloadReferences()),
  onReloadIndexes: () => dispatch(sendPostReloadIndexes()),
  onEditorChange: key => dispatch(sendPutEditorSettings({ key })),
});

const ContentSettingsGeneralContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentSettingsGeneral);

export default ContentSettingsGeneralContainer;
