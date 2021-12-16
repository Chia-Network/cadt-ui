import { Drawer } from '@mui/material';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { CloseIconWithBorder, H4, Subtitle } from '..';

const drawerStyles = {
  marginTop: '70px',
  width: '340px',
  height: '806px',
};

const IconContainer = styled('div')`
  align-self: flex-end;
  margin-top: 17px;
  margin-right: 24px;
`;
const TableContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  width: 260px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const TableContent = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
`;

const TableDrawer = withTheme(({ getRecord, onClose }) => {
  return (
    <Drawer
      PaperProps={{ sx: drawerStyles }}
      anchor="right"
      open={getRecord ? true : false}
      onClose={onClose}>
      <IconContainer onClick={onClose}>
        <CloseIconWithBorder height="21" width="21" />
      </IconContainer>
      <TableContentContainer>
        {getRecord &&
          Object.entries(getRecord).map((value, id) => {
            return (
              <>
                <TableContent key={id}>
                  <H4>{value[0]}</H4>

                  <Subtitle key={id}>{value[1]}</Subtitle>
                </TableContent>
              </>
            );
          })}
      </TableContentContainer>
    </Drawer>
  );
});

export { TableDrawer };
