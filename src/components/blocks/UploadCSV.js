import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { UploadIcon } from '../../components';
import constants from '../../constants';
import {
  setNotificationMessage,
  NotificationMessageTypeEnum,
} from '../../store/actions/app';

const UploadCSV = ({ type }) => {
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const onChange = () => {
    if (inputRef && inputRef.current && formRef && formRef.current) {
      const fileName = inputRef.current.files[0].name;
      const fileNameIsValid = /\.csv$/.test(fileName);
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
      method="post">
      <label htmlFor="csv">
        <UploadIcon width="16" height="16" />
      </label>
      <input
        ref={inputRef}
        type="file"
        id="csv"
        name="csv"
        style={{ visibility: 'hidden', width: '0px' }}
        accept=".csv"
        onChange={onChange}
      />
    </form>
  );
};

export { UploadCSV };
