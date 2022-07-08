import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  InfoIconSmall,
  modalTypeEnum,
  Modal,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGovernanceOrgList,
  getIsGovernanceCreated,
  getPickLists,
  initiateGovernance,
  updateGovernanceOrgLists,
  updateGovernancePickLists,
} from '../../store/actions/climateWarehouseActions';
import { isJsonString } from '../../utils/json';
import constants from '../../constants';

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

const StyledJSONExampleContainer = styled.div`
  textarea {
    height: 50vh;
    width: 40vw;
    pointer-events: none;
  }
`;

const StyledButtonContainer = styled.div`
  width: fit-content;
`;

const StyledInfoIconContainer = styled.span`
  cursor: pointer;
  padding-left: 8px;
`;

const modalToOpenEnum = {
  none: 'none',
  pickLists: 'pickLists',
  orgList: 'orgList',
};

const Governance = () => {
  const intl = useIntl();
  const [picklistsTextarea, setPicklistsTextarea] = useState(
    JSON.stringify({}),
  );
  const [modalToOpen, setModalToOpen] = useState(modalToOpenEnum.none);
  const [orgListTextarea, setOrgListTextarea] = useState(JSON.stringify([]));
  const {
    pickLists,
    governanceOrgList,
    isGovernanceCreated,
    isGovernanceInitiated,
  } = useSelector(store => store.climateWarehouse);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGovernanceOrgList());
    dispatch(getPickLists());
    dispatch(getIsGovernanceCreated());
  }, []);

  useEffect(() => {
    setPicklistsTextarea(JSON.stringify(pickLists));
  }, [pickLists]);

  useEffect(() => {
    setOrgListTextarea(JSON.stringify(governanceOrgList));
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

  const handleOnSend = useCallback(() => {
    if (isOrgListValid && arePickListsValid) {
      dispatch(updateGovernanceOrgLists(orgListTextarea));
      dispatch(updateGovernancePickLists(picklistsTextarea));
    }
  }, [isOrgListValid, arePickListsValid, orgListTextarea, picklistsTextarea]);

  // if governance is initiated, call api each 30 seconds to check whether governance has been created
  useEffect(() => {
    if (isGovernanceInitiated && !isGovernanceCreated) {
      const id = window.setInterval(() => {
        dispatch(getIsGovernanceCreated());
      }, 30000);

      if (id) {
        return () => clearInterval(id);
      }
    }
  }, [isGovernanceInitiated, isGovernanceCreated]);

  return (
    <>
      <StyledGovernanceContainer>
        <H2>
          <FormattedMessage id="governance" />
        </H2>
        {isGovernanceCreated && (
          <StyledJSONSectionContainer>
            <StyledJSONContainer>
              <div>
                <H4>
                  <FormattedMessage id="picklists" />
                  <StyledInfoIconContainer
                    onClick={() => setModalToOpen(modalToOpenEnum.pickLists)}
                  >
                    <InfoIconSmall height="14" width="14" />
                  </StyledInfoIconContainer>
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
                  <StyledInfoIconContainer
                    onClick={() => setModalToOpen(modalToOpenEnum.orgList)}
                  >
                    <InfoIconSmall height="14" width="14" />
                  </StyledInfoIconContainer>
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
        )}
        <StyledButtonContainer>
          {!isGovernanceInitiated && !isGovernanceCreated && (
            <PrimaryButton
              label={intl.formatMessage({ id: 'initiate-governance' })}
              size="large"
              onClick={() => dispatch(initiateGovernance())}
            />
          )}
          {isGovernanceInitiated && !isGovernanceCreated && (
            <H4>
              <FormattedMessage id="governance-initiating-please-wait" />
            </H4>
          )}
          {isGovernanceCreated && (
            <PrimaryButton
              label={intl.formatMessage({ id: 'send' })}
              size="large"
              onClick={handleOnSend}
              disabled={!arePickListsValid || !isOrgListValid}
            />
          )}
        </StyledButtonContainer>
      </StyledGovernanceContainer>
      {(modalToOpen === modalToOpenEnum.orgList ||
        modalToOpen === modalToOpenEnum.pickLists) && (
        <Modal
          onClose={() => setModalToOpen(modalToOpenEnum.none)}
          modalType={modalTypeEnum.basic}
          title={`${intl.formatMessage({
            id: 'valid-json-example',
          })} (${intl.formatMessage({
            id:
              modalToOpen === modalToOpenEnum.orgList
                ? 'picklists'
                : 'all-organizations',
          })})`}
          body={
            <StyledJSONExampleContainer>
              <Textarea
                size={TextareaSizeEnum.large}
                value={
                  modalToOpen === modalToOpenEnum.orgList
                    ? constants.ORG_LIST_JSON_EXAMPLE
                    : constants.PICK_LIST_JSON_EXAMPLE
                }
                readonly
              />
            </StyledJSONExampleContainer>
          }
          hideButtons
        />
      )}
    </>
  );
};

export { Governance };
