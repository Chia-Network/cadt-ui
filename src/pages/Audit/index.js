import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import {
  Body,
  MagnifyGlassIcon,
  SelectOrganizations,
  SelectSizeEnum,
  SelectTypeEnum,
  AuditItemModal,
  DescendingClockIcon,
  AscendingClockIcon,
  H3,
} from '../../components';
import {
  getAudit,
  getOrganizationData,
} from '../../store/actions/climateWarehouseActions';

const StyledSectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledHeaderContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 24px 30px 16px;
`;

const StyledBodyContainer = styled('div')`
  flex-grow: 1;
  overflow: scroll;
`;

const StyledBodyNoDataFound = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledTable = styled('table')`
  width: 100%;
`;

const StyledTh = styled('th')`
  text-align: start;
  padding: 17px;
  background-color: #e6f7ff;
  position: sticky;
  top: 0;
`;

const StyledTd = styled('td')`
  text-align: start;
  padding: 17px;
`;

const StyledTr = styled('tr')`
  :nth-child(even) {
    background-color: #f0f2f5;
  }
`;

const StyledIconContainer = styled('div')`
  cursor: pointer;
`;

const StyledSortContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Audit = withRouter(() => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const { audit, organizations } = useSelector(store => store.climateWarehouse);
  const [selectedOrgUid, setSelectedOrgUid] = useState(null);
  const [selectedAuditItem, setSelectedAuditItem] = useState(null);
  const [isChronologicallySorted, setIsChronologicallySorted] = useState(false);

  useEffect(() => {
    dispatch(getOrganizationData());
  }, []);

  const onOrganizationSelect = selectedOption => {
    const orgUid = selectedOption[0].orgUid;
    setSelectedOrgUid(orgUid);
    dispatch(getAudit({ orgUid, useMockedResponse: true }));
  };

  if (!organizations) {
    return null;
  }

  let sortedAuditArray = audit ? [...audit] : null;
  if (sortedAuditArray) {
    let sortSign = isChronologicallySorted ? -1 : 1;
    sortedAuditArray.sort(
      (a, b) =>
        sortSign *
        (new Date(parseInt(b.onchainConfirmationTimeStamp) * 1000).getTime() -
          new Date(parseInt(a.onchainConfirmationTimeStamp) * 1000).getTime()),
    );
  }

  return (
    <StyledSectionContainer>
      <StyledHeaderContainer>
        <SelectOrganizations
          size={SelectSizeEnum.large}
          type={SelectTypeEnum.basic}
          placeholder={intl.formatMessage({ id: 'select-organization' })}
          width="200px"
          onChange={onOrganizationSelect}
        />
        {selectedOrgUid && (
          <div>
            <Body>
              {intl.formatMessage({ id: 'org-uid' })}: {selectedOrgUid}
            </Body>
          </div>
        )}
      </StyledHeaderContainer>
      {!sortedAuditArray && (
        <StyledBodyNoDataFound>
          <H3>
            <FormattedMessage id="no-audit-data" />
          </H3>
        </StyledBodyNoDataFound>
      )}
      {sortedAuditArray?.length > 0 && (
        <StyledBodyContainer>
          <StyledTable>
            <thead>
              <StyledTr>
                <StyledTh></StyledTh>
                <StyledTh>
                  <Body size="Bold">
                    <FormattedMessage id="table" />
                  </Body>
                </StyledTh>
                <StyledTh>
                  <StyledSortContainer>
                    <Body size="Bold">
                      <FormattedMessage id="timestamp" />
                    </Body>
                    <StyledIconContainer>
                      {isChronologicallySorted ? (
                        <DescendingClockIcon
                          width={'1.5em'}
                          height={'1.5em'}
                          onClick={() => setIsChronologicallySorted(false)}
                        />
                      ) : (
                        <AscendingClockIcon
                          width={'1.5em'}
                          height={'1.5em'}
                          onClick={() => setIsChronologicallySorted(true)}
                        />
                      )}
                    </StyledIconContainer>
                  </StyledSortContainer>
                </StyledTh>
                <StyledTh>
                  <Body size="Bold">
                    <FormattedMessage id="type" />
                  </Body>
                </StyledTh>
                <StyledTh>
                  <Body size="Bold">
                    <FormattedMessage id="root-hash" />
                  </Body>
                </StyledTh>
              </StyledTr>
            </thead>
            <tbody>
              {sortedAuditArray?.length &&
                sortedAuditArray.map(auditItem => (
                  <StyledTr key={auditItem.id}>
                    <StyledTd>
                      {auditItem.change && (
                        <StyledIconContainer
                          onClick={() => setSelectedAuditItem(auditItem)}
                        >
                          <MagnifyGlassIcon />
                        </StyledIconContainer>
                      )}
                    </StyledTd>
                    <StyledTd>
                      <Body>{auditItem.table}</Body>
                    </StyledTd>
                    <StyledTd>
                      <Body>
                        {dayjs(
                          auditItem.onchainConfirmationTimeStamp * 1000,
                        ).format('YYYY-MM-DD HH:mm:ss')}
                      </Body>
                    </StyledTd>
                    <StyledTd>
                      <Body>{auditItem.type}</Body>
                    </StyledTd>
                    <StyledTd>
                      <Body>{auditItem.rootHash}</Body>
                    </StyledTd>
                  </StyledTr>
                ))}
            </tbody>
          </StyledTable>
        </StyledBodyContainer>
      )}
      {selectedAuditItem && (
        <AuditItemModal
          onClose={() => setSelectedAuditItem(null)}
          auditItem={selectedAuditItem}
        />
      )}
    </StyledSectionContainer>
  );
});

export { Audit };
