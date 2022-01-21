import React from 'react';
import styled from 'styled-components';
import { useIntl, FormattedMessage } from 'react-intl';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  Divider,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Body,
  DateSelect,
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

const CreateQualificationsForm = ({ value, onChange }) => {
  const intl = useIntl();

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="qualification-id" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'qualification-id',
                })}
                state={InputStateEnum.default}
                value={value.qualificationId}
                onChange={event => {
                  onChange({ ...value, qualificationId: event });
                }}
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="qualification-link" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'qualification-link',
                })}
                state={InputStateEnum.default}
                value={value.qualificationLink}
                onChange={event => {
                  onChange({ ...value, qualificationLink: event });
                }}
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="project-id" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({ id: 'project-id' })}
                state={InputStateEnum.default}
                value={value.projectId}
                onChange={event => {
                  onChange({ ...value, projectId: event });
                }}
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="type" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'type',
                })}
                state={InputStateEnum.default}
                value={value.type}
                onChange={event => {
                  onChange({ ...value, type: event });
                }}
              />
            </InputContainer>
          </StyledFieldContainer>
        </BodyContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="label" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({ id: 'label' })}
                state={InputStateEnum.default}
                value={value.label}
                onChange={event => {
                  onChange({ ...value, label: event });
                }}
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="crediting-period-start-date" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={value.creditingPeriodStartDate}
                setDateValue={changeValue =>
                  onChange({ ...value, creditingPeriodStartDate: changeValue })
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="crediting-period-end-date" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={value.creditingPeriodEndDate}
                setDateValue={changeValue =>
                  onChange({ ...value, creditingPeriodEndDate: changeValue })
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="unit-id" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-id',
                })}
                state={InputStateEnum.default}
                value={value.unitId}
                onChange={event => {
                  onChange({ ...value, unitId: event });
                }}
              />
            </InputContainer>
          </StyledFieldContainer>
        </div>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateQualificationsForm };
