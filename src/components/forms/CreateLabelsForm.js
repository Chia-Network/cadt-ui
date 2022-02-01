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
  DescriptionIcon,
  ToolTipContainer,
  DateSelect,
} from '..';
import { LabelContainer } from '../../utils/compUtils';

const StyledLabelContainer = styled('div')`
  margin-bottom: 0.5rem;
`;

const StyledFieldContainer = styled('div')`
  padding-bottom: 1.25rem;
`;

const InputContainer = styled('div')`
  width: 20rem;
`;

const CreateLabelsForm = ({ value, onChange }) => {
  const intl = useIntl();

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="label" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-label-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'label',
                })}
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
                <LabelContainer>
                  <FormattedMessage id="label-type" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-label-type-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'label-type',
                })}
                state={InputStateEnum.default}
                value={value.labelType}
                onChange={event => {
                  onChange({ ...value, labelType: event });
                }}
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="crediting-period-start-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-crediting-period-start-date-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={value.creditingPeriodStartDate}
                setDateValue={event =>
                  onChange({ ...value, creditingPeriodStartDate: event })
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="crediting-period-end-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-crediting-period-end-date-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={value.creditingPeriodEndDate}
                setDateValue={event =>
                  onChange({ ...value, creditingPeriodEndDate: event })
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="validity-period-start-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-validity-period-start-date-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={value.validityPeriodStartDate}
                setDateValue={event =>
                  onChange({ ...value, validityPeriodStartDate: event })
                }
              />
            </InputContainer>
          </StyledFieldContainer>
        </BodyContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="validity-period-end-date" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-validity-period-end-date-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={value.validityPeriodEndDate}
                setDateValue={event =>
                  onChange({ ...value, validityPeriodEndDate: event })
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="unit-quantity" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-unit-quantity-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                type="number"
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-quantity',
                })}
                state={InputStateEnum.default}
                value={value.unitQuantity}
                onChange={event => {
                  onChange({ ...value, unitQuantity: event });
                }}
              />
            </InputContainer>
          </StyledFieldContainer>

          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <LabelContainer>
                  <FormattedMessage id="label-link" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'labels-label-link-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'label-link',
                })}
                state={InputStateEnum.default}
                value={value.labelLink}
                onChange={event => {
                  onChange({ ...value, labelLink: event });
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

export { CreateLabelsForm };
