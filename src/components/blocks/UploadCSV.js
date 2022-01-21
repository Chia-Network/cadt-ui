import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { UploadIcon } from '../../components';
// import constants from '../../constants';
import { uploadCSVFile } from '../../store/actions/climateWarehouseActions';

const StyledInput = styled('input')`
  visibility: hidden;
  width: 0px;
  height: 0px;
`;

const UploadCSV = ({ type }) => {
  const dispatch = useDispatch();

  const onChange = e => {
    if (e.target.value && e.target.value !== '' && type) {
      const fileNameIsValid = /\.csv$/.test(e.target.value);
      if (fileNameIsValid) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('csv', file);
        // console.log('file captured by input: ', file);
        dispatch(uploadCSVFile(file, type));
      }
    }
  };

  return (
    <>
      <label htmlFor="csv">
        <UploadIcon width="16" height="16" />
      </label>
      <StyledInput type="file" id="csv" accept=".csv" onChange={onChange} />
    </>
  );
};

export { UploadCSV };
