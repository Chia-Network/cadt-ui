import React, { useCallback } from 'react';
import styled from 'styled-components';

import { UploadIcon, SuccessIcon } from '..';

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

const UploadFileInput = ({ file, onChange }) => {
  const onFileInputChange = useCallback(e => {
    if (e.target.value && e.target.value !== '') {
      const file = e.target.files[0];
      onChange(file);
    }
  }, []);

  return (
    <StyledDiv>
      <label htmlFor="file">
        {!file && <UploadIcon width="20" height="20" />}
        {file && <SuccessIcon width="20" height="20" />}
      </label>
      <StyledInput type="file" id="file" onChange={onFileInputChange} />
    </StyledDiv>
  );
};

export { UploadFileInput };
