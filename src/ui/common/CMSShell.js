import React from 'react';
import PropTypes from 'prop-types';
import {
  BrandMenu,
  FirstLevelMenuItem,
  LinkMenuItem,
} from '@entando/menu';
import { FormattedMessage } from 'react-intl';
import {
  ROUTE_CMS_CONTENTMODEL_LIST,
  ROUTE_CMS_CONTENTTYPE_LIST,
} from 'app-init/routes';

const BRAND_LOGO = <img src="/images/entando-logo.svg" alt="" />;

const CMSShell = ({ className, children }) => (
  <div className={['CMSShell', className].join(' ').trim()}>
    <BrandMenu brandLogo={BRAND_LOGO} title="Runtime Authoring Tool">
      <LinkMenuItem
        id="menu-dashboard"
        label={<FormattedMessage id="cms.menu.dashboard" defaultMessage="Dashboard" />}
        to="/"
      />
      <FirstLevelMenuItem
        id="menu-cms"
        label={<FormattedMessage id="cms.menu.cms" defaultMessage="CMS" />}
      >
        <LinkMenuItem
          id="menu-content-list"
          label={<FormattedMessage id="cms.menu.contentlist" defaultMessage="Content List" />}
          to="/cms/content-list"
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
      </FirstLevelMenuItem>
    </BrandMenu>
    {children}
  </div>
);

CMSShell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CMSShell.defaultProps = {
  children: null,
  className: '',
};

export default CMSShell;
