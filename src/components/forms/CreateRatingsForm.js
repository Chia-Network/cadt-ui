import u from 'updeep';
import React, { useMemo, useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import {
  StandardInput,
  InputSizeEnum,
  InputVariantEnum,
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
  SelectVariantEnum,
  Select,
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  SpanTwoColumnsContainer,
} from '..';

import { ratingSchema } from '../../store/validations';
import { setValidationErrors } from '../../utils/validationUtils';

const CreateRatingsForm = ({ value, onChange }) => {
  const [errorRatingMessage, setErrorRatingMessage] = useState({});
  const { validateForm, formType } = useSelector(state => state.app);
  const intl = useIntl();
  const { pickLists } = useSelector(store => store.climateWarehouse);

  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  const selectRatingTypeOptions = useMemo(
    () =>
      pickLists.ratingType.map(ratingTypeItem => ({
        value: ratingTypeItem,
        label: ratingTypeItem,
      })),
    [pickLists],
  );

  useEffect(() => {
    if(validateForm && formType === 'ratings'){
    setValidationErrors(ratingSchema, value, setErrorRatingMessage);
    }
  }, [value, validateForm, formType]);

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="rating-type" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'ratings-rating-type-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <Select
                variant={
                  errorRatingMessage?.ratingType && SelectVariantEnum.error
                }
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectRatingTypeOptions}
                state={SelectStateEnum.default}
                selected={
                  value.ratingType
                    ? [{ value: value.ratingType, label: value.ratingType }]
                    : undefined
                }
                onChange={selectedOptions =>
                  onInputChange('ratingType', selectedOptions[0].value)
                }
              />
            </InputContainer>
            {errorRatingMessage?.ratingType && (
              <Body size="Small" color="red">
                {errorRatingMessage.ratingType}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="rating" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'ratings-rating-value-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorRatingMessage?.rating
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'rating',
                })}
                state={InputStateEnum.default}
                value={value.rating}
                onChange={changeValue =>
                  onInputChange('rating', changeValue.toString())
                }
              />
            </InputContainer>
            {errorRatingMessage?.rating && (
              <Body size="Small" color="red">
                {errorRatingMessage.rating}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="rating-range-highest" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'ratings-rating-range-highest-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorRatingMessage?.ratingRangeHighest
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'rating-range-highest',
                })}
                state={InputStateEnum.default}
                value={value.ratingRangeHighest}
                onChange={changeValue =>
                  onInputChange('ratingRangeHighest', changeValue.toString())
                }
              />
            </InputContainer>
            {errorRatingMessage?.ratingRangeHighest && (
              <Body size="Small" color="red">
                {errorRatingMessage.ratingRangeHighest}
              </Body>
            )}
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  *<FormattedMessage id="rating-range-lowest" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'ratings-rating-range-lowest-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorRatingMessage?.ratingRangeLowest
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'rating-range-lowest',
                })}
                state={InputStateEnum.default}
                value={value.ratingRangeLowest}
                onChange={changeValue =>
                  onInputChange('ratingRangeLowest', changeValue.toString())
                }
              />
            </InputContainer>
            {errorRatingMessage?.ratingRangeLowest && (
              <Body size="Small" color="red">
                {errorRatingMessage.ratingRangeLowest}
              </Body>
            )}
          </StyledFieldContainer>
          <SpanTwoColumnsContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="rating-link" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'ratings-rating-report-link-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <StandardInput
                variant={
                  errorRatingMessage?.ratingLink
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'rating-link',
                })}
                state={InputStateEnum.default}
                value={value.ratingLink}
                onChange={changeValue =>
                  onInputChange('ratingLink', changeValue)
                }
              />
              {errorRatingMessage?.ratingLink && (
                <Body size="Small" color="red">
                  {errorRatingMessage.ratingLink}
                </Body>
              )}
            </StyledFieldContainer>
          </SpanTwoColumnsContainer>
        </BodyContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateRatingsForm };
