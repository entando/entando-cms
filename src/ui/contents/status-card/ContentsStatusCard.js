import React, { Component } from 'react';
import { DonutChart } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { formatDate, hasAccess } from '@entando/utils';
import PropTypes from 'prop-types';
import {
  defineMessages, FormattedMessage, injectIntl, intlShape,
} from 'react-intl';

import { ROUTE_CMS_CONTENTS } from 'app-init/routes';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

const generateContentsStatusReport = contents => contents.reduce((acc, curr) => {
  const { onLine, status, lastModified } = curr;
  const lastModifiedDate = new Date(lastModified);
  const currLastModifiedDate = new Date(acc.latestModificationDate);
  const latestModificationDate = lastModifiedDate >= currLastModifiedDate
    ? lastModified : acc.latestModificationDate;
  if (onLine) {
    if (status.toLowerCase() === 'public') {
      return { ...acc, published: acc.published + 1, latestModificationDate };
    }
    return { ...acc, ready: acc.ready + 1, latestModificationDate };
  }
  return { ...acc, unpublished: acc.unpublished + 1, latestModificationDate };
}, {
  unpublished: 0, ready: 0, published: 0, latestModificationDate: 0,
});

const contentStatusMsgs = defineMessages({
  published: {
    id: 'cms.content.status.published',
    defaultMessage: 'Approved',
  },
  unpublished: {
    id: 'cms.content.status.unpublished',
    defaultMessage: 'Work',
  },
  ready: {
    id: 'cms.content.status.ready',
    defaultMessage: 'Approved, with changes',
  },
});

class ContentsStatusCard extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const { intl, contents, userPermissions } = this.props;
    const {
      unpublished, ready, published, latestModificationDate,
    } = generateContentsStatusReport(contents);

    const msgs = {
      published: intl.formatMessage(contentStatusMsgs.published),
      unpublished: intl.formatMessage(contentStatusMsgs.unpublished),
      ready: intl.formatMessage(contentStatusMsgs.ready),
    };

    const columns = [
      [msgs.published, published],
      [msgs.unpublished, unpublished],
      [msgs.ready, ready],
    ];

    const contentsAvailable = contents && contents.length > 0;

    const renderBody = !contentsAvailable ? (
      <div>
        <FormattedMessage id="cms.contents.notFound" defaultMessage="No contents were found on system." />
      </div>
    ) : (
      <DonutChart
        id="donunt-chart-3"
        data={{
          colors: {
            [msgs.published]: '#00A0DF',
            [msgs.unpublished]: '#A6A6A6',
            [msgs.ready]: '#0066CC',
          },
          columns,
          type: 'donut',
        }}
        title={{ type: 'total', secondary: 'contents' }}
        legend={{ show: true, position: 'right' }}
        tooltip={{
          format: {
            value: v => v,
          },
        }}
      />
    );

    return (
      <div className="ContentsStatusCard">
        <h2 className="ContentsStatusCard__title">
          <FormattedMessage
            id="cms.contents.contentStatus"
            defaultMessage="Content Status"
          />
        </h2>
        <span>
          {(latestModificationDate && contentsAvailable)
            ? formatDate(latestModificationDate) : null}
        </span>
        {renderBody}
        {
          hasAccess(SUPERUSER_PERMISSION, userPermissions) && (
            <div className="pull-right">
              <Link to={ROUTE_CMS_CONTENTS}>
                <FormattedMessage id="cms.menu.contentlist" defaultMessage="Content List" />
              </Link>
            </div>
          )
        }
      </div>
    );
  }
}

ContentsStatusCard.propTypes = {
  intl: intlShape.isRequired,
  onDidMount: PropTypes.func,
  contents: PropTypes.arrayOf(PropTypes.shape({})),
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

ContentsStatusCard.defaultProps = {
  onDidMount: () => {},
  contents: [],
  userPermissions: null,
};

export default injectIntl(ContentsStatusCard);
