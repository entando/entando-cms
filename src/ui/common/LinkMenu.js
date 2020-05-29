import React from 'react';
import { LinkMenuItem } from '@entando/menu';
import { hasAccess } from '@entando/utils';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  ROUTE_CMS_CONTENTTEMPLATE_LIST, ROUTE_CMS_CONTENTTYPE_LIST,
  ROUTE_CMS_CONTENTS, ROUTE_CMS_ASSETS_LIST,
} from 'app-init/routes';

const SUPERUSER_PERMISSION = 'superuser';
const CRUD_CONTENTS_PERMISSION = 'editContents';
const VALIDATE_CONTENTS_PERMISSION = 'validateContents';
const MANAGE_RESOURCES_PERMISSION = 'manageResources';
const ALL_CMS_PERMISSIONS = [
  SUPERUSER_PERMISSION, CRUD_CONTENTS_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION, MANAGE_RESOURCES_PERMISSION];

const LinkMenu = ({ userPermissions }) => {
  const cmsUserPermissions = userPermissions === null ? ALL_CMS_PERMISSIONS : userPermissions;
  const hasMenuContentsAccess = hasAccess(CRUD_CONTENTS_PERMISSION, cmsUserPermissions)
  || hasAccess(VALIDATE_CONTENTS_PERMISSION, cmsUserPermissions);
  const hasMenuAssetsAccess = hasAccess(MANAGE_RESOURCES_PERMISSION, cmsUserPermissions);
  const hasMenuContentTypeAccess = hasAccess(SUPERUSER_PERMISSION, cmsUserPermissions);
  const hasMenuContentTemplatesAccess = hasAccess(SUPERUSER_PERMISSION, cmsUserPermissions);
  const hasMenuContentSettingsAccess = hasAccess(SUPERUSER_PERMISSION, cmsUserPermissions);
  return (
    <>
      {
      hasMenuContentsAccess && (
      <LinkMenuItem
        id="menu-contents"
        label={<FormattedMessage id="cms.menu.contents" defaultMessage="Contents" />}
        to={ROUTE_CMS_CONTENTS}
      />
      )
      }
      {
        hasMenuAssetsAccess && (
        <LinkMenuItem
          id="menu-assets"
          label={<FormattedMessage id="cms.assets.title" defaultMessage="Digital Assets" />}
          to={ROUTE_CMS_ASSETS_LIST}
        />
        )
      }
      {
        hasMenuContentTypeAccess && (
        <LinkMenuItem
          id="menu-content-type"
          label={<FormattedMessage id="cms.menu.contenttypes" defaultMessage="Content Types" />}
          to={ROUTE_CMS_CONTENTTYPE_LIST}
        />
        )
      }
      {
        hasMenuContentTemplatesAccess && (
        <LinkMenuItem
          id="menu-content-template"
          label={<FormattedMessage id="cms.menu.contenttemplates" defaultMessage="Content Templates" />}
          to={ROUTE_CMS_CONTENTTEMPLATE_LIST}
        />
        )
      }
      {
        hasMenuContentSettingsAccess && (
        <LinkMenuItem
          id="menu-content-settings"
          label={<FormattedMessage id="cms.menu.contentsettings" defaultMessage="Content Settings" />}
          to="/cms/content-settings"
        />
        )
      }
    </>
  );
};

LinkMenu.propTypes = {
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

LinkMenu.defaultProps = {
  userPermissions: null,
};


export default LinkMenu;
