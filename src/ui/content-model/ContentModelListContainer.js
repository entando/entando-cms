import { connect } from 'react-redux';
import { getContentModelList } from 'state/content-model/selectors';
import { fetchContentModelListPaged, sendDeleteContentModel } from 'state/content-model/actions';
import { getLoading } from 'state/loading/selectors';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import ContentModelList from 'ui/content-model/ContentModelList';

const contentModelMsgs = defineMessages({
  removed: {
    id: 'cms.contentmodel.list.infoDeleted',
    defaultMessage: '{name} deleted.',
  },
});

export const mapStateToProps = state => ({
  contentModels: getContentModelList(state),
  loading: getLoading(state).contentModelList,
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onDidMount: () => dispatch(fetchContentModelListPaged()),
  onConfirmDelete: contModel => (
    dispatch(sendDeleteContentModel(contModel.id)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage(
            contentModelMsgs.removed,
            { modelname: contModel.descr },
          ),
          TOAST_SUCCESS,
        ));
        dispatch(fetchContentModelListPaged());
      }
    })
  ),
});

const ContentModelListContainer = connect(mapStateToProps, mapDispatchToProps)(ContentModelList);

export default injectIntl(ContentModelListContainer);
