import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const SectionTitle = ({
  nameId, onClick, collapsable, isOpened,
}) => (
  <div
    className="SectionTitle no-padding"
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex={0}
  >
    <FormattedMessage id={nameId} defaultMessage="Info" />
    {
      collapsable
      && <span className={`icon fa fa-chevron-${isOpened ? 'down' : 'right'} FormSectionTitle__collapse-button`} />
    }
    <span className="SectionTitle__tip">
      <FormattedMessage id="cms.contents.edit.tip" defaultMessage="* Required Fields" />
    </span>
  </div>
);

SectionTitle.propTypes = {
  nameId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  collapsable: PropTypes.bool,
  isOpened: PropTypes.bool,
};

SectionTitle.defaultProps = {
  onClick: () => {},
  collapsable: false,
  isOpened: false,
};

export default SectionTitle;
