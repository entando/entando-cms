import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const AssetsListItem = ({
  asset, domain, onEditClicked, onClickDelete,
}) => {
  const {
    createdAt, description, metadata = {}, group, categories, versions, owner, path,
  } = asset;
  const fileType = versions == null ? 'file' : 'image';
  const downloadUrl = `${domain}${fileType === 'image' ? `${versions[0].path}` : `${path}`}`;
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
  const onClickDeleteHandle = () => onClickDelete(asset);
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
          <MenuItem className="" onClick={() => window.open(downloadUrl)}>
            <FormattedMessage id="cms.label.download" defaultMessage="Download" />
          </MenuItem>
          <MenuItem className="" onClick={onClickDeleteHandle}>
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
  onClickDelete: PropTypes.func.isRequired,
  domain: PropTypes.string.isRequired,
};

export default AssetsListItem;
