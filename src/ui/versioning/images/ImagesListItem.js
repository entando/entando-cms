import React from 'react';
import PropTypes from 'prop-types';
import {
  ListViewItem,
} from 'patternfly-react';


import ImagesListItemActions from 'ui/versioning/images/ImagesListItemActions';

const ImagesListItem = ({ image, onClickRemove, onClickRecover }) => (
  <ListViewItem
    actions={(
      <ImagesListItemActions
        imageId={image.id}
        onClickRemove={onClickRemove}
        onClickRecover={onClickRecover}
        imageDescription={image.description}
      />
    )}
    compoundExpand={false}
    compoundExpanded={false}
    description={(
      <div className="ImagesListItem">
        <img src="https://picsum.photos/90/90" className="ImagesListItem__image" alt="my" />
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
};

ImagesListItem.defaultProps = {
  onClickRemove: () => {},
  onClickRecover: () => {},
};

export default ImagesListItem;
