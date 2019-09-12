import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'patternfly-react';


class ContentTypeReferenceStatus extends Component {
  constructor(props) {
    super(props);
    this.onClickReload = this.onClickReload.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  onClickReload() {
    const { onReload, status } = this.props;
    onReload(status.contentTypesCodes);
  }

  render() {
    const { status } = this.props;
    if (status.type === 'success') { return null; }
    return (
      <Alert type={status.type} className="ContentTypeReferenceStatus">
        <FormattedMessage id="cms.contenttype.reference.text" values={{ count: status.count }} />
        <FormattedMessage
          id="cms.contenttype.reference.reload"
          values={{
            link: (
              <a role="presentation" onClick={this.onClickReload}>
                <FormattedMessage id="cms.label.here" />
              </a>
            ),
          }}
        />

      </Alert>
    );
  }
}

ContentTypeReferenceStatus.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  status: PropTypes.shape({
    status: PropTypes.string,
    type: PropTypes.string,
    dataTypesCodes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};


export default ContentTypeReferenceStatus;
