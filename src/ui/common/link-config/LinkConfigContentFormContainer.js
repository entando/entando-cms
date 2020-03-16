import { connect } from 'react-redux';
import { formValueSelector, submit } from 'redux-form';
import LinkConfigContentForm from 'ui/common/link-config/LinkConfigContentForm';

export const mapStateToProps = state => ({
  selectedContent: formValueSelector('LinkConfigContent')(state, 'content'),
});

export const mapDispatchToProps = (state, { onSubmit }) => ({
  handleClick: (content) => {
    submit('LinkConfigContent');
    onSubmit({ content });
  },
});

const LinkConfigContentFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(LinkConfigContentForm);

export default LinkConfigContentFormContainer;
