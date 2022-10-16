// sidebar.js

// animation effect for menu in
// slide
// stack
// elastic
// bubble
// push
// pushRotate
// scaleDown
// scaleRotate
// fallDown
// reveal

import React from 'react';
import { elastic as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu disableCloseOnEsc disableOverlayClick isOpen={true} >
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/about">
        About
      </a>

      <a className="menu-item" href="/historic">
        Historic
      </a>

      <a className="menu-item" href="/predictive">
        Predictive
      </a>
    </Menu>
  );
};