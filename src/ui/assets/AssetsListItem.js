import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const AssetsListItem = ({ asset, domain, onEditClicked }) => {
  const {
    createdAt, description, metadata = {}, group, categories, versions, owner,
  } = asset;
  const fileType = versions == null ? 'file' : 'image';
  const previewRender = fileType === 'image' ? (
    <img src={`${domain}${versions[1].path}`} alt="Preview" />
  ) : (
    <div className="fa fa-file-text AssetsList__item-file" />
  );
  const type = metadata['Detected File Type Name']
    || description
      .split('.')
      .slice(-1)[0]
      .toUpperCase();
  const renderCategories = categories.map(cat => (
    <span key={cat}>
      {cat}
      <br />
    </span>
  ));
  const onEditClickHandle = () => onEditClicked(asset);
  return (
    <tr className="AssetsList__item" key={asset.id}>
      <td className={fileType === 'file' ? 'text-center' : ''}>{previewRender}</td>
      <td>{description}</td>
      <td>{type}</td>
      <td>{owner || 'N/A'}</td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
      <td>{group}</td>
      <td>{renderCategories}</td>
      <td>
        <DropdownKebab className="AssetsList__item-actions" id={asset.id}>
          <MenuItem className="" onClick={onEditClickHandle}>
            <FormattedMessage id="cms.label.edit" defaultMessage="Edit" />
          </MenuItem>
          <MenuItem className="" onClick={() => {}}>
            <FormattedMessage id="cms.label.delete" defaultMessage="Delete" />
          </MenuItem>
        </DropdownKebab>
      </td>
    </tr>
  );
};

AssetsListItem.propTypes = {
  asset: PropTypes.shape({}).isRequired,
  onEditClicked: PropTypes.func.isRequired,
  domain: PropTypes.string.isRequired,
};

export default AssetsListItem;
