import { connect } from 'react-redux';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';

import AddContentModelForm from 'ui/content-model/AddContentModelForm';

const contentModelMsgs = defineMessages({
  saved: {
    id: 'cms.contentmodel.form.saved',
    defaultMessage: '{name} saved.',
  },
});

export const mapStateToProps = () => ({
  contentTypes: [
    {
      id: 10013,
      contentType: 'Generic Content',
    },
    {
      id: 10002,
      contentType: 'News',
    },
  ],
});

export const mapDispatchToProps = (dispatch, { intl, history }) => ({
  onSubmit: (values) => {
    dispatch(addToast(
      intl.formatMessage(
        contentModelMsgs.saved,
        { modelname: values.name },
      ),
      TOAST_SUCCESS,
    ));
    history.push('/cms/content-models');
  },
});

const AddContentModelFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddContentModelForm);

export default withRouter(injectIntl(AddContentModelFormContainer));
