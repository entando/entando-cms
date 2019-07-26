import React from 'react';
import PropTypes from 'prop-types';

const FirstLevelMenuItem = ({
  id, active, label, children, className, onClick, pullRight,
}) => {
  let liClassName = 'FirstLevelMenuItem';
  liClassName += className ? ` ${className}` : '';
  if (active) {
    liClassName += ' active';
  }
  if (pullRight) {
    liClassName += ' pull-right';
  }

  return (
    <li className={liClassName} data-id={id}>
      <a
        href=""
        onClick={(ev) => { ev.preventDefault(); onClick(); }}
      >
        { label }
      </a>
      <ul className="BrandMenu__submenu nav navbar-nav navbar-persistent">
        { children }
      </ul>
    </li>
  );
};


FirstLevelMenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
  active: PropTypes.bool,
  pullRight: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

FirstLevelMenuItem.defaultProps = {
  pullRight: false,
  onClick: () => {},
  active: false,
  className: '',
};


export default FirstLevelMenuItem;
