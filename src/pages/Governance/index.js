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
  textarea {
    height: 50vh;
  }
`;

const StyledButtonContainer = styled.div`
  width: fit-content;
`;

const Governance = () => {
  const intl = useIntl();
  const [picklistsTextarea, setPicklistsTextarea] = useState(
    JSON.stringify('{}'),
  );
  const [orgListTextarea, setOrgListTextarea] = useState(JSON.stringify('[]'));
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
    const arePickListsAnObject =
      picklistsTextarea.length > 4 &&
      picklistsTextarea[0] === '{' &&
      picklistsTextarea[picklistsTextarea.length - 1] === '}';
    return arePickListsAnObject && isJsonString(picklistsTextarea);
  }, [picklistsTextarea]);

  const prettyfiedPicklists = useMemo(
    () =>
      arePickListsValid
        ? JSON.stringify(JSON.parse(picklistsTextarea), undefined, 4)
        : picklistsTextarea,
    [picklistsTextarea],
  );

  const isOrgListValid = useMemo(() => {
    const isOrgListAnArray =
      orgListTextarea.length > 4 &&
      orgListTextarea[0] === '[' &&
      orgListTextarea[orgListTextarea.length - 1] === ']';
    return isOrgListAnArray && isJsonString(orgListTextarea);
  }, [orgListTextarea]);

  const prettyfiedOrgList = useMemo(
    () =>
      isOrgListValid
        ? JSON.stringify(JSON.parse(orgListTextarea), undefined, 4)
        : orgListTextarea,
    [orgListTextarea],
  );

  return (
    <StyledGovernanceContainer>
      <H2>
        <FormattedMessage id="governance" />
      </H2>
      <StyledJSONSectionContainer>
        <StyledJSONContainer>
          <div>
            <H4>
              <FormattedMessage id="picklists" />
            </H4>
            {arePickListsValid && (
              <Body size="Small" color="green">
                <FormattedMessage id="json-is-valid" />
              </Body>
            )}
            {!arePickListsValid && (
              <Body size="Small" color="red">
                <FormattedMessage id="json-not-valid" />
              </Body>
            )}
          </div>
          <Textarea
            size={TextareaSizeEnum.large}
            placeholder={intl.formatMessage({
              id: 'picklists',
            })}
            value={prettyfiedPicklists}
            onChange={e => setPicklistsTextarea(e.target.value)}
            state={TextareaStateEnum.default}
          />
        </StyledJSONContainer>
        <StyledJSONContainer>
          <div>
            <H4>
              <FormattedMessage id="all-organizations" />
            </H4>
            {isOrgListValid && (
              <Body size="Small" color="green">
                <FormattedMessage id="json-is-valid" />
              </Body>
            )}
            {!isOrgListValid && (
              <Body size="Small" color="red">
                <FormattedMessage id="json-not-valid" />
              </Body>
            )}
          </div>
          <Textarea
            size={TextareaSizeEnum.large}
            placeholder={intl.formatMessage({
              id: 'all-organizations',
            })}
            value={prettyfiedOrgList}
            onChange={e => setOrgListTextarea(e.target.value)}
            state={TextareaStateEnum.default}
          />
        </StyledJSONContainer>
      </StyledJSONSectionContainer>
      <StyledButtonContainer>
        {/* <PrimaryButton
          label={intl.formatMessage({ id: 'initiate-governance' })}
          size="large"
          onClick={() => console.log('pac pac')}
        /> */}
        <PrimaryButton
          disabled={!isOrgListValid && !arePickListsValid}
          label={intl.formatMessage({ id: 'Send' })}
          size="large"
          onClick={() => console.log('pac pac')}
        />
      </StyledButtonContainer>
    </StyledGovernanceContainer>
  );
};

export { Governance };
