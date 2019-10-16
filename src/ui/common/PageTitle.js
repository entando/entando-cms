import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { OverlayTrigger, Popover } from 'patternfly-react';

const helpIcon = (helpId, position) => (helpId ? (
  <span className={position || null}>
    <OverlayTrigger
      overlay={(
        <Popover id={helpId}>
          <p>
            <FormattedMessage id={helpId} defaultMessage="You can see tips here." />
          </p>
        </Popover>
)}
      placement="left"
      trigger={['click']}
      rootClose
    >
      <i className="PageTitle__icon fa pficon-help" />
    </OverlayTrigger>
  </span>
) : null);

const PageTitle = ({
  titleId, helpId, titleParam, position, noHeaderMargin, largeTitle,
}) => (
  <div className="PageTitle">
    <div
      className="PageTitle__header"
      style={noHeaderMargin ? { marginTop: 0, marginBottom: 0 } : {}}
    >
      <h1 className="PageTitle__title" style={largeTitle ? { fontSize: '24px' } : {}}>
        <FormattedMessage id={titleId} defaultMessage="Title" values={titleParam} />
        {helpIcon(helpId, position)}
      </h1>
    </div>
  </div>
);

PageTitle.propTypes = {
  titleId: PropTypes.string.isRequired,
  helpId: PropTypes.string,
  titleParam: PropTypes.shape({}),
  position: PropTypes.string,
  noHeaderMargin: PropTypes.bool,
  largeTitle: PropTypes.bool,
};

PageTitle.defaultProps = {
  helpId: '',
  titleParam: {},
  position: '',
  noHeaderMargin: false,
  largeTitle: false,
};

export default PageTitle;
