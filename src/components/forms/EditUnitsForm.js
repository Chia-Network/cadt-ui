import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  SelectTypeEnum,
  SelectSizeEnum,
  Select,
  Modal,
  Body,
  Tabs,
  Tab,
  TabPanel,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  ToolTipContainer,
  DescriptionIcon,
  Message
} from '..';
import LabelsRepeater from './LabelsRepeater';
import IssuanceRepeater from './IssuanceRepeater';
import { updateUnitsRecord } from '../../store/actions/climateWarehouseActions';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  correspondingAdjustmentDeclarationValues,
  correspondingAdjustmentStatusValues,
  unitStatusValues,
  unitTypeValues,
} from '../../utils/pick-values';
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

const EditUnitsForm = ({ onClose }) => {
  const { notification } = useSelector(state => state.app);
  const [labels, setLabelsRepeaterValues] = useState([]);
  const [issuance, setIssuance] = useState([]);
  const [editedUnits, setEditUnits] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const [unitType, setUnitType] = useState(null);
  const [unitStatus, setUnitStatus] = useState(null);
  const [
    selectedCorrespondingAdjustmentDeclaration,
    setSelectedCorrespondingAdjustmentDeclaration,
  ] = useState(null);
  const [
    selectedCorrespondingAdjustmentStatus,
    setSelectedCorrespondingAdjustmentStatus,
  ] = useState(null);

  const units = useSelector(state => state.climateWarehouse.units[0]);
  console.log(units);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setEditUnits({
      warehouseUnitId: units.warehouseUnitId,
      projectLocationId: units.projectLocationId,
      unitOwner: units.unitOwner,
      countryJurisdictionOfOwner: units.countryJurisdictionOfOwner,
      inCountryJurisdictionOfOwner: units.inCountryJurisdictionOfOwner,
      serialNumberBlock: units.serialNumberBlock,
      serialNumberPattern: units.serialNumberBlock,
      vintageYear: units.vintageYear,
      marketplace: units.marketplace,
      marketplaceLink: units.marketplaceLink,
      marketplaceIdentifier: units.marketplaceIdentifier,
      unitTags: units.unitTags,
      unitStatusReason: units.unitStatusReason,
      unitRegistryLink: units.unitRegistryLink,
    });
    setIssuance(_.get(units, 'issuance', {}));
    setLabelsRepeaterValues(_.get(units, 'labels', []));
  }, [units]);

  const handleEditUnits = () => {
    for (let key of Object.keys(editedUnits)) {
      if (editedUnits[key] === null || editedUnits[key] === '') {
        delete editedUnits[key];
      }
    }
    const dataToSend = _.cloneDeep(editedUnits);

    if (!_.isEmpty(issuance)) {
      for (let key of Object.keys(issuance[0])) {
        if (issuance[0][key] === '') {
          delete issuance[0][key];
        }
      }
      dataToSend.issuance = _.head(issuance);
    }

    if (!_.isEmpty(labels)) {
      for (let i = 0; i < labels.length; i++) {
        for (let key of Object.keys(labels[i])) {
          if (labels[i][key] === '') {
            delete labels[i][key];
          }
        }
      }
      dataToSend.labels = labels;
    }
    if (!_.isEmpty(unitType)) {
      dataToSend.unitType = unitType[0].value;
    }
    if (!_.isEmpty(unitStatus)) {
      dataToSend.unitStatus = unitStatus[0].value;
    }
    if (!_.isEmpty(selectedCorrespondingAdjustmentDeclaration)) {
      dataToSend.correspondingAdjustmentDeclaration =
        selectedCorrespondingAdjustmentDeclaration[0].value;
    }
    if (!_.isEmpty(selectedCorrespondingAdjustmentStatus)) {
      dataToSend.correspondingAdjustmentStatus =
        selectedCorrespondingAdjustmentStatus[0].value;
    }

    dispatch(updateUnitsRecord(dataToSend));
   
  };
console.log(notification)
  const unitWasSuccessfullyCreated =
    notification && notification.id === 'unit-successfully-edited';
  useEffect(() => {
    if (unitWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);
  return (
    <>
      {notification && !unitWasSuccessfullyCreated && (
        <Message id={notification.id} type={notification.type} />
      )}
      <Modal
        onOk={handleEditUnits}
        onClose={onClose}
        basic
        form
        showButtons
        title={intl.formatMessage({
          id: 'edit-unit',
        })}
        body={
          <div>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab
                label={intl.formatMessage({
                  id: 'unit',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'labels',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'issuance',
                })}
              />
            </Tabs>
            <div>
              <TabPanel
                style={{ paddingTop: '1.25rem' }}
                value={tabValue}
                index={0}>
                <ModalFormContainerStyle>
                  <FormContainerStyle>
                    <BodyContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="project-location-id" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-project-location-id-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'project-location-id',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.projectLocationId}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                projectLocationId: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="unit-owner" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-unit-owner-description',
                              })}>
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
                            value={editedUnits.unitOwner}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitOwner: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *
                            <LabelContainer>
                              <FormattedMessage id="country-jurisdiction-of-owner" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-country-jurisdiction-of-owner-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'country-jurisdiction-of-owner',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.countryJurisdictionOfOwner}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                countryJurisdictionOfOwner: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="in-country-jurisdiction-of-owner" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-in-country-jurisdiction-of-owner-description',
                              })}>
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
                            value={editedUnits.inCountryJurisdictionOfOwner}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                inCountryJurisdictionOfOwner: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *
                            <LabelContainer>
                              <FormattedMessage id="serial-number-block" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-serial-number-block-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'serial-number-block',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.serialNumberBlock}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                serialNumberBlock: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *
                            <LabelContainer>
                              <FormattedMessage id="serial-number-pattern" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-serial-number-pattern-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'serial-number-pattern',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.serialNumberPattern}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                serialNumberPattern: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body style={{ color: '#262626' }}>
                            *
                            <LabelContainer>
                              <FormattedMessage id="vintage-year" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-vintage-year-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'vintage-year',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.vintageYear}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                vintageYear: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *
                            <LabelContainer>
                              <FormattedMessage id="unit-type" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-unit-type-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <Select
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={unitTypeValues}
                            onChange={value => setUnitType(value)}
                            placeholder={`-- ${intl.formatMessage({
                              id: 'select',
                            })} --`}
                            selected={[
                              {
                                label: units.unitType,
                                value: units.unitType,
                              },
                            ]}
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="marketplace" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-marketplace-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'marketplace',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.marketplace}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                marketplace: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                    </BodyContainer>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="marketplace-link" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-marketplace-link-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'marketplace-link',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.marketplaceLink}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                marketplaceLink: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="marketplace-identifier" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-marketplace-identifier-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'marketplace-identifier',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.marketplaceIdentifier}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                marketplaceIdentifier: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="unit-tags" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-unit-tags-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-tags',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitTags}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitTags: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *
                            <LabelContainer>
                              <FormattedMessage id="unit-status" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-unit-status-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <Select
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={unitStatusValues}
                            onChange={value => setUnitStatus(value)}
                            placeholder={`-- ${intl.formatMessage({
                              id: 'select',
                            })} --`}
                            selected={[
                              {
                                label: units.unitStatus,
                                value: units.unitStatus,
                              },
                            ]}
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            <LabelContainer>
                              <FormattedMessage id="unit-status-reason" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-unit-status-reason-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-status-reason',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitStatusReason}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitStatusReason: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *
                            <LabelContainer>
                              <FormattedMessage id="unit-registry-link" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-unit-registry-link-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <StandardInput
                            size={InputSizeEnum.large}
                            placeholderText={intl.formatMessage({
                              id: 'unit-registry-link',
                            })}
                            state={InputStateEnum.default}
                            value={editedUnits.unitRegistryLink}
                            onChange={value =>
                              setEditUnits(prev => ({
                                ...prev,
                                unitRegistryLink: value,
                              }))
                            }
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *
                            <LabelContainer>
                              <FormattedMessage id="corresponding-adjustment-declaration" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-corresponding-adjustment-declaration-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <Select
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={correspondingAdjustmentDeclarationValues}
                            onChange={value =>
                              setSelectedCorrespondingAdjustmentDeclaration(
                                value,
                              )
                            }
                            placeholder={`-- ${intl.formatMessage({
                              id: 'select',
                            })} --`}
                            selected={[
                              {
                                label: units.correspondingAdjustmentDeclaration,
                                value: units.correspondingAdjustmentDeclaration,
                              },
                            ]}
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                      <StyledFieldContainer>
                        <StyledLabelContainer>
                          <Body color={'#262626'}>
                            *
                            <LabelContainer>
                              <FormattedMessage id="corresponding-adjustment-status" />
                            </LabelContainer>
                            <ToolTipContainer
                              tooltip={intl.formatMessage({
                                id: 'units-corresponding-adjustment-status-description',
                              })}>
                              <DescriptionIcon height="14" width="14" />
                            </ToolTipContainer>
                          </Body>
                        </StyledLabelContainer>
                        <InputContainer>
                          <Select
                            size={SelectSizeEnum.large}
                            type={SelectTypeEnum.basic}
                            options={correspondingAdjustmentStatusValues}
                            onChange={value =>
                              setSelectedCorrespondingAdjustmentStatus(value)
                            }
                            placeholder={`-- ${intl.formatMessage({
                              id: 'select',
                            })} --`}
                            selected={[
                              {
                                label: units.correspondingAdjustmentStatus,
                                value: units.correspondingAdjustmentStatus,
                              },
                            ]}
                          />
                        </InputContainer>
                      </StyledFieldContainer>
                    </div>
                  </FormContainerStyle>
                </ModalFormContainerStyle>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <LabelsRepeater
                  labelsState={labels}
                  newLabelsState={setLabelsRepeaterValues}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <IssuanceRepeater
                  max={1}
                  issuanceState={issuance}
                  newIssuanceState={setIssuance}
                />
              </TabPanel>
            </div>
          </div>
        }
      />
    </>
  );
};

export { EditUnitsForm };
