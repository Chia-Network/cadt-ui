import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';

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
  ToolTipContainer,
  DescriptionIcon,
  LabelContainer,
  SimpleSelectVariantEnum,
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  SelectCreatable,
  FormikError,
} from '..';

// eslint-disable-next-line react/display-name
const ProjectLocationForm = memo(
  ({ index, name, errors, touched, value, setFieldValue, handleBlur }) => {
    const intl = useIntl();
    const getFieldName = useCallback(
      fieldName => `${name}[${index}].${fieldName}`,
      [index, name],
    );
    const { pickLists } = useSelector(store => store.climateWarehouse);

    return (
      <ModalFormContainerStyle>
        <FormContainerStyle>
          <BodyContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="host-country" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'locations-country-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <SelectCreatable
                  variant={
                    errors?.country &&
                    touched?.country &&
                    SimpleSelectVariantEnum.error
                  }
                  options={pickLists.countries}
                  selected={value.country}
                  onChange={val => setFieldValue(getFieldName('country'), val)}
                  onBlur={handleBlur}
                />
                <FormikError name={getFieldName('country')} />
              </InputContainer>
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    <FormattedMessage id="in-country-region" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'locations-in-country-region-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
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
                  value={value.inCountryRegion}
                  onChange={value =>
                    setFieldValue(getFieldName('inCountryRegion'), value)
                  }
                  onBlur={handleBlur}
                  name={getFieldName('inCountryRegion')}
                />
                <FormikError name={getFieldName('inCountryRegion')} />
              </InputContainer>
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="geographic-identifier" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'locations-geographic-identifier-description',
                    })}>
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  variant={
                    errors?.geographicIdentifier &&
                    touched?.geographicIdentifier
                      ? InputVariantEnum.error
                      : undefined
                  }
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'geographic-identifier',
                  })}
                  state={InputStateEnum.default}
                  value={value.geographicIdentifier}
                  onChange={value =>
                    setFieldValue(getFieldName('geographicIdentifier'), value)
                  }
                  onBlur={handleBlur}
                  name={getFieldName('geographicIdentifier')}
                />
                <FormikError name={getFieldName('geographicIdentifier')} />
              </InputContainer>
            </StyledFieldContainer>
          </BodyContainer>
        </FormContainerStyle>
        <Divider />
      </ModalFormContainerStyle>
    );
  },
);

export { ProjectLocationForm };
