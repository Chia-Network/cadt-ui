import u from 'updeep';
import React, { useState, useEffect } from 'react';
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
  SimpleSelect,
  SimpleSelectSizeEnum,
  SimpleSelectTypeEnum,
  SimpleSelectStateEnum,
} from '..';

import { setValidationErrors } from '../../utils/validationUtils';
import { locationSchema } from '../../store/validations';

const CreateLocationsForm = ({ value, onChange }) => {
  const [errorLocationMessage, setErrorLocationMessage] = useState({});
  const intl = useIntl();
  const { pickLists } = useSelector(store => store.climateWarehouse);
  const { validateForm, formType } = useSelector(state => state.app);

  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  useEffect(() => {
    if (validateForm && formType === 'project-locations') {
      setValidationErrors(locationSchema, value, setErrorLocationMessage);
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
                  *<FormattedMessage id="host-country" />
                </LabelContainer>
                <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'locations-country-description',
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <SimpleSelect
                variant={
                  errorLocationMessage?.country && SimpleSelectVariantEnum.error
                }
                size={SimpleSelectSizeEnum.large}
                type={SimpleSelectTypeEnum.basic}
                options={pickLists.countries}
                state={SimpleSelectStateEnum.default}
                selected={value.country ? [value.country] : undefined}
                onChange={selectedOptions =>
                  onInputChange('country', selectedOptions[0])
                }
              />

              {errorLocationMessage?.country && (
                <Body size="Small" color="red">
                  {errorLocationMessage.country}
                </Body>
              )}
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
                  id: 'in-country-region',
                })}
                state={InputStateEnum.default}
                value={value.inCountryRegion}
                onChange={changeValue =>
                  onInputChange('inCountryRegion', changeValue)
                }
              />
              {errorLocationMessage?.inCountryRegion && (
                <Body size="Small" color="red">
                  {errorLocationMessage.inCountryRegion}
                </Body>
              )}
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
                  })}
                >
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer>
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                variant={
                  errorLocationMessage?.geographicIdentifier
                    ? InputVariantEnum.error
                    : undefined
                }
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'geographic-identifier',
                })}
                state={InputStateEnum.default}
                value={value.geographicIdentifier}
                onChange={changeValue =>
                  onInputChange('geographicIdentifier', changeValue)
                }
              />
              {errorLocationMessage?.geographicIdentifier && (
                <Body size="Small" color="red">
                  {errorLocationMessage.geographicIdentifier}
                </Body>
              )}
            </InputContainer>
          </StyledFieldContainer>
        </BodyContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateLocationsForm };
