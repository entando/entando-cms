import React from "react";
import { connect } from "react-redux";
import { formValueSelector, submit } from "redux-form";
import LinkConfigUrlForm from "ui/common/link-config/LinkConfigUrlForm";
import { omit } from "lodash";

const selector = formValueSelector('LinkConfigUrl')

export const mapStateToProps = (state, { parameters }) => ({
  initialValues: {
    url: parameters.dest,
    attributes: { ...omit(parameters, "dest") },
  },
  url: selector(state, 'url'),
  attributes: selector(state, 'attributes')
});

export const mapDispatchToProps = (state, { onSubmit, onCancel }) => ({
  handleSubmit: (data) => {
    console.log('mapDispatchToProps - handleSubmit - data', data)
    submit("LinkConfigUrl");
    onSubmit( data );
  },
  onCancel,
});

const LinkConfigUrlFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  })(LinkConfigUrlForm);

export default LinkConfigUrlFormContainer;