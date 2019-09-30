import { connect } from 'react-redux';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';
import { getLoading } from 'state/loading/selectors';
import { sendPostMetadataMap } from 'state/content-settings/actions';

import ContentSettingsMetadata from 'ui/content-settings/metadata/AddContentSettingsMetadata';

const metadataMsgs = defineMessages({
  saved: {
    id: 'cms.contentsettings.form.saved',
    defaultMessage: '{name} saved.',
  },
});

export const mapStateToProps = state => ({
  loading: getLoading(state).contentSettings,
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onSubmit: (values) => {
    console.log(values);
    const { key, mapping } = values;
    dispatch(sendPostMetadataMap(key, mapping)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage(
            metadataMsgs.saved,
            { name: key },
          ),
          TOAST_SUCCESS,
        ));
      }
    });
  },
});

const ContentSettingsMetadataContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentSettingsMetadata);

export default injectIntl(ContentSettingsMetadataContainer);
