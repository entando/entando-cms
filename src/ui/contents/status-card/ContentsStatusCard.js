import React, { Component } from 'react';
import { DonutChart } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { formatDate, hasAccess } from '@entando/utils';
import PropTypes from 'prop-types';
import {
  defineMessages, FormattedMessage, injectIntl, intlShape,
} from 'react-intl';

import { ROUTE_CMS_CONTENTS } from 'app-init/routes';
import { SUPERUSER_PERMISSION, CRUD_CONTENTS_PERMISSION, VALIDATE_CONTENTS_PERMISSION } from 'state/permissions/const';

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
  contents: {
    id: 'cms.contents.title',
    defaultMessage: 'Contents',
  },
  published: {
    id: 'cms.content.status.published',
    defaultMessage: 'Published',
  },
  unpublished: {
    id: 'cms.content.status.unpublished',
    defaultMessage: 'Unpublished',
  },
  ready: {
    id: 'cms.content.status.pendingChanges',
    defaultMessage: 'Published, with pending changes',
  },
});

class ContentsStatusCard extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const {
      intl, contents, userPermissions, language,
    } = this.props;
    const {
      unpublished, ready, published, latestModificationDate,
    } = generateContentsStatusReport(contents);

    const msgs = {
      contents: intl.formatMessage(contentStatusMsgs.contents),
      published: intl.formatMessage(contentStatusMsgs.published),
      unpublished: intl.formatMessage(contentStatusMsgs.unpublished),
      ready: intl.formatMessage(contentStatusMsgs.ready),
    };

    const columns = [
      [msgs.published, published],
      [msgs.ready, ready],
      [msgs.unpublished, unpublished],
    ];

    const contentsAvailable = contents && contents.length > 0;

    const renderBody = !contentsAvailable ? (
      <div>
        <FormattedMessage id="cms.contents.notFound" defaultMessage="No contents were found on system." />
      </div>
    ) : (
      <DonutChart
        key={language}
        data={{
          colors: {
            [msgs.published]: '#6CA100',
            [msgs.ready]: '#F0AB00',
            [msgs.unpublished]: '#72767B',
          },
          columns,
          type: 'donut',
        }}
        title={{ type: 'total', secondary: msgs.contents }}
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
          hasAccess([SUPERUSER_PERMISSION, CRUD_CONTENTS_PERMISSION, VALIDATE_CONTENTS_PERMISSION],
            userPermissions) && (
            <div className="pull-right ContentsStatusCard__bottom-link">
              <Link to={ROUTE_CMS_CONTENTS}>
                <FormattedMessage id="dashboard.contents.link" defaultMessage="Content List" />
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
  language: PropTypes.string.isRequired,
  onDidMount: PropTypes.func,
  contents: PropTypes.arrayOf(PropTypes.shape({})),
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

ContentsStatusCard.defaultProps = {
  onDidMount: () => {},
  contents: [],
  userPermissions: [],
};

export default injectIntl(ContentsStatusCard);
