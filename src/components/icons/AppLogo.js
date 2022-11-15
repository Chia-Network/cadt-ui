import React from 'react';

import logo from '../../assets/img/CAD-Logo-RGB-Full-Colour.png';

const AppLogo = ({ width, height }) => {
  return <img width={width} height={height} src={logo} />;
};

export { AppLogo };
