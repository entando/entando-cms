import { connect } from 'react-redux';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { submit } from 'redux-form';
import { routeConverter } from '@entando/utils';

import { getContentModelDictionaryList } from 'state/content-model/selectors';
import {
  fetchContentModelDictionary,
  sendPostContentModel,
  clearContentModel,
  clearContentModelDictionary,
} from 'state/content-model/actions';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { getContentTypeList } from 'state/content-type/selectors';
import { ROUTE_CMS_CONTENTMODEL_LIST } from 'app-init/routes';

import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

import AddContentModelForm from 'ui/content-model/AddContentModelForm';

const contentModelMsgs = defineMessages({
  saved: {
    id: 'cms.contentmodel.form.saved',
    defaultMessage: '{name} saved.',
  },
});

export const mapStateToProps = state => ({
  dictionary: getContentModelDictionaryList(state),
  contentTypes: getContentTypeList(state),
});

export const mapDispatchToProps = (dispatch, { intl, history }) => ({
  onDidMount: () => {
    dispatch(fetchContentModelDictionary());
    dispatch(fetchContentTypeListPaged({ pageSize: 0 }));
  },
  onDidUnmount: () => {
    dispatch(clearContentModel());
    dispatch(clearContentModelDictionary());
  },
  onSubmit: values => (
    dispatch(sendPostContentModel({
      ...values,
      contentType: values.contentType.code,
    })).then((res) => {
      if (res) {
        dispatch(
          addToast(
            intl.formatMessage(contentModelMsgs.saved, { modelname: values.descr }),
            TOAST_SUCCESS,
          ),
        );
        history.push(ROUTE_CMS_CONTENTMODEL_LIST);
      }
    })),
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('contentmodelform')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_CMS_CONTENTMODEL_LIST)); },
});

const AddContentModelFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AddContentModelForm);

export default withRouter(injectIntl(AddContentModelFormContainer));
