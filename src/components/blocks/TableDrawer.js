import { Drawer } from '@mui/material';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { CloseIconWithBorder, Body, SuccessIcon, ErrorIcon } from '..';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';

const drawerStyles = {
  marginTop: '70px',
  width: '340px',
  height: '80%',
};

const IconContainer = styled('div')`
  top: 17px;
  right: 24px;
  position: absolute;
  background-color: white;
  cursor: pointer;
`;
const TableContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  width: 100%;
  padding: 20px 30px 20px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-self: center;
  box-sizing: border-box;
`;

const TableContent = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  padding: 7px 0px 7px 0px;
  box-sizing: border-box;
  body {
    word-wrap: break-word;
  }
`;

const StyledDetails = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  ${props => props.isGreen && `body {color: #52C41A}`};
  ${props => props.isRed && `body {color: #f5222d}`};
`;

const StyledValuesContainer = styled('div')`
  display: flex;
  flex-direction: column;
  body {
    width: 90%;
  }
  gap: 4px;
`;

const TableDrawer = withTheme(({ drawerRecord, drawerUpdates, onClose }) => {
  const updatesAreVisible = drawerUpdates && drawerUpdates.length > 0;
  const splitIsVisible = drawerUpdates && drawerUpdates.length > 1;

  return (
    <Drawer
      PaperProps={{ sx: drawerStyles }}
      anchor="right"
      open={drawerRecord ? true : false}
      onClose={onClose}
    >
      <IconContainer onClick={onClose}>
        <CloseIconWithBorder height="21" width="21" />
      </IconContainer>
      <TableContentContainer>
        {drawerRecord &&
          Object.entries(drawerRecord)
            .filter(value => !Array.isArray(drawerRecord[value[0]]))
            .map(value => {
              return (
                <TableContent key={value}>
                  <Body size="Small Bold">
                    {convertPascalCaseToSentenceCase(value[0])}
                  </Body>
                  {updatesAreVisible &&
                    value[1] !== drawerUpdates[0][value[0]] && (
                      <StyledValuesContainer>
                        <StyledDetails isRed>
                          <ErrorIcon width="17" height="17" />
                          <Body>{value[1] ? value[1] : '--'}</Body>
                        </StyledDetails>

                        <StyledDetails isGreen>
                          <SuccessIcon width="17" height="17" />
                          <Body>
                            {drawerUpdates[0][value[0]]
                              ? drawerUpdates[0][value[0]]
                              : '--'}
                          </Body>
                        </StyledDetails>

                        {splitIsVisible && (
                          <StyledDetails isGreen>
                            <SuccessIcon width="17" height="17" />
                            <Body>
                              {drawerUpdates[1][value[0]]
                                ? drawerUpdates[1][value[0]]
                                : '--'}
                            </Body>
                          </StyledDetails>
                        )}
                      </StyledValuesContainer>
                    )}
                  {(!updatesAreVisible ||
                    value[1] === drawerUpdates[0][value[0]]) && (
                    <StyledDetails>
                      <Body>{value[1]}</Body>
                    </StyledDetails>
                  )}
                </TableContent>
              );
            })}
      </TableContentContainer>
    </Drawer>
  );
});

export { TableDrawer };
