import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, defineMessages } from 'react-intl';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import {
  fetchContentTypeAttributes,
  sendPostContentType,
  setSelectedAttribute,
  setSelectedAttributeContentType,
} from 'state/content-type/actions';
import { getContentTypeAttributesIdList } from 'state/content-type/selectors';
import AddContentTypeForm from 'ui/content-type/AddContentTypeForm';
import { ROUTE_CMS_CONTENTTYPE_EDIT } from 'app-init/routes';

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
