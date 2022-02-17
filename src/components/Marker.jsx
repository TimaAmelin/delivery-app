import React from 'react';
import PropTypes from 'prop-types';

export const Marker = ({ onClick, children }) => (
  <div className="marker"
    onClick={onClick}
  >
    {children}
  </div>
);