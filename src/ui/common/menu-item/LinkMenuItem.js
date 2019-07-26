import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LinkMenuItem = ({
  id, label, active, to, className, onClick, pullRight,
}) => {
  let liClassName = 'LinkMenuItem';
  liClassName += className ? ` ${className}` : '';
  if (pullRight) {
    liClassName += ' pull-right';
  }
  if (active) {
    liClassName += ' active';
  }
  return (
    <li key={to} className={liClassName} data-id={id}>
      <Link
        onClick={onClick}
        to={to}
      >
        { label }
      </Link>
    </li>
  );
};


LinkMenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  active: PropTypes.bool,
  className: PropTypes.string,
  pullRight: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string.isRequired,
};

LinkMenuItem.defaultProps = {
  active: false,
  className: '',
  onClick: () => {},
  pullRight: false,
};


export default LinkMenuItem;
