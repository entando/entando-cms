import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, defineMessages } from 'react-intl';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { submit } from 'redux-form';
import { routeConverter } from '@entando/utils';
import {
  fetchContentTypeAttributes,
  sendPostContentType,
  setSelectedAttribute,
  setSelectedAttributeContentType,
} from 'state/content-type/actions';
import { getContentTypeAttributesIdList } from 'state/content-type/selectors';
import AddContentTypeForm from 'ui/content-type/AddContentTypeForm';
import { ROUTE_CMS_CONTENTTYPE_EDIT, ROUTE_CMS_CONTENTTYPE_LIST } from 'app-init/routes';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

export const mapStateToProps = state => ({
  attributesType: getContentTypeAttributesIdList(state),
});

const msgs = defineMessages({
  contTypeCreated: {
    id: 'cms.contenttype.alert.created',
    defaultMessage: 'Created.',
  },
});

export const mapDispatchToProps = (dispatch, { history, intl }) => ({
  onDidMount: () => {
    dispatch(setSelectedAttribute({}));
    dispatch(setSelectedAttributeContentType());
    dispatch(fetchContentTypeAttributes());
  },
  onSubmit: (values) => {
    dispatch(sendPostContentType(values)).then((res) => {
      if (res && res.code) {
        dispatch(addToast(intl.formatMessage(msgs.contTypeCreated), TOAST_SUCCESS));
        history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_EDIT, { code: res.code }));
      }
    });
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('ContentType')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_CMS_CONTENTTYPE_LIST)); },
});

const AddContentTypeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AddContentTypeForm);

export default withRouter(injectIntl(AddContentTypeFormContainer));
