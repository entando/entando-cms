import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { OverlayTrigger, Popover } from 'patternfly-react';


const helpIcon = helpId => (
  helpId ? (
    <span>
      <OverlayTrigger
        overlay={(
          <Popover id={helpId}>
            <p><FormattedMessage id={helpId} defaultMessage="You can see tips here." /></p>
          </Popover>
        )}
        placement="left"
        trigger={['click']}
        rootClose
      >
        <i className="PageTitle__icon fa pficon-help" />
      </OverlayTrigger>
    </span>
  ) : null
);

const PageTitle = ({
  titleId,
  helpId,
  titleParam,
}) => (
  <div className="PageTitle">
    <div className="PageTitle__header">
      <h1 className="PageTitle__title">
        <FormattedMessage id={titleId} defaultMessage="Title" values={titleParam} />
        {helpIcon(helpId)}
      </h1>
    </div>
  </div>
);

PageTitle.propTypes = {
  titleId: PropTypes.string.isRequired,
  helpId: PropTypes.string,
  titleParam: PropTypes.shape({}),
};

PageTitle.defaultProps = {
  helpId: '',
  titleParam: {},
};

export default PageTitle;
