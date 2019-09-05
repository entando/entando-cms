import { connect } from 'react-redux';
import { fetchContentTypeAttributes } from 'state/content-type/actions';
import { getContentTypeAttributesIdList } from 'state/content-type/selectors';
import AddContentTypeForm from 'ui/content-type/AddContentTypeForm';

export const mapStateToProps = state => ({
  attributesType: getContentTypeAttributesIdList(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchContentTypeAttributes());
  },
});

const AddContentTypeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddContentTypeForm);

export default AddContentTypeFormContainer;
