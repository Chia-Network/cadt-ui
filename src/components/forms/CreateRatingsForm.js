import u from 'updeep';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

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
  LabelContainer,
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  Select,
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

const CreateRatingsForm = ({ value, onChange }) => {
  const intl = useIntl();
  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };
  const { pickLists } = useSelector(store => store.climateWarehouse);

  const selectRatingTypeOptions = useMemo(
    () =>
      pickLists.ratingType.map(country => ({
        value: country,
        label: country,
      })),
    [pickLists],
  );

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="id" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'ratings-id-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'id',
                })}
                state={InputStateEnum.default}
                value={value.id}
                onChange={changeValue => onInputChange('id', changeValue)}
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="rating-type" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'ratings-rating-type-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <Select
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectRatingTypeOptions}
                state={SelectStateEnum.default}
                placeholder={intl.formatMessage({
                  id: 'rating-type',
                })}
                selected={
                  value.ratingType
                    ? { value: value.ratingType, label: value.ratingType }
                    : undefined
                }
                onChange={selectedOptions =>
                  onInputChange('ratingType', selectedOptions[0].value)
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="rating-range-highest" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'ratings-rating-range-highest-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'rating-range-highest',
                })}
                state={InputStateEnum.default}
                value={value.ratingRangeHighest}
                onChange={changeValue =>
                  onInputChange('ratingRangeHighest', changeValue)
                }
              />
            </InputContainer>
          </StyledFieldContainer>
        </BodyContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="rating-range-lowest" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'ratings-rating-range-lowest-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'rating-range-lowest',
                })}
                state={InputStateEnum.default}
                value={value.ratingRangeLowest}
                onChange={changeValue =>
                  onInputChange('ratingRangeLowest', changeValue)
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="rating" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'ratings-rating-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'rating',
                })}
                state={InputStateEnum.default}
                value={value.rating}
                onChange={changeValue => onInputChange('rating', changeValue)}
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="rating-link" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'ratings-rating-link-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'rating-link',
                })}
                state={InputStateEnum.default}
                value={value.ratingLink}
                onChange={changeValue =>
                  onInputChange('rating-link', changeValue)
                }
              />
            </InputContainer>
          </StyledFieldContainer>
        </div>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateRatingsForm };
