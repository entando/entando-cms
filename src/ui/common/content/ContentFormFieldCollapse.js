import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';

import SectionTitle from 'ui/common/SectionTitle';

const ContentFormFieldCollapse = ({
  label, children, showContentAtStart, open,
}) => {
  const [opened, setOpened] = useState(showContentAtStart);

  const handleCollapse = () => setOpened(!opened);

  useEffect(() => {
    setOpened(open);
  }, [open]);

  return (
    <div className={`ContentFormFieldCollapse ${opened ? 'opened' : 'closed'}`}>
      <SectionTitle
        label={label}
        onClick={handleCollapse}
        collapsable
        noRequired
        isOpened={opened}
      />
      <Collapse isOpened={opened}>
        <div className="ContentFormFieldCollapse__body">
          {children}
        </div>
      </Collapse>
    </div>
  );
};

ContentFormFieldCollapse.propTypes = {
  label: PropTypes.node.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  showContentAtStart: PropTypes.bool,
  open: PropTypes.bool,
};

ContentFormFieldCollapse.defaultProps = {
  showContentAtStart: false,
  open: false,
};

export default ContentFormFieldCollapse;
