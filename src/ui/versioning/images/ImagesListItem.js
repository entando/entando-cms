import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { ListViewItem } from 'patternfly-react';

import { getURLAbsolute } from 'state/assets/selectors';
import ImagesListItemActions from 'ui/versioning/images/ImagesListItemActions';

const ImagesListItem = ({
  image, onClickRemove, onClickRecover, domain,
}) => console.log('image', image, getURLAbsolute(domain, image.versions && image.versions[0] && get(image.versions[0], 'path', '')))
  || (
  <ListViewItem
    actions={(
      <ImagesListItemActions
        imageId={image.id}
        onClickRemove={onClickRemove}
        onClickRecover={onClickRecover}
      />
    )}
    compoundExpand={false}
    compoundExpanded={false}
    description={(
      <div className="ImagesListItem">
        <img
          src={getURLAbsolute(domain, image.versions && image.versions[0] && get(image.versions[0], 'path', ''))}
          className="ImagesListItem__image"
          alt={image.description}
        />
        <h4 className="ImagesListItem__description">{image.description}</h4>
      </div>
    )}
    hideCloseIcon={false}
    stacked={false}
  />
  );

ImagesListItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    lastVersion: PropTypes.string,
  }).isRequired,
  onClickRemove: PropTypes.func,
  onClickRecover: PropTypes.func,
  domain: PropTypes.string.isRequired,
};

ImagesListItem.defaultProps = {
  onClickRemove: () => {},
  onClickRecover: () => {},
};

export default ImagesListItem;
