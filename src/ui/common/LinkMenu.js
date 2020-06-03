import React from 'react';
import { LinkMenuItem } from '@entando/menu';
import { hasAccess } from '@entando/utils';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  ROUTE_CMS_CONTENTTEMPLATE_LIST, ROUTE_CMS_CONTENTTYPE_LIST,
  ROUTE_CMS_CONTENTS, ROUTE_CMS_ASSETS_LIST,
} from 'app-init/routes';
import { withPermissionValues } from 'ui/common/auth/withPermissions';

import {
  SUPERUSER_PERMISSION,
  CRUD_CONTENTS_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION,
  MANAGE_RESOURCES_PERMISSION,
} from 'state/permissions/const';

const LinkMenu = ({ userPermissions }) => {
  const hasMenuContentsAccess = hasAccess([
    CRUD_CONTENTS_PERMISSION,
    VALIDATE_CONTENTS_PERMISSION,
  ], userPermissions);
  const hasMenuAssetsAccess = hasAccess(MANAGE_RESOURCES_PERMISSION, userPermissions);
  const hasMenuContentTypeAccess = hasAccess(SUPERUSER_PERMISSION, userPermissions);
  const hasMenuContentTemplatesAccess = hasAccess(SUPERUSER_PERMISSION, userPermissions);
  const hasMenuContentSettingsAccess = hasAccess(SUPERUSER_PERMISSION, userPermissions);
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


export default withPermissionValues(LinkMenu);
