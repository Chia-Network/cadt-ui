import u from 'updeep';
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Divider,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Body,
  ToolTipContainer,
} from '..';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;

const InputContainer = styled('div')`
  width: 20rem;
`;

const CreateProjectLocationsForm = ({ value, onChange }) => {
  const intl = useIntl();

  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'locations-in-country-region-description',
                  })}>
                  <FormattedMessage id="in-country-region" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'in-country-region',
                })}
                state={InputStateEnum.default}
                value={value.countryRegion}
                onChange={changeValue =>
                  onInputChange('countryRegion', changeValue)
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'locations-country-description',
                  })}>
                <FormattedMessage id="host-country" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'host-country',
                })}
                state={InputStateEnum.default}
                value={value.country}
                onChange={changeValue => onInputChange('country', changeValue)}
              />
            </InputContainer>
          </StyledFieldContainer>
        </BodyContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateProjectLocationsForm };
