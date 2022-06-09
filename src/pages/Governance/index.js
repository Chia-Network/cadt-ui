/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  H2,
  H4,
  Textarea,
  TextareaSizeEnum,
  TextareaStateEnum,
  PrimaryButton,
  Body,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getGovernanceOrgList } from '../../store/actions/climateWarehouseActions';
import { isJsonString } from '../../utils/json';

const StyledGovernanceContainer = styled('div')`
  padding: 30px 63px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StyledJSONSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;

const StyledJSONContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledButtonContainer = styled.div`
  width: fit-content;
`;

const Governance = () => {
  const intl = useIntl();
  const [picklistsTextarea, setPicklistsTextarea] = useState('');
  const [orgListTextarea, setOrgListTextarea] = useState('');
  const { pickLists, governanceOrgList } = useSelector(
    store => store.climateWarehouse,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGovernanceOrgList());
  }, []);

  useEffect(() => {
    setPicklistsTextarea(JSON.stringify(pickLists));
  }, [pickLists]);

  useEffect(() => {
    setOrgListTextarea(JSON.stringify(orgListTextarea));
  }, [governanceOrgList]);

  const arePickListsValid = useMemo(() => {
    return isJsonString(picklistsTextarea);
  }, [picklistsTextarea]);

  const isOrgListValid = useMemo(() => {
    return isJsonString(orgListTextarea);
  }, [orgListTextarea]);

  return (
    <StyledGovernanceContainer>
      <H2>
        <FormattedMessage id="governance" />
      </H2>
      <StyledJSONSectionContainer>
        <StyledJSONContainer>
          <H4>
            <FormattedMessage id="picklists" />
          </H4>
          {arePickListsValid && (
            <Body>
              <FormattedMessage id="json-is-valid" />
            </Body>
          )}
          {!arePickListsValid && (
            <Body>
              <FormattedMessage id="json-not-valid" />
            </Body>
          )}
          <Textarea
            size={TextareaSizeEnum.large}
            placeholder={intl.formatMessage({
              id: 'picklists',
            })}
            value={picklistsTextarea}
            onChange={e => setPicklistsTextarea(e.target.value)}
            state={TextareaStateEnum.default}
          />
        </StyledJSONContainer>
        <StyledJSONContainer>
          <H4>
            <FormattedMessage id="all-organizations" />
          </H4>
          {isOrgListValid && (
            <Body>
              <FormattedMessage id="json-is-valid" />
            </Body>
          )}
          {!isOrgListValid && (
            <Body>
              <FormattedMessage id="json-not-valid" />
            </Body>
          )}

          <Textarea
            size={TextareaSizeEnum.large}
            placeholder={intl.formatMessage({
              id: 'all-organizations',
            })}
            value={orgListTextarea}
            onChange={e => setOrgListTextarea(e.target.value)}
            state={TextareaStateEnum.default}
          />
        </StyledJSONContainer>
      </StyledJSONSectionContainer>
      <StyledButtonContainer>
        <PrimaryButton
          label={intl.formatMessage({ id: 'initiate-governance' })}
          size="large"
          onClick={() => console.log('pac pac')}
        />
      </StyledButtonContainer>
    </StyledGovernanceContainer>
  );
};

export { Governance };
