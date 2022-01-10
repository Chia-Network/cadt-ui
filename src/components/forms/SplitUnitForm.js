import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Modal,
  Body,
  InputSizeEnum,
  InputStateEnum,
  StandardInput,
  Select,
  SelectSizeEnum,
  SelectTypeEnum,
} from '..';

const InputContainer = styled('div')`
  width: 20rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 2.25rem;
`;

const StyledLabelContainer = styled('div')`
  padding: 0.3rem 0 0.3rem 0;
`;

const StyledContainer = styled('div')`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const StyledSplitEntry = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;

const SplitUnitForm = ({ onClose, organizations }) => {
  const [data, setData] = useState([
    { unitCount: null, orgUid: null },
    { unitCount: null, orgUid: null },
  ]);

  const intl = useIntl();

  const organizationsArray = Object.keys(organizations).map(key => ({
    value: key,
    label: organizations[key].name,
  }));

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
                <div>
                  <Body size="Bold">
                    <FormattedMessage id="record" /> {index + 1}
                  </Body>
                </div>
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
                  <Select
                    size={SelectSizeEnum.large}
                    type={SelectTypeEnum.basic}
                    options={organizationsArray}
                    placeholder="Select"
                    onChange={value =>
                      setData(prevData => {
                        const newData = [...prevData];
                        newData[index].orgUid = value[0].value;
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
