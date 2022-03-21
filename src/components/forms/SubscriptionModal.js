import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';

import {
  Modal,
  Body,
  InputSizeEnum,
  StandardInput,
  InputVariantEnum,
  modalTypeEnum,
  InputContainer,
  StyledFieldContainer,
  StyledLabelContainer,
  ModalFormContainerStyle,
} from '..';
import { getOrganizationData } from '../../store/actions/climateWarehouseActions';
import { PrimaryButton } from '../form/PrimaryButton';

const dummyData = {
  'f1c54511-865e-4611-976c-7c3c1f704662': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: true,
    name: 'Adidas',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f704663': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Nike',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f704664': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Asics',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: false,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f704665': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'New Ballance',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: false,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f704666': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Puma',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f704667': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Reebok',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f704668': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Under Armour',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f704669': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Sprandi',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f70466a': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Decathlon',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f70466g': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Oliver',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f70466b': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Polo Ralph Lauren',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f70466c': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Dolce & Gabbana',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f70466d': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Calvin Klein',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f70466e': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Foot Locker Inc.	',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
  'f1c54511-865e-4611-976c-7c3c1f70466f': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ep" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"></path></svg>',
    isHome: false,
    name: 'Tiffany & Co.',
    orgUid: 'f1c54511-865e-4611-976c-7c3c1f704662',
    subscribed: true,
    xchAddress: 'xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS',
  },
};

console.log(Object.keys(dummyData));

const StyledSubscriptionsListContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const StyledSubscriptionContainer = styled('div')`
  border: 1px solid #d9d9d9;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SubscriptionModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    svg: null,
  });
  const intl = useIntl();
  const { notification } = useSelector(state => state.app);
  const { organizations } = useSelector(store => store.climateWarehouse);

  console.log(organizations);

  useEffect(() => {
    dispatch(getOrganizationData());
  }, []);

  const orgWasSuccessfullyCreated =
    notification && notification.id === 'organization-created';
  useEffect(() => {
    if (orgWasSuccessfullyCreated) {
      onClose();
    }
  }, [notification]);

  return (
    <>
      <Modal
        onClose={onClose}
        modalType={modalTypeEnum.basic}
        title={intl.formatMessage({
          id: 'organization-subscriptions',
        })}
        body={
          <ModalFormContainerStyle>
            <StyledFieldContainer>
              <InputContainer>
                <StandardInput
                  size={InputSizeEnum.large}
                  variant={InputVariantEnum.default}
                  value={formData.name}
                  onChange={value =>
                    setFormData(prevState => ({
                      ...prevState,
                      name: value,
                    }))
                  }
                  placeholderText={intl.formatMessage({
                    id: 'add-custom-organization',
                  })}
                />
              </InputContainer>
              <StyledLabelContainer />
              <PrimaryButton
                label={intl.formatMessage({ id: 'add' })}
                size="large"
                onClick={() => console.log('add custom org')}
              />
            </StyledFieldContainer>

            <StyledSubscriptionsListContainer>
              {organizations &&
                Object.keys(organizations)?.length > 0 &&
                Object.keys(organizations).map(
                  organizationKey =>
                    !organizations[organizationKey]?.isHome && (
                      <StyledSubscriptionContainer key={organizationKey}>
                        <Body>{organizations[organizationKey]?.name}</Body>
                        <Switch
                          checked={
                            organizations[organizationKey]?.subscribed ?? false
                          }
                          onChange={() => console.log('check')}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </StyledSubscriptionContainer>
                    ),
                )}
            </StyledSubscriptionsListContainer>

            <StyledSubscriptionsListContainer>
              {Object.keys(dummyData).map(
                organizationItem =>
                  !dummyData[organizationItem]?.isHome && (
                    <StyledSubscriptionContainer key={organizationItem}>
                      <Body>{dummyData[organizationItem]?.name}</Body>
                      <Switch
                        checked={
                          dummyData[organizationItem]?.subscribed ?? false
                        }
                        onChange={() => console.log('check')}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </StyledSubscriptionContainer>
                  ),
              )}
            </StyledSubscriptionsListContainer>
          </ModalFormContainerStyle>
        }
        hideButtons
      />
    </>
  );
};

export { SubscriptionModal };
