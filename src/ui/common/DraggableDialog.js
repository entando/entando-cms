import React from 'react';
import Draggable from 'react-draggable';
import { ModalDialog } from 'react-bootstrap'; // eslint-disable-line import/no-extraneous-dependencies

const DraggableDialog = props => (
  <Draggable handle=".modal-title"><ModalDialog {...props} /></Draggable>
);

export default DraggableDialog;
