import { connect } from 'react-redux';
import { change } from 'redux-form';

import AddContentModelForm from 'ui/content-model/AddContentModelForm';

export const mapDispatchToProps = dispatch => ({
  onChangeDefaultTitle: title => dispatch(change('contentmodelform', 'code', title.replace(/\W/g, '_').toLowerCase())),

});

const AddContentModelFormContainer = connect(null, mapDispatchToProps)(AddContentModelForm);
export default AddContentModelFormContainer;
