import React from 'react';
import { Stepper as MuiStepper } from '@mui/material';
import styled from 'styled-components';

const StyledStepper = styled(MuiStepper)`
  cursor: pointer;

  svg.MuiSvgIcon-root:hover {
    color: ${props => props.theme.colors.default.secondary};
    cursor: pointer;
  }

  svg.Mui-active,
  svg.Mui-active:hover {
    color: ${props => props.theme.colors.default.secondaryDark};
  }

  svg.Mui-completed {
    color: ${props => props.theme.colors.default.secondaryDark};
  }
`;

const Stepper = ({ ...props }) => {
  return <StyledStepper {...props} />;
};

export { Stepper };
