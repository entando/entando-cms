import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Button } from 'patternfly-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyTextButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const resetCopyIcon = debounce(() => setCopied(false), 3000);

  const handleCopy = () => {
    setCopied(true);
    resetCopyIcon.cancel();
    resetCopyIcon();
  };

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <Button>
        <span className={`fa fa-default ${copied ? 'fa-check' : 'fa-copy'}`} />
      </Button>
    </CopyToClipboard>
  );
};

CopyTextButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyTextButton;
