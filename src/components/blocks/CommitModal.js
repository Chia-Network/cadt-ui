import React from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import { Modal, modalTypeEnum, Body } from '../../components';

import { commitStagingData } from '../../store/actions/climateWarehouseActions';

const CommitModal = ({ onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const onCommit = () => {
    dispatch(commitStagingData('Projects'));
    onClose();
  };

  const onCommitAll = () => {
    dispatch(commitStagingData('all'));
    onClose();
  };

  return (
    <Modal
      title={intl.formatMessage({ id: 'commit-message' })}
      body={
        <div>
          this is where the field
          <Body size="Large">
            {intl.formatMessage({
              id: 'commit-projects-message-question',
            })}
          </Body>
        </div>
      }
      modalType={modalTypeEnum.basic}
      extraButtonLabel={intl.formatMessage({ id: 'everything' })}
      extraButtonOnClick={onCommitAll}
      onClose={() => onClose()}
      onOk={onCommit}
      label={intl.formatMessage({ id: 'only-projects' })}
    />
  );
};

export { CommitModal };
