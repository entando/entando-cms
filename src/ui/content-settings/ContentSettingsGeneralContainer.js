import { connect } from 'react-redux';
import { getIndexesStatus, getReferencesStatus } from 'state/content-settings/selectors';
import { getLoading } from 'state/loading/selectors';
import { fetchContentSettings, sendPostReloadReferences } from 'state/content-settings/actions';
import ContentSettingsGeneral from 'ui/content-settings/ContentSettingsGeneral';

export const mapStateToProps = state => ({
  indexesStatus: getIndexesStatus(state),
  getReferenceStatus: getReferencesStatus(state),
  loading: getLoading(state).contentSettings,
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchContentSettings()),
  onReloadReferences: () => dispatch(sendPostReloadReferences()),
});

const ContentSettingsGeneralContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentSettingsGeneral);

export default ContentSettingsGeneralContainer;
