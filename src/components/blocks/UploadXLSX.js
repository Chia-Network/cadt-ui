import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { UploadIcon } from '..';
import { uploadXLSXFile } from '../../store/actions/climateWarehouseActions';

const StyledInput = styled('input')`
  visibility: hidden;
  width: 0px;
  height: 0px;
`;

const UploadXLSX = ({ type }) => {
  const dispatch = useDispatch();

  const onChange = e => {
    if (e.target.value && e.target.value !== '' && type) {
      const fileNameIsValid = /\.xlsx$/.test(e.target.value);
      if (fileNameIsValid) {
        const file = e.target.files[0];
        dispatch(uploadXLSXFile(file, type));
      }
      e.target.value = '';
    }
  };

  return (
    <>
      <label htmlFor="xlsx">
        <UploadIcon width="20" height="20" />
      </label>
      <StyledInput type="file" id="xlsx" accept=".xlsx" onChange={onChange} />
    </>
  );
};

export { UploadXLSX };
