import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendPublishContent } from 'state/contents/actions';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import PublishContentModal from 'ui/contents/PublishContentModal';

const publishContentMsgs = defineMessages({
  published: {
    id: 'cms.contents.published',
    defaultMessage: '{name} published.',
  },
  unpublished: {
    id: 'cms.contents.unpublished',
    defaultMessage: '{name} unpublished.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onConfirmPublish: (content, onLine) => {
    dispatch(sendPublishContent(content.id, onLine)).then((res) => {
      if (res) {
        dispatch(
          addToast(
            intl.formatMessage(onLine === 'published'
              ? publishContentMsgs.published
              : publishContentMsgs.unpublished,
            { modelname: content.description }),
            TOAST_SUCCESS,
          ),
        );
      }
    });
    dispatch(setVisibleModal(''));
  },
});

const PublishContentModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublishContentModal);

export default injectIntl(PublishContentModalContainer);
