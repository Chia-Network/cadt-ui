import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import {
  Modal,
  modalTypeEnum,
  StyledFieldContainer,
  InputContainer,
  StandardInput,
  InputSizeEnum,
  InputVariantEnum,
} from '../../components';

import { commitStagingData } from '../../store/actions/climateWarehouseActions';

const CommitModal = ({ onClose, modalFor }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [commitMessage, setCommitMessage] = useState('');

  const onCommit = () => {
    dispatch(commitStagingData('Projects', commitMessage));
    onClose();
  };

  const onCommitAll = () => {
    dispatch(commitStagingData('all', commitMessage));
    onClose();
  };

  return (
    <Modal
      title={intl.formatMessage({
        id:
          modalFor === 'projects'
            ? 'commit-projects-message-question'
            : 'commit-units-message-question',
      })}
      body={
        <div>
          <StyledFieldContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                variant={InputVariantEnum.default}
                value={commitMessage}
                onChange={value => setCommitMessage(value)}
                placeholderText={intl.formatMessage({
                  id: 'commit-message',
                })}
              />
            </InputContainer>
          </StyledFieldContainer>
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
