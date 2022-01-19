import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { UploadIcon } from '../../components';
import constants from '../../constants';
import {
  setNotificationMessage,
  NotificationMessageTypeEnum,
} from '../../store/actions/app';

const StyledInput = styled('input')`
  visibility: hidden; 
  width: 0px;
  height: 0px;
`;

const StyledIframe = styled('iframe')`
  width: 0px;
  height: 0px;
`;

const UploadCSV = ({ type }) => {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const onChange = (e) => {
    if (e.target.value && e.target.value !== '' && formRef && formRef.current) {
      const fileNameIsValid = /\.csv$/.test(e.target.value);
      if (fileNameIsValid) {
        try {
          formRef.current.submit();
        } catch (e) {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.error,
              'file-could-not-be-uploaded',
            ),
          );
        } finally {
          dispatch(
            setNotificationMessage(
              NotificationMessageTypeEnum.success,
              'upload-successful',
            ),
          );
        }
      }
    }
  };

  let url;
  if (type === 'projects') {
    url = `${constants.API_HOST}/projects/batch`;
  } else {
    url = `${constants.API_HOST}/units/batch`;
  }

  return (
    <form
      action={url}
      ref={formRef}
      encType="multipart/form-data"
      method="post"
      target="iframe">
      <label htmlFor="csv">
        <UploadIcon width="16" height="16" />
      </label>
      <StyledInput
        type="file"
        id="csv"
        name="csv"
        accept=".csv"
        onChange={onChange}
      />
      <StyledIframe name="iframe" hidden />
    </form>
  );
};

export { UploadCSV };
