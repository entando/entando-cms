import { connect } from 'react-redux';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { sendPostContentModel } from 'state/content-model/actions';
import { getContentTypeList } from 'state/content-type/selectors';
import { ROUTE_CMS_CONTENTMODEL_LIST } from 'app-init/routes';

import AddContentModelForm from 'ui/content-model/AddContentModelForm';

const contentModelMsgs = defineMessages({
  saved: {
    id: 'cms.contentmodel.form.saved',
    defaultMessage: '{name} saved.',
  },
});

export const mapStateToProps = state => ({
  contentTypes: getContentTypeList(state),
});

export const mapDispatchToProps = (dispatch, { intl, history }) => ({
  onDidMount: () => dispatch(fetchContentTypeListPaged()),
  onSubmit: values => (
    dispatch(sendPostContentModel({
      ...values,
      contentType: values.contentType.code,
    })).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage(
            contentModelMsgs.saved,
            { modelname: values.descr },
          ),
          TOAST_SUCCESS,
        ));
        history.push(ROUTE_CMS_CONTENTMODEL_LIST);
      }
    })
  ),
});

const AddContentModelFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddContentModelForm);

export default withRouter(injectIntl(AddContentModelFormContainer));
