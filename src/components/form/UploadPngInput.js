import React, { useCallback } from 'react';
import styled from 'styled-components';

import { UploadIcon, OrganizationLogo } from '..';

const StyledDiv = styled('div')`
  border: 1px dotted #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  & label {
    cursor: pointer;
  }
`;

const StyledInput = styled('input')`
  visibility: hidden;
  width: 0px;
  height: 0px;
`;

const UploadPngInput = ({ icon, onChange }) => {
  const onPngInputChange = useCallback(e => {
    if (e.target.value && e.target.value !== '') {
      const fileNameIsValid = /\.png$/.test(e.target.value);
      if (fileNameIsValid) {
        const file = e.target.files[0];
        onChange(file);
      }
    }
  }, []);

  return (
    <StyledDiv>
      <label htmlFor="png">
        {!icon && <UploadIcon width="20" height="20" />}
        {icon && <OrganizationLogo logo={icon} />}
      </label>
      <StyledInput
        type="file"
        id="png"
        accept=".png"
        onChange={onPngInputChange}
      />
    </StyledDiv>
  );
};

export { UploadPngInput };
