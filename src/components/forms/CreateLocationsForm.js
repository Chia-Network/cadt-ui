import u from 'updeep';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
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
  DescriptionIcon,
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

const CreateLocationsForm = ({ value, onChange }) => {
  const intl = useIntl();
  const { pickLists } = useSelector(store => store.climateWarehouse);

  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  const selectCountriesOptions = useMemo(
    () =>
      pickLists.countries.map(country => ({
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
                  <FormattedMessage id="host-country" />
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
              <Select
                size={SelectSizeEnum.large}
                type={SelectTypeEnum.basic}
                options={selectCountriesOptions}
                selected={
                  value.country
                    ? { value: value.country, label: value.country }
                    : undefined
                }
                state={SelectStateEnum.default}
                placeholder={intl.formatMessage({
                  id: 'host-country',
                })}
                onChange={selectedOptions =>
                  onInputChange('country', selectedOptions[0].value)
                }
              />
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
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body>
                <LabelContainer>
                  <FormattedMessage id="geographic-identifier" />
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
            </InputContainer>
          </StyledFieldContainer>
        </BodyContainer>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateLocationsForm };
