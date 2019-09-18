import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const SectionTitle = ({ nameId }) => (
  <div className="SectionTitle no-padding">
    <FormattedMessage id={nameId} defaultMessage="Info" />
    <span className="SectionTitle__tip">
      <FormattedMessage id="cms.contents.edit.tip" defaultMessage="* Required Fields" />
    </span>
  </div>
);

SectionTitle.propTypes = {
  nameId: PropTypes.string.isRequired,
};

export default SectionTitle;
