import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

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

import {
  Body,
  MagnifyGlassIcon,
  SelectOrganizations,
  SelectSizeEnum,
  SelectTypeEnum,
} from '../../components';
import { getAudit } from '../../store/actions/climateWarehouseActions';
import { getMyOrgUid } from '../../utils/getMyOrgUid';

const Audit = withRouter(() => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const { audit, organizations } = useSelector(store => store.climateWarehouse);
  const myOrgUid = getMyOrgUid(organizations);
  const [selectedOrgUid, setSelectedOrgUid] = useState(null);

  useEffect(() => {
    if (myOrgUid !== 'none') {
      dispatch(getAudit({ orgUid: myOrgUid, useMockedResponse: true }));
    }
  }, [myOrgUid]);

  const onOrganizationSelect = selectedOption => {
    const orgUid = selectedOption[0].orgUid;
    setSelectedOrgUid(orgUid);
  };

  if (!audit || !organizations) {
    return null;
  }

  console.log(audit);

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
            {intl.formatMessage({ id: 'organization' })}: {selectedOrgUid}
          </div>
        )}
      </StyledHeaderContainer>
      <StyledBodyContainer>
        <StyledTable>
          <StyledTr>
            <StyledTh></StyledTh>
            <StyledTh>
              <Body size="Bold">
                <FormattedMessage id="table" />
              </Body>
            </StyledTh>
            <StyledTh>
              <Body size="Bold">
                <FormattedMessage id="timestamp" />
              </Body>
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
          {audit?.length &&
            audit.map(auditItem => (
              <StyledTr key={auditItem.id}>
                <StyledTd>
                  <MagnifyGlassIcon />
                </StyledTd>
                <StyledTd>
                  <Body>{auditItem.table}</Body>
                </StyledTd>
                <StyledTd>
                  <Body>
                    {dayjs(auditItem.onchainConfirmationTimeStamp).format(
                      'YYYY-MM-DD HH:mm:ss',
                    )}
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
        </StyledTable>
      </StyledBodyContainer>
    </StyledSectionContainer>
  );
});

export { Audit };
