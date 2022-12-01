import styled from 'styled-components';

export const IconColorsWrapperTypeEnum = {
  default: 'default',
  red: 'red',
  disabled: 'disabled',
};

export const IconColorsWrapper = styled('div')`
  cursor: pointer;

  color: ${props =>
    props.type === IconColorsWrapperTypeEnum.red
      ? props.theme.colors.default.shade2
      : props.theme.colors.default.secondary};

  :hover {
    color: ${props =>
      props.type === IconColorsWrapperTypeEnum.red
        ? props.theme.colors.default.shade1
        : props.theme.colors.default.secondaryDark};
  }
`;
