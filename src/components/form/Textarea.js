import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme, css } from 'styled-components';

const TextareaStateEnum = {
  default: 'default',
  hover: 'hover',
  focused: 'focused',
  typing: 'typing',
  filled: 'filled',
  disabled: 'disabled',
};

const TextareaSizeEnum = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const StyledTextarea = styled('textarea')`
  box-sizing: border-box;
  border: 0.0625rem solid #d9d9d9;
  resize: none;
  color: #262626;
  border-radius: 0.125rem;
  ::placeholder {
    font-family: ${props => props.theme.typography.primary.regular};
    color: #8c8c8c;
  }
  :focus {
    outline: none;
  }
  ${props => {
    if (props.size === TextareaSizeEnum.large) {
      return css`
        padding: 0.5rem 0.75rem 0.5rem 0.75rem;
        font-family: ${props => props.theme.typography.primary.regular};
        font-style: normal;
        font-weight: 400;
        height: 4rem;
        width: 100%;
        font-size: 1rem;
        line-height: 1.5rem;
      `;
    } else if (props.size === TextareaSizeEnum.small) {
      return css`
        padding: 0.0625rem 0.5rem 0.0625rem 0.5rem;
        font-family: ${props => props.theme.typography.primary.regular};
        font-style: normal;
        font-weight: 400;
        height: 2.875rem;
        font-size: 0.875rem;
        line-height: 1.375rem;
      `;
    } else {
      return css`
        padding: 0.3125rem 0.75rem 0.3125rem 0.75rem;
        font-family: ${props => props.theme.typography.primary.regular};
        font-style: normal;
        font-weight: 400;
        height: 3.375rem;
        font-size: 0.875rem;
        line-height: 1.375rem;
      `;
    }
  }};
  ${props => {
    if (props.state === TextareaStateEnum.hover) {
      return `border: 1px solid #40A9FF;`;
    } else if (
      props.state === TextareaStateEnum.typing ||
      props.state === TextareaStateEnum.focused
    ) {
      return `
                border: 1px solid #1890FF;
                box-shadow: 0px 0px 4px rgba(24, 144, 255, 0.5);
            `;
    }
  }};
`;

const Textarea = withTheme(
  ({
    state = TextareaStateEnum.default,
    size = TextareaSizeEnum.default,
    value,
    placeholder,
    onChange,
    name,
    onBlur,
  }) => {
    const [textareaState, setTextareaState] = useState(state);
    const appStore = useSelector(state => state.app);

    const onMouseEnter = useCallback(() => {
      textareaState !== TextareaStateEnum.focused &&
        textareaState !== TextareaStateEnum.disabled &&
        textareaState !== TextareaStateEnum.typing &&
        setTextareaState(TextareaStateEnum.hover);
    }, [textareaState]);

    const onMouseLeave = useCallback(() => {
      textareaState !== TextareaStateEnum.focused &&
        textareaState !== TextareaStateEnum.typing &&
        textareaState !== TextareaStateEnum.disabled &&
        setTextareaState(TextareaStateEnum.default);
    }, [textareaState]);

    const onBlurCallback = useCallback(
      e => {
        textareaState !== TextareaStateEnum.default &&
          textareaState !== TextareaStateEnum.disabled &&
          setTextareaState(TextareaStateEnum.default);
        onBlur && onBlur(e);
      },
      [textareaState, onBlur],
    );

    const onFocus = useCallback(() => {
      textareaState !== TextareaStateEnum.disabled &&
        setTextareaState(TextareaStateEnum.focused);
    }, []);

    return (
      <StyledTextarea
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onBlur={onBlurCallback}
        onFocus={onFocus}
        value={value}
        state={textareaState}
        size={size}
        placeholder={placeholder}
        disabled={state === TextareaStateEnum.disabled}
        selectedTheme={appStore.theme}
        onChange={onChange}
        name={name}
      />
    );
  },
);

export { Textarea, TextareaSizeEnum, TextareaStateEnum };
