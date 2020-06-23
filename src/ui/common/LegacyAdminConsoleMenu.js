import React from 'react';
import PropTypes from 'prop-types';
import { hasAccess } from '@entando/utils';
import { withRouter } from 'react-router-dom';
import { VerticalNav } from 'patternfly-react';
import { intlShape, injectIntl } from 'react-intl';

import {
  ROUTE_CMS_CONTENTTEMPLATE_LIST, ROUTE_CMS_CONTENTTYPE_LIST,
  ROUTE_CMS_CONTENTS, ROUTE_CMS_ASSETS_LIST, ROUTE_CMS_CONTENT_SETTINGS,
} from 'app-init/routes';
import { withPermissionValues } from 'ui/common/auth/withPermissions';
import {
  SUPERUSER_PERMISSION,
  CRUD_CONTENTS_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION,
  MANAGE_RESOURCES_PERMISSION,
} from 'state/permissions/const';

const {
  TertiaryItem,
} = VerticalNav;

const LegacyAdminConsoleMenu = ({ userPermissions, history, intl }) => {
  console.log(userPermissions, history, intl);
  const hasMenuContentsAccess = hasAccess(CRUD_CONTENTS_PERMISSION, userPermissions)
    || hasAccess(VALIDATE_CONTENTS_PERMISSION, userPermissions);
  const hasMenuAssetsAccess = hasAccess(MANAGE_RESOURCES_PERMISSION, userPermissions);
  const hasMenuContentTypeAccess = hasAccess(SUPERUSER_PERMISSION, userPermissions);
  const hasMenuContentTemplatesAccess = hasAccess(SUPERUSER_PERMISSION, userPermissions);
  const hasMenuContentSettingsAccess = hasAccess(SUPERUSER_PERMISSION, userPermissions);
  return (
    <>
      {
      hasMenuContentsAccess && (
      <TertiaryItem
        id="menu-contents"
        onClick={() => history.push(ROUTE_CMS_CONTENTS)}
        title={intl.formatMessage({ id: 'cms.menu.contents', defaultMessage: 'Contents' })}
      />
      )
      }
      {
        hasMenuAssetsAccess && (
        <TertiaryItem
          id="menu-assets"
          onClick={() => history.push(ROUTE_CMS_ASSETS_LIST)}
          title={intl.formatMessage({ id: 'cms.assets.title', defaultMessage: 'Digital Assets' })}
        />
        )
      }
      {
        hasMenuContentTypeAccess && (
        <TertiaryItem
          id="menu-content-type"
          onClick={() => history.push(ROUTE_CMS_CONTENTTYPE_LIST)}
          title={intl.formatMessage({ id: 'cms.menu.contenttypes', defaultMessage: 'Content Types' })}
        />
        )
      }
      {
        hasMenuContentTemplatesAccess && (
        <TertiaryItem
          id="menu-content-template"
          onClick={() => history.push(ROUTE_CMS_CONTENTTEMPLATE_LIST)}
          title={intl.formatMessage({ id: 'cms.menu.contenttemplates', defaultMessage: 'Content Templates' })}
        />
        )
      }
      {
        hasMenuContentSettingsAccess && (
        <TertiaryItem
          onClick={() => history.push(ROUTE_CMS_CONTENT_SETTINGS)}
          title={intl.formatMessage({ id: 'cms.menu.contentsettings', defaultMessage: 'Content Settings' })}
        />
        )
      }
    </>
  );
};

LegacyAdminConsoleMenu.propTypes = {
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};

LegacyAdminConsoleMenu.defaultProps = {
  userPermissions: null,
};


export default withRouter(injectIntl(withPermissionValues(LegacyAdminConsoleMenu)));
