import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { EllipsisMenuIcon } from '..';

const BasicMenu = ({
  options = [
    { label: 'item 1', action: () => console.log('click on item 1') },
    { label: 'item 1', action: () => console.log('click on item 2') },
  ],
  children = <EllipsisMenuIcon />,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        {children}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '& .MuiMenu-paper': {
            borderRadius: '0.125rem',
            boxShadow:
              '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)',
          },
        }}>
        {options &&
          options.length > 0 &&
          options.map((option, index) => (
            <MenuItem
              onClick={() => {
                option.action();
                handleClose();
              }}
              key={index}>
              {option.label}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export { BasicMenu };
