import React, { useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Modal, Body, InputSizeEnum, InputStateEnum, StandardInput } from '..';

const InputContainer = styled('div')`
  width: 20rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;

const StyledSplitEntry = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const SplitUnitForm = ({ onClose }) => {
  const [data, setData] = useState([
    { unitCount: null, orgUid: null },
    { unitCount: null, orgUid: null },
  ]);

  const intl = useIntl();

  return (
    <Modal
      onOk={() => {
        console.log('ok');
      }}
      onClose={onClose}
      basic
      form
      showButtons
      title={intl.formatMessage({
        id: 'split',
      })}
      body={
        <StyledContainer>
          {data.map((item, index) => (
            <StyledSplitEntry key={index}>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body color={'#262626'}>
                    <FormattedMessage id="nr-of-units" />
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    state={InputStateEnum.default}
                    value={item.unitCount}
                    onChange={value =>
                      setData(prevData => {
                        const newData = [...prevData];
                        newData[index].unitCount = value;
                        return newData;
                      })
                    }
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body color={'#262626'}>
                    <FormattedMessage id="units-owner" />
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    state={InputStateEnum.default}
                    value={item.orgUid}
                    onChange={value =>
                      setData(prevData => {
                        const newData = [...prevData];
                        newData[index].orgUid = value;
                        return newData;
                      })
                    }
                  />
                </InputContainer>
              </StyledFieldContainer>
            </StyledSplitEntry>
          ))}
        </StyledContainer>
      }
    />
  );
};

export { SplitUnitForm };
