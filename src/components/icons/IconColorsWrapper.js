import styled from 'styled-components';

export const IconColorsWrapper = styled('div')`
  cursor: pointer;
  color: ${props => props.theme.colors.default.secondary};
  :hover {
    color: ${props => props.theme.colors.default.secondaryDark};
  }
`;
