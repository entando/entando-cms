import React from 'react';
import PropTypes from 'prop-types';

const undoIcon = (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
  </svg>
);

const redoIcon = (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
  </svg>
);

const tableIcon = (
  <svg viewBox="0 0 18 18">
    <rect className="ql-stroke-miter" height="12" width="12" x="3" y="3" />
    <line className="ql-stroke-miter" x1="9" x2="9" y1="3" y2="15" />
    <line className="ql-stroke-miter" x1="15" x2="3" y1="9" y2="9" />
  </svg>
);

const tableInsertRowIcon = (
  <svg viewBox="0 0 18 18">
    <g className="ql-fill ql-stroke ql-thin ql-transparent">
      <rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="2.5" />
      <rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="12.5" />
    </g>
    <rect className="ql-fill ql-stroke ql-thin" height="3" rx="0.5" ry="0.5" width="7" x="8.5" y="7.5" />
    <polygon className="ql-fill ql-stroke ql-thin" points="4.5 11 2.5 9 4.5 7 4.5 11" />
    <line className="ql-stroke" x1="6" x2="4" y1="9" y2="9" />
  </svg>
);

const tableInsertColumnIcon = (
  <svg viewBox="0 0 18 18">
    <g className="ql-fill ql-transparent">
      <rect height="10" rx="1" ry="1" width="4" x="12" y="2" />
      <rect height="10" rx="1" ry="1" width="4" x="2" y="2" />
    </g>
    <path className="ql-fill" d="M11.354,4.146l-2-2a0.5,0.5,0,0,0-.707,0l-2,2A0.5,0.5,0,0,0,7,5H8V6a1,1,0,0,0,2,0V5h1A0.5,0.5,0,0,0,11.354,4.146Z" />
    <rect className="ql-fill" height="8" rx="1" ry="1" width="4" x="7" y="8" />
  </svg>
);

const tableDeleteRowIcon = (
  <svg viewBox="0 0 18 18">
    <g className="ql-fill ql-stroke ql-thin ql-transparent">
      <rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="2.5" />
      <rect height="3" rx="0.5" ry="0.5" width="7" x="4.5" y="12.5" />
    </g>
    <rect className="ql-fill ql-stroke ql-thin" height="3" rx="0.5" ry="0.5" width="7" x="8.5" y="7.5" />
    <line className="ql-stroke ql-thin" x1="6.5" x2="3.5" y1="7.5" y2="10.5" />
    <line className="ql-stroke ql-thin" x1="3.5" x2="6.5" y1="7.5" y2="10.5" />
  </svg>
);

const tableDeleteColumnIcon = (
  <svg viewBox="0 0 18 18">
    <g className="ql-fill ql-transparent">
      <rect height="10" rx="1" ry="1" width="4" x="2" y="6" />
      <rect height="10" rx="1" ry="1" width="4" x="12" y="6" />
    </g>
    <rect className="ql-fill" height="8" rx="1" ry="1" width="4" x="7" y="2" />
    <path className="ql-fill" d="M9.707,13l1.146-1.146a0.5,0.5,0,0,0-.707-0.707L9,12.293,7.854,11.146a0.5,0.5,0,0,0-.707.707L8.293,13,7.146,14.146a0.5,0.5,0,1,0,.707.707L9,13.707l1.146,1.146a0.5,0.5,0,0,0,.707-0.707Z" />
  </svg>
);

const tableDeleteIcon = (
  <svg viewBox="0 0 18 18">
    <g className="ql-fill ql-transparent">
      <rect height="2" width="2" x="2" y="2" />
      <rect height="2" width="2" x="5" y="2" />
      <rect height="2" width="2" x="8" y="2" />
      <rect height="2" width="2" x="14" y="2" />
      <rect height="2" width="2" x="11" y="2" />
      <rect height="2" width="2" x="2" y="14" />
      <rect height="2" width="2" x="5" y="14" />
      <rect height="2" width="2" x="8" y="14" />
      <rect height="2" width="2" x="14" y="14" />
      <rect height="2" width="2" x="11" y="14" />
      <rect height="2" transform="translate(-9 15) rotate(-90)" width="2" x="2" y="11" />
      <rect height="2" transform="translate(-6 12) rotate(-90)" width="2" x="2" y="8" />
      <rect height="2" transform="translate(-3 9) rotate(-90)" width="2" x="2" y="5" />
      <rect height="2" transform="translate(3 27) rotate(-90)" width="2" x="14" y="11" />
      <rect height="2" transform="translate(6 24) rotate(-90)" width="2" x="14" y="8" />
      <rect height="2" transform="translate(3 21) rotate(-90)" width="2" x="11" y="8" />
      <rect height="2" transform="translate(0 18) rotate(-90)" width="2" x="8" y="8" />
      <rect height="2" transform="translate(-3 15) rotate(-90)" width="2" x="5" y="8" />
      <rect height="2" width="2" x="8" y="11" />
      <rect height="2" width="2" x="8" y="5" />
      <rect height="2" transform="translate(9 21) rotate(-90)" width="2" x="14" y="5" />
    </g>
  </svg>
);

const hrIcon = (
  <svg viewBox="0 0 18 18">
    <path className="ql-fill" d="M15,12v2a.99942.99942,0,0,1-1,1H4a.99942.99942,0,0,1-1-1V12a1,1,0,0,1,2,0v1h8V12a1,1,0,0,1,2,0ZM14,3H4A.99942.99942,0,0,0,3,4V6A1,1,0,0,0,5,6V5h8V6a1,1,0,0,0,2,0V4A.99942.99942,0,0,0,14,3Z" />
    <path className="ql-fill" d="M15,10H3A1,1,0,0,1,3,8H15a1,1,0,0,1,0,2Z" />
  </svg>
);

const maximizeIcon = (
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="expand-arrows-alt" className="svg-inline--fa fa-expand-arrows-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor" d="M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z" />
  </svg>
);

const ToolbarGroup = ({ children }) => (
  <span className="ql-formats">{children}</span>
);

ToolbarGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

const renderToolbarButton = (format, value, icon) => (
  <button className={`ql-${format}`} value={value} type="button">
    {icon}
  </button>
);

const EditorToolbar = () => (
  <div id="editor-toolbar" style={{ borderBottom: 'none' }}>
    <ToolbarGroup>
      {renderToolbarButton('history', 'undo', undoIcon)}
      {renderToolbarButton('history', 'redo', redoIcon)}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('entable', 'table', tableIcon)}
      {renderToolbarButton('entable', 'table-insert-row', tableInsertRowIcon)}
      {renderToolbarButton('entable', 'table-insert-column', tableInsertColumnIcon)}
      {renderToolbarButton('entable', 'table-delete-row', tableDeleteRowIcon)}
      {renderToolbarButton('entable', 'table-delete-column', tableDeleteColumnIcon)}
      {renderToolbarButton('entable', 'table-delete', tableDeleteIcon)}
      {renderToolbarButton('divider', undefined, hrIcon)}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('maximize', undefined, maximizeIcon)}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('bold')}
      {renderToolbarButton('italic')}
      {renderToolbarButton('strike')}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('clean')}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('list', 'ordered')}
      {renderToolbarButton('list', 'bullet')}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('indent', '-1')}
      {renderToolbarButton('indent', '+1')}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('blockquote')}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('enlink', 'link', <img src="/images/editor/entandolink-icon.png" alt="Entando Link" />)}
      {renderToolbarButton('enlink', 'unlink', <img src="/images/editor/entandounlink-icon.png" alt="Entando Unlink" />)}
    </ToolbarGroup>
    <ToolbarGroup>
      {renderToolbarButton('viewSource')}
    </ToolbarGroup>
  </div>
);

export default EditorToolbar;
