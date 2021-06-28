import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';

const ContentLinkDetails = ({ linkDetails, linkLabel }) => {
  const renderButton = () => {
    switch (linkDetails.destType) {
      case 1:
        return (
          <Button href={linkDetails.urlDest} className="ContentDetails__link-button">
            <Icon name="globe" />
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderButton()} {linkLabel}
    </>
  );
};

ContentLinkDetails.propTypes = {
  linkDetails: PropTypes.shape({
    destType: PropTypes.number,
    urlDest: PropTypes.string,
  }).isRequired,
  linkLabel: PropTypes.string.isRequired,
};

export default ContentLinkDetails;
