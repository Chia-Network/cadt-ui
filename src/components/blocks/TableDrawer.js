import { Drawer } from '@mui/material';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { CloseIconWithBorder, Body, ErrorIcon, SuccessIcon } from '..';
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
`;

const TableDrawer = withTheme(
  ({
    drawerRecord,
    drawerUpdatesSign,
    drawerUpdatedHeadingsArray,
    onClose,
  }) => {
    console.log(drawerUpdatedHeadingsArray, drawerUpdatesSign);
    const updateSignsAreDisplayed =
      drawerUpdatesSign &&
      drawerUpdatedHeadingsArray &&
      drawerUpdatedHeadingsArray.length > 0;

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
                  <>
                    <TableContent key={value}>
                      <Body size="Small Bold">
                        {convertPascalCaseToSentenceCase(value[0])}
                      </Body>
                      <StyledDetails>
                        {updateSignsAreDisplayed &&
                          drawerUpdatedHeadingsArray.includes(value[0]) && (
                            <>
                              {drawerUpdatesSign === '-' && (
                                <ErrorIcon width="17" height="17" />
                              )}
                              {drawerUpdatesSign === '+' && (
                                <SuccessIcon width="17" height="17" />
                              )}
                            </>
                          )}
                        <Body>{JSON.stringify(value[1])}</Body>
                      </StyledDetails>
                    </TableContent>
                  </>
                );
              })}
        </TableContentContainer>
      </Drawer>
    );
  },
);

export { TableDrawer };
