import React from 'react';
import { LinkMenuItem } from '@entando/menu';
import { FormattedMessage } from 'react-intl';
import {
  ROUTE_CMS_CONTENTMODEL_LIST, ROUTE_CMS_CONTENTTYPE_LIST,
  ROUTE_CMS_CONTENTS, ROUTE_CMS_ASSETS_LIST,
} from 'app-init/routes';

const LinkMenu = () => (
  <>
    <LinkMenuItem
      id="menu-contents"
      label={<FormattedMessage id="cms.menu.contents" defaultMessage="Contents" />}
      to={ROUTE_CMS_CONTENTS}
    />
    <LinkMenuItem
      id="menu-assets"
      label={<FormattedMessage id="cms.assets.title" defaultMessage="Digital Assets" />}
      to={ROUTE_CMS_ASSETS_LIST}
    />
    <LinkMenuItem
      id="menu-content-type"
      label={<FormattedMessage id="cms.menu.contenttypes" defaultMessage="Content Types" />}
      to={ROUTE_CMS_CONTENTTYPE_LIST}
    />
    <LinkMenuItem
      id="menu-content-model"
      label={<FormattedMessage id="cms.menu.contentmodels" defaultMessage="Content Models" />}
      to={ROUTE_CMS_CONTENTMODEL_LIST}
    />
    <LinkMenuItem
      id="menu-content-settings"
      label={<FormattedMessage id="cms.menu.contentsettings" defaultMessage="Content Settings" />}
      to="/cms/content-settings"
    />
  </>
);

export default LinkMenu;
