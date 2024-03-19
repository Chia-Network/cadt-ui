import styled from "styled-components";



export const SettingHorizontalFlexBox = styled('div') `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  box-sizing: border-box;
`;

export const LabelBox = styled('div')`
  display: flex;
  align-items: flex-start;
  justify-content: right;
  width: 200px;
`;

export const textInputStyle = {
  maxWidth: '100%',
  width: '400px',
  marginLeft: '10px',
  marginRight: '10px',
}