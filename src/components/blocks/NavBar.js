import React from 'react';
import { withTheme } from 'styled-components';

const NavBar = withTheme(() => {
  return (
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/co-benifets">Co-Benifets</a>
      </li>
      <li>
        <a href="/locations">Project Locations</a>
      </li>
      <li>
        <a href="/qualifications">Qualifications</a>
      </li>
      <li>
        <a href="/ratings">Ratings</a>
      </li>
      <li>
        <a href="/related-projects">Related Projects</a>
      </li>
      <li>
        <a href="/units">Units</a>
      </li>
      <li>
        <a href="/vintages">Vintages</a>
      </li>
      <li>
        <a href="/projects">Projects</a>
      </li>
    </ul>
  );
});

export { NavBar };
