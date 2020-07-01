import React from 'react';
import { LinkMenuItem } from '@entando/menu';
import { hasAccess } from '@entando/utils';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  ROUTE_CMS_CONTENTTEMPLATE_LIST, ROUTE_CMS_CONTENTTYPE_LIST,
  ROUTE_CMS_CONTENTS, ROUTE_CMS_ASSETS_LIST, ROUTE_CMS_VERSIONING,
} from 'app-init/routes';
import { withPermissionValues } from 'ui/common/auth/withPermissions';

import {
  CRUD_CONTENTS_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION,
  MANAGE_RESOURCES_PERMISSION,
} from 'state/permissions/const';

const LinkMenu = ({ userPermissions, isSuperuser }) => {
  const canEditContents = hasAccess(CRUD_CONTENTS_PERMISSION, userPermissions);

  const canContentsAccess = canEditContents
    || hasAccess(VALIDATE_CONTENTS_PERMISSION, userPermissions);
  const canAssetsAccess = hasAccess(MANAGE_RESOURCES_PERMISSION, userPermissions);
  const canContentTypeAccess = isSuperuser;
  const canContentTemplatesAccess = isSuperuser;
  const canContentSettingsAccess = isSuperuser;
  const canVersioningAccess = isSuperuser || canEditContents || canAssetsAccess;

  return (
    <>
      {
      canContentsAccess && (
      <LinkMenuItem
        id="menu-contents"
        label={<FormattedMessage id="cms.menu.contents" defaultMessage="Contents" />}
        to={ROUTE_CMS_CONTENTS}
      />
      )
      }
      {
        canAssetsAccess && (
        <LinkMenuItem
          id="menu-assets"
          label={<FormattedMessage id="cms.assets.title" defaultMessage="Digital Assets" />}
          to={ROUTE_CMS_ASSETS_LIST}
        />
        )
      }
      {
        canContentTypeAccess && (
        <LinkMenuItem
          id="menu-content-type"
          label={<FormattedMessage id="cms.menu.contenttypes" defaultMessage="Content Types" />}
          to={ROUTE_CMS_CONTENTTYPE_LIST}
        />
        )
      }
      {
        canContentTemplatesAccess && (
        <LinkMenuItem
          id="menu-content-template"
          label={<FormattedMessage id="cms.menu.contenttemplates" defaultMessage="Content Templates" />}
          to={ROUTE_CMS_CONTENTTEMPLATE_LIST}
        />
        )
      }
      {
        canContentSettingsAccess && (
        <LinkMenuItem
          id="menu-content-settings"
          label={<FormattedMessage id="cms.menu.contentsettings" defaultMessage="Content Settings" />}
          to="/cms/content-settings"
        />
        )
      }
      {
        canVersioningAccess && (
        <LinkMenuItem
          id="menu-versioning"
          label={<FormattedMessage id="cms.menu.versioning" defaultMessage="Versioning" />}
          to={ROUTE_CMS_VERSIONING}
        />
        )
      }
    </>
  );
};

LinkMenu.propTypes = {
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  isSuperuser: PropTypes.bool.isRequired,
};

LinkMenu.defaultProps = {
  userPermissions: null,
};


export default withPermissionValues(LinkMenu);
