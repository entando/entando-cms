import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import { ROUTE_PAGE_DETAIL, ROUTE_CMS_OPEN_CONTENT_PUBLISHED } from 'app-init/routes';
import { hasURLProtocol } from 'helpers/urlUtils';

const ContentLinkDetails = ({ linkDetails, linkLabel }) => {
  const renderURLString = url => (hasURLProtocol(url) ? url : `//${url}`);
  const renderButton = () => {
    if (!linkDetails) {
      return null;
    }
    switch (linkDetails.destType) {
      case 1:
        return (
          <Button href={renderURLString(linkDetails.urlDest)} className="ContentDetails__link-button">
            <Icon name="globe" />
          </Button>
        );
      case 2:
        return (
          <Link to={routeConverter(ROUTE_PAGE_DETAIL, { pageCode: linkDetails.pageDest })}>
            <Button className="ContentDetails__link-button">
              <Icon name="folder" />
            </Button>
          </Link>
        );
      case 3:
        return (
          <Link to={routeConverter(ROUTE_CMS_OPEN_CONTENT_PUBLISHED, { id: linkDetails.contentDest })}>
            <Button className="ContentDetails__link-button">
              <Icon name="file-text-o" />
            </Button>
          </Link>
        )
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
    pageDest: PropTypes.string,
    contentDest: PropTypes.string,
  }).isRequired,
  linkLabel: PropTypes.string.isRequired,
};

export default ContentLinkDetails;
