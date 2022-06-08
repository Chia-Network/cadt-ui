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
  ${props =>
    props.isGreen && `body {color: ${props.theme.colors.default.status.ok.primary}}`};
  ${props =>
    props.isRed &&
    `body {color: ${props.theme.colors.default.status.error.primary}}`};
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
            .filter(
              unfilteredKeyValuePair =>
                !Array.isArray(drawerRecord[unfilteredKeyValuePair[0]]) &&
                unfilteredKeyValuePair[0] !== 'unitBlockEnd' &&
                unfilteredKeyValuePair[0] !== 'unitBlockStart' &&
                typeof unfilteredKeyValuePair[1] !== 'object',
            )
            .map(keyValuePair => {
              return (
                <TableContent key={keyValuePair}>
                  <Body size="Small Bold">
                    {convertPascalCaseToSentenceCase(keyValuePair[0])}
                  </Body>
                  {updatesAreVisible &&
                    keyValuePair[1] !== drawerUpdates[0][keyValuePair[0]] && (
                      <StyledValuesContainer>
                        <StyledDetails isRed>
                          <ErrorIcon width="17" height="17" />
                          <Body>
                            {keyValuePair[1] ? keyValuePair[1] : '--'}
                          </Body>
                        </StyledDetails>

                        <StyledDetails isGreen>
                          <SuccessIcon width="17" height="17" />
                          <Body>
                            {drawerUpdates[0][keyValuePair[0]]
                              ? drawerUpdates[0][keyValuePair[0]]
                              : '--'}
                          </Body>
                        </StyledDetails>

                        {splitIsVisible && (
                          <StyledDetails isGreen>
                            <SuccessIcon width="17" height="17" />
                            <Body>
                              {drawerUpdates[1][keyValuePair[0]]
                                ? drawerUpdates[1][keyValuePair[0]]
                                : '--'}
                            </Body>
                          </StyledDetails>
                        )}
                      </StyledValuesContainer>
                    )}
                  {(!updatesAreVisible ||
                    keyValuePair[1] === drawerUpdates[0][keyValuePair[0]]) && (
                    <StyledDetails>
                      <Body>{keyValuePair[1] ? keyValuePair[1] : '--'}</Body>
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
