import { connect } from 'react-redux';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { submit } from 'redux-form';
import { routeConverter } from '@entando/utils';

import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

import { fetchContentTypeListPaged } from 'state/content-type/actions';
import {
  fetchContentModelDictionary,
  sendPutContentModel,
  fetchContentModel,
  clearContentModel,
  clearContentModelDictionary,
} from 'state/content-model/actions';
import { getContentTypeList } from 'state/content-type/selectors';
import { getContentModelOpened, getContentModelDictionaryList } from 'state/content-model/selectors';
import { ROUTE_CMS_CONTENTMODEL_LIST } from 'app-init/routes';

import AddContentModelForm from 'ui/content-model/AddContentModelForm';

const contentModelMsgs = defineMessages({
  saved: {
    id: 'cms.contentmodel.form.saved',
    defaultMessage: '{name} saved.',
  },
});

export const mapStateToProps = (state) => {
  const contentTypes = getContentTypeList(state);
  const formvals = getContentModelOpened(state);
  return {
    contentTypes,
    mode: 'edit',
    dictionary: getContentModelDictionaryList(state),
    initialValues: {
      ...formvals,
      contentType: contentTypes.find(ctype => ctype.code === formvals.contentType),
    },
  };
};

export const mapDispatchToProps = (dispatch, { intl, history, match: { params } }) => ({
  onDidMount: () => {
    dispatch(fetchContentModelDictionary());
    dispatch(fetchContentTypeListPaged()).then(() => (
      dispatch(fetchContentModel(params.id))
    ));
  },
  onDidUnmount: () => {
    dispatch(clearContentModel());
    dispatch(clearContentModelDictionary());
  },
  onSubmit: values => dispatch(
    sendPutContentModel({
      ...values,
      contentType: values.contentType.code,
    }),
  ).then((res) => {
    if (res) {
      dispatch(
        addToast(
          intl.formatMessage(contentModelMsgs.saved, { modelname: values.descr }),
          TOAST_SUCCESS,
        ),
      );
      history.push(ROUTE_CMS_CONTENTMODEL_LIST);
    }
  }),
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('contentmodelform')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_CMS_CONTENTMODEL_LIST)); },
});

const EditContentModelFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AddContentModelForm);

export default withRouter(injectIntl(EditContentModelFormContainer));
