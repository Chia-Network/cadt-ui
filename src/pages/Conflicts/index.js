import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Body, H3, MagnifyGlassIcon } from '../../components';
import { getConflictsData } from '../../store/actions/climateWarehouseActions';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';

const StyledSectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  :hover {
    background-color: ${props =>
      props.theme.hexToRgba(
        props.theme.colors[props.selectedTheme].secondary,
        0.3,
      )};
  }
`;

const StyledCursor = styled('div')`
  cursor: zoom-in;
`;

const Conflicts = withTheme(() => {
  const { theme } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { organizations, conflicts } = useSelector(
    store => store.climateWarehouse,
  );

  useEffect(() => {
    dispatch(getConflictsData());
  }, []);

  if (!organizations || !conflicts) {
    return null;
  }

  const keysToShow = Object.keys(conflicts[0]);

  return (
    <StyledSectionContainer>
      {(!conflicts || !conflicts.length) && (
        <StyledBodyNoDataFound>
          <H3>
            <FormattedMessage id="no-conflict-data" />
          </H3>
        </StyledBodyNoDataFound>
      )}
      {keysToShow?.length && conflicts?.length > 0 && (
        <StyledBodyContainer>
          <StyledTable>
            <thead>
              <StyledTr selectedTheme={theme}>
                {keysToShow.map((keyItem, index) => (
                  <StyledTh key={index}>
                    <Body size="Bold">
                      {convertPascalCaseToSentenceCase(keyItem)}
                    </Body>
                  </StyledTh>
                ))}
              </StyledTr>
            </thead>
            <tbody>
              {conflicts.map((conflictItem, index) => (
                <StyledTr key={index} selectedTheme={theme}>
                  {keysToShow.map((keyItem, index) => (
                    <StyledTd key={index}>
                      {!keyItem.includes('ProjectId') ? (
                        <Body>{conflictItem[keyItem]}</Body>
                      ) : (
                        <StyledCursor>
                          <Body
                            onClick={() =>
                              navigate(
                                `/projects?projectId=${conflictItem[keyItem]}`,
                              )
                            }
                            color="#1890ff"
                          >
                            {conflictItem[keyItem]}
                            <MagnifyGlassIcon height="15" width="30" />
                          </Body>
                        </StyledCursor>
                      )}
                    </StyledTd>
                  ))}
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>
        </StyledBodyContainer>
      )}
    </StyledSectionContainer>
  );
});

export { Conflicts };
