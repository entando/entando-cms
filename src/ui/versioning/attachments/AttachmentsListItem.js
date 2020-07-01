import React from 'react';
import PropTypes from 'prop-types';
import {
  ListViewItem,
  Badge,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import AttachmentsListItemActions from 'ui/versioning/attachments/AttachmentsListItemActions';

function bytesToSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round(bytes / (1024 ** i), 2)} ${sizes[i]}`;
}

const AttachmentsListItem = ({
  attachment, onClickRemove, onClickRecover, domain,
}) => (
  <ListViewItem
    actions={(
      <AttachmentsListItemActions
        attachmentId={attachment.id}
        attachmentDescription={attachment.description}
        onClickRemove={onClickRemove}
        onClickRecover={onClickRecover}
      />
    )}
    compoundExpand={false}
    compoundExpanded={false}
    description={(
      <div className="AttachmentsListItem__description">
        <h4>{attachment.description}</h4>
        <div>{attachment.lastVersion}</div>
        <div className="AttachmentsListItem__file-details">
          <div className="AttachmentsListItem__filename">{attachment.fileName}</div>
          <div>
            <code>
              <a href={`${domain}/api/plugins/versioning/resources/${attachment.id}/1`} title="Download">
                <code className="margin-small-bottom">
                  <abbr title={attachment.description}>{attachment.description}</abbr>
                </code>
              </a>
            </code>
          </div>
          <div>
            <Badge className="AttachmentsListItem__size-badge" data-testid="size-badge">
              { bytesToSize(attachment.sizeBytes || 0) }
            </Badge>
          </div>
          <div><FormattedMessage id="cms.versioning.list.resourceId" defaultMessage="Resource ID" />: {attachment.id}</div>
        </div>
      </div>
    )}
    hideCloseIcon={false}
    stacked={false}
  />
);

AttachmentsListItem.propTypes = {
  attachment: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    lastVersion: PropTypes.string,
    path: PropTypes.string,
    fileName: PropTypes.string,
    sizeBytes: PropTypes.number,
  }).isRequired,
  onClickRemove: PropTypes.func,
  onClickRecover: PropTypes.func,
  domain: PropTypes.string.isRequired,
};

AttachmentsListItem.defaultProps = {
  onClickRemove: () => {},
  onClickRecover: () => {},
};

export default AttachmentsListItem;
