import { Drawer } from '@mui/material';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { CloseIconWithBorder, Body } from '..';
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

const TableDrawer = withTheme(({ getRecord, onClose }) => {
  return (
    <Drawer
      PaperProps={{ sx: drawerStyles }}
      anchor="right"
      open={getRecord ? true : false}
      onClose={onClose}
    >
      <IconContainer onClick={onClose}>
        <CloseIconWithBorder height="21" width="21" />
      </IconContainer>
      <TableContentContainer>
        {getRecord &&
          Object.entries(getRecord)
            .filter(value => !Array.isArray(getRecord[value[0]]))
            .map(value => {
              return (
                <>
                  <TableContent key={value}>
                    <Body size="Small Bold">
                      {convertPascalCaseToSentenceCase(value[0])}
                    </Body>
                    <Body>{JSON.stringify(value[1])}</Body>
                  </TableContent>
                </>
              );
            })}
      </TableContentContainer>
    </Drawer>
  );
});

export { TableDrawer };
