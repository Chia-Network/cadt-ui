import React, { memo, useCallback } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { FormikError } from '../form/FormikError';

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
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  SpanTwoColumnsContainer,
  SimpleSelectVariantEnum,
  SelectCreatable
} from '..';

// eslint-disable-next-line react/display-name
const ProjectRatingForm = memo(
  ({ index, name, errors, touched, value, setFieldValue, handleBlur }) => {
    const intl = useIntl();
    const { pickLists } = useSelector(store => store.climateWarehouse);
    const getFieldName = useCallback(
      fieldName => `${name}[${index}].${fieldName}`,
      [index, name],
    );

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
                <SelectCreatable
                  variant={
                    errors?.ratingType &&
                    touched?.ratingType &&
                    SimpleSelectVariantEnum.error
                  }
                  options={pickLists.ratingType}
                  selected={value.ratingType}
                  onChange={val =>
                    setFieldValue(getFieldName('ratingType'), val)
                  }
                  onBlur={handleBlur}
                />
              </InputContainer>
              <FormikError name={getFieldName('ratingType')} />
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
                    errors?.rating && touched?.rating
                      ? InputVariantEnum.error
                      : undefined
                  }
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'rating',
                  })}
                  state={InputStateEnum.default}
                  value={value.rating}
                  onChange={value =>
                    setFieldValue(getFieldName('rating'), value.toString())
                  }
                  onBlur={handleBlur}
                  name={getFieldName('rating')}
                />
              </InputContainer>
              <FormikError name={getFieldName('rating')} />
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
                    errors?.ratingRangeHighest && touched?.ratingRangeHighest
                      ? InputVariantEnum.error
                      : undefined
                  }
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'rating-range-highest',
                  })}
                  state={InputStateEnum.default}
                  value={value.ratingRangeHighest}
                  onChange={value =>
                    setFieldValue(
                      getFieldName('ratingRangeHighest'),
                      value.toString(),
                    )
                  }
                  onBlur={handleBlur}
                  name={getFieldName('ratingRangeHighest')}
                />
              </InputContainer>
              <FormikError name={getFieldName('ratingRangeHighest')} />
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
                    errors?.ratingRangeLowest && touched?.ratingRangeLowest
                      ? InputVariantEnum.error
                      : undefined
                  }
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'rating-range-lowest',
                  })}
                  state={InputStateEnum.default}
                  value={value.ratingRangeLowest}
                  onChange={value =>
                    setFieldValue(
                      getFieldName('ratingRangeLowest'),
                      value.toString(),
                    )
                  }
                  onBlur={handleBlur}
                  name={getFieldName('ratingRangeLowest')}
                />
              </InputContainer>
              <FormikError name={getFieldName('ratingRangeLowest')} />
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
                    errors?.ratingLink && touched?.ratingLink
                      ? InputVariantEnum.error
                      : undefined
                  }
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'rating-link',
                  })}
                  state={InputStateEnum.default}
                  value={value.ratingLink}
                  onChange={value =>
                    setFieldValue(getFieldName('ratingLink'), value)
                  }
                  onBlur={handleBlur}
                  name={getFieldName('ratingLink')}
                />
                <FormikError name={getFieldName('ratingLink')} />
              </StyledFieldContainer>
            </SpanTwoColumnsContainer>
          </BodyContainer>
        </FormContainerStyle>
        <Divider />
      </ModalFormContainerStyle>
    );
  },
);

export { ProjectRatingForm };
