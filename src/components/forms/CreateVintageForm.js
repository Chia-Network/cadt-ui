import _ from 'lodash';
import u from 'updeep';
import React, { useState, useMemo, useEffect } from 'react';
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
  DateSelect,
  Select,
  SelectTypeEnum,
  SelectSizeEnum,
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

const CreateVintageForm = ({ value, unitId, onChange }) => {
  const intl = useIntl();
  const [selectedVintage, setSelectedVintage] = useState();
  const climateWarehouseStore = useSelector(state => state.climateWarehouse);

  useEffect(() => {
    const initalVintage = climateWarehouseStore.units.find(
      unit => unit.warehouseUnitId === unitId,
    );
    if (initalVintage) {
      setSelectedVintage(initalVintage);
    }
  }, [unitId]);

  const inputDisable = () => {
    if (_.has(selectedVintage, 'id')) {
      return InputStateEnum.focused;
    } else {
      return InputStateEnum.default;
    }
  };

  const vintageOptions = useMemo(() => {
    const vintages = climateWarehouseStore.vintages;
    return vintages.map(vintage => ({ label: vintage.id, value: vintage }));
  }, [climateWarehouseStore]);

  const onInputChange = (field, changeValue) => {
    onChange(u({ [field]: changeValue }, value));
  };

  const onSelectVintage = value => {
    setSelectedVintage(null);
    setSelectedVintage(value[0].value);
    onChange(value[0].value);
  };

  return (
    <ModalFormContainerStyle>
      <FormContainerStyle>
        <BodyContainer>
          <div style={{ marginBottom: '0.6rem' }}>
            <Select
              size={SelectSizeEnum.large}
              width="320px"
              type={SelectTypeEnum.basic}
              options={[...vintageOptions, { label: 'New', value: value }]}
              onChange={value => onSelectVintage(value)}
            />
          </div>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="start-date" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={_.get(selectedVintage, 'startDate', value.startDate)}
                setDateValue={changeValue =>
                  onInputChange('startDate', changeValue)
                }
                disabled={_.has(selectedVintage, 'id')}
                disableOpenPicker={_.has(selectedVintage, 'id')}
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="end-date" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                size="large"
                dateValue={_.get(selectedVintage, 'endDate', value.endDate)}
                setDateValue={changeValue =>
                  onInputChange('endDate', changeValue)
                }
                disabled={_.has(selectedVintage, 'id')}
                disableOpenPicker={_.has(selectedVintage, 'id')}
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="verification-approach" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                disabled={_.has(selectedVintage, 'id')}
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'verification-approach',
                })}
                state={inputDisable()}
                value={_.get(
                  selectedVintage,
                  'verificationApproach',
                  value.verificationApproach,
                )}
                onChange={changeValue =>
                  onInputChange('verificationApproach', changeValue)
                }
              />
            </InputContainer>
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="verification-date" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <DateSelect
                disabled={_.has(selectedVintage, 'id')}
                disableOpenPicker={_.has(selectedVintage, 'id')}
                size="large"
                dateValue={_.get(
                  selectedVintage,
                  'verificationDate',
                  value.verificationDate,
                )}
                setDateValue={changeValue =>
                  onInputChange('verificationDate', changeValue)
                }
              />
            </InputContainer>
          </StyledFieldContainer>
        </BodyContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledFieldContainer>
            <StyledLabelContainer>
              <Body style={{ color: '#262626' }}>
                <FormattedMessage id="verification-body" />
              </Body>
            </StyledLabelContainer>
            <InputContainer>
              <StandardInput
                disabled={_.has(selectedVintage, 'id')}
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'verification-body',
                })}
                state={inputDisable()}
                value={_.get(
                  selectedVintage,
                  'verificationBody',
                  value.verificationBody,
                )}
                onChange={changeValue =>
                  onInputChange('verificationBody', changeValue)
                }
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
                disabled={_.has(selectedVintage, 'id')}
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'project-id',
                })}
                state={inputDisable()}
                value={_.get(
                  selectedVintage,
                  'warehouseProjectId',
                  value.warehouseProjectId,
                )}
                onChange={changeValue =>
                  onInputChange('warehouseProjectId', changeValue)
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
                disabled={_.has(selectedVintage, 'id')}
                size={InputSizeEnum.large}
                placeholderText={intl.formatMessage({
                  id: 'unit-id',
                })}
                state={inputDisable()}
                value={_.get(selectedVintage, 'unitId', value.unitId)}
                onChange={changeValue => onInputChange('unitId', changeValue)}
              />
            </InputContainer>
          </StyledFieldContainer>
        </div>
      </FormContainerStyle>
      <Divider />
    </ModalFormContainerStyle>
  );
};

export { CreateVintageForm };
