import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Body,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  BodyContainer,
  LabelContainer,
  ToolTipContainer,
  DescriptionIcon,
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  SelectCreatable,
  SelectCreatableVariantEnum,
  SelectCreatableSizeEnum,
  FormikError,
  SpanTwoColumnsContainer,
} from '..';

import { StandardInput } from '../form/StandardInput';

const UnitSplitForm = ({
  index,
  name,
  errors,
  touched,
  value,
  setFieldValue,
  handleBlur,
}) => {
  const intl = useIntl();
  const { pickLists } = useSelector(store => store.climateWarehouse);
  const getFieldName = useCallback(
    fieldName => `${name}[${index}].${fieldName}`,
    [name, index],
  );

  return (
    <BodyContainer key={index}>
      <SpanTwoColumnsContainer>
        <StyledLabelContainer>
          <Body size="Bold">
            <FormattedMessage id="record" /> {index + 1}
          </Body>
        </StyledLabelContainer>
      </SpanTwoColumnsContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body>
            <LabelContainer>
              * <FormattedMessage id="nr-of-units" />
            </LabelContainer>
            <ToolTipContainer
              tooltip={intl.formatMessage({
                id: 'unit-count',
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
              id: 'nr-of-units',
            })}
            state={InputStateEnum.default}
            variant={
              touched?.unitCount && errors?.unitCount
                ? InputVariantEnum.error
                : InputVariantEnum.default
            }
            name={getFieldName('unitCount')}
            value={value.unitCount}
            onChange={value => setFieldValue(getFieldName('unitCount'), value)}
            onBlur={handleBlur}
          />
        </InputContainer>
        <FormikError name={getFieldName('unitCount')} />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body>
            <LabelContainer>
              <FormattedMessage id="unit-owner" />
            </LabelContainer>
            <ToolTipContainer
              tooltip={intl.formatMessage({
                id: 'units-unit-owner-description',
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
              id: 'unit-owner',
            })}
            state={InputStateEnum.default}
            variant={
              touched?.unitOwner && errors?.unitOwner
                ? InputVariantEnum.error
                : InputVariantEnum.default
            }
            name={getFieldName('unitOwner')}
            value={value.unitOwner}
            onChange={value => setFieldValue(getFieldName('unitOwner'), value)}
            onBlur={handleBlur}
          />
        </InputContainer>
        <FormikError name={getFieldName('unitOwner')} />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body>
            <LabelContainer>
              * <FormattedMessage id="unit-block-start" />
            </LabelContainer>
            <ToolTipContainer
              tooltip={intl.formatMessage({
                id: 'units-unit-block-start-description',
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
              id: 'unit-block-start',
            })}
            state={InputStateEnum.default}
            variant={
              touched?.unitBlockStart && errors?.unitBlockStart
                ? InputVariantEnum.error
                : InputVariantEnum.default
            }
            name={getFieldName('unitBlockStart')}
            value={value.unitBlockStart}
            onChange={value =>
              setFieldValue(getFieldName('unitBlockStart'), value)
            }
            onBlur={handleBlur}
          />
        </InputContainer>
        <FormikError name={getFieldName('unitBlockStart')} />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body>
            <LabelContainer>
              * <FormattedMessage id="unit-block-end" />
            </LabelContainer>
            <ToolTipContainer
              tooltip={intl.formatMessage({
                id: 'units-unit-block-end-description',
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
              id: 'unit-block-end',
            })}
            state={InputStateEnum.default}
            variant={
              touched?.unitBlockEnd && errors?.unitBlockEnd
                ? InputVariantEnum.error
                : InputVariantEnum.default
            }
            name={getFieldName('unitBlockEnd')}
            value={value.unitBlockEnd}
            onChange={value =>
              setFieldValue(getFieldName('unitBlockEnd'), value)
            }
            onBlur={handleBlur}
          />
        </InputContainer>
        <FormikError name={getFieldName('unitBlockEnd')} />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body>
            <LabelContainer>
              <FormattedMessage id="country-jurisdiction-of-owner" />
            </LabelContainer>
            <ToolTipContainer
              tooltip={intl.formatMessage({
                id: 'units-country-jurisdiction-of-owner-description',
              })}
            >
              <DescriptionIcon height="14" width="14" />
            </ToolTipContainer>
          </Body>
        </StyledLabelContainer>
        <InputContainer>
          <SelectCreatable
            variant={SelectCreatableVariantEnum.default}
            size={SelectCreatableSizeEnum.large}
            onBlur={handleBlur}
            options={pickLists.countries}
            selected={value?.countryJurisdictionOfOwner}
            onChange={value =>
              setFieldValue(getFieldName('countryJurisdictionOfOwner'), value)
            }
            isClearable
          />
        </InputContainer>
        <FormikError name={getFieldName('countryJurisdictionOfOwner')} />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body>
            <LabelContainer>
              <FormattedMessage id="in-country-jurisdiction-of-owner" />
            </LabelContainer>
            <ToolTipContainer
              tooltip={intl.formatMessage({
                id: 'units-in-country-jurisdiction-of-owner-description',
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
              id: 'in-country-jurisdiction-of-owner',
            })}
            state={InputStateEnum.default}
            variant={
              touched?.inCountryJurisdictionOfOwner &&
              errors?.inCountryJurisdictionOfOwner
                ? InputVariantEnum.error
                : InputVariantEnum.default
            }
            name={getFieldName('inCountryJurisdictionOfOwner')}
            value={value.inCountryJurisdictionOfOwner}
            onChange={value =>
              setFieldValue(getFieldName('inCountryJurisdictionOfOwner'), value)
            }
            onBlur={handleBlur}
          />
        </InputContainer>
        <FormikError name={getFieldName('inCountryJurisdictionOfOwner')} />
      </StyledFieldContainer>
    </BodyContainer>
  );
};

export { UnitSplitForm };
