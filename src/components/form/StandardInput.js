import React, { useCallback, useState, useEffect } from 'react';
import styled, { css, withTheme } from 'styled-components';
import {
  WarningIconSmall,
  ErrorIconSmall,
  SuccessIconSmall,
} from '../icons/index';

const InputSizeEnum = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const InputVariantEnum = {
  default: 'default',
  error: 'error',
  warning: 'warning',
  success: 'success',
};

const InputStateEnum = {
  default: 'default',
  hover: 'hover',
  focused: 'focused',
  typing: 'typing',
  filled: 'filled',
  disabled: 'disabled',
};

const StyledInputContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.default.onButton};
  border: 1px solid ${props => props.theme.colors.default.onBorder};
  box-sizing: border-box;
  border-radius: 0.125rem;
  ${props => {
    if (props.size == InputSizeEnum.small) {
      return css`
        height: 1.5rem;
        padding: 0.0625rem 0.5rem 0.0625rem 0.5rem;
      `;
    } else if (props.size == InputSizeEnum.large) {
      return css`
        height: 2.5rem;
        padding: 0.5rem 0.75rem 0.5rem 0.75rem;
      `;
    } else {
      return css`
        height: 2rem;
        padding: 0.3125rem 0.75rem 0.3125rem 0.75rem;
      `;
    }
  }};
  ${props => {
    if (props.variant === InputVariantEnum.warning) {
      if (props.inputState === InputStateEnum.default) {
        return css`
          border: 1px solid ${props.theme.colors.default.status.warning.primary};
        `;
      } else if (props.inputState === InputStateEnum.hover) {
        return css`
          border: 1px solid #ffc53d;
        `;
      } else if (
        props.inputState === InputStateEnum.focused ||
        props.inputState === InputStateEnum.typing
      ) {
        return css`
          border: 1px solid ${props.theme.colors.default.status.warning.primary};
          box-shadow: 0px 0px 4px rgba(250, 173, 20, 0.5);
        `;
      } else if (props.inputState === InputStateEnum.disabled) {
        return css`
          background: ${props.theme.colors.default.onSelect};
        `;
      }
    } else if (props.variant === InputVariantEnum.error) {
      if (props.inputState === InputStateEnum.default) {
        return css`
          border: 1px solid ${props.theme.colors.default.status.error.primary};
        `;
      } else if (props.inputState === InputStateEnum.hover) {
        return css`
          border: 1px solid #ff4d4f;
        `;
      } else if (
        props.inputState === InputStateEnum.focused ||
        props.inputState === InputStateEnum.typing
      ) {
        return css`
          border: 1px solid ${props.theme.colors.default.status.error.primary};
          box-shadow: 0px 0px 4px rgba(245, 34, 45, 0.5);
        `;
      } else if (props.inputState === InputStateEnum.disabled) {
        return css`
          background: ${props.theme.colors.default.onSelect};
        `;
      }
    } else {
      // else for InputVariantEnum.default
      if (props.inputState === InputStateEnum.hover) {
        return css`
          border: 1px solid ${props.theme.colors.default.onInput};
        `;
      } else if (
        props.inputState === InputStateEnum.focused ||
        props.inputState === InputStateEnum.typing
      ) {
        return css`
          border: 1px solid ${props.theme.colors.default.onDate};
          box-shadow: 0px 0px 4px rgba(24, 144, 255, 0.5);
        `;
      } else if (props.inputState === InputStateEnum.disabled) {
        return css`
          background: ${props.theme.colors.default.onSelect};
        `;
      }
    }
  }};
`;

const StyledInput = styled('input')`
  border-color: ${props => props.theme.colors.default.onButton};
  width: 100%;
  height: 100%;
  border-style: none;
  border: none;
  margin: 0;
  box-sizing: border-box;
  font-style: normal;
  font-weight: normal;
  color: ${props => props.theme.colors.default.onText};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${props => props.theme.colors.default.onPlaceholder};
  }
  :disabled {
    background: ${props => props.theme.colors.default.onSelect};
  }
  ${props => {
    if (props.size == InputSizeEnum.large) {
      return css`
        font-size: 1rem;
        line-height: 1.5rem;
      `;
    } else if (props.size == InputSizeEnum.small) {
      return css`
        font-size: 0.875rem;
        line-height: 1.375rem;
      `;
    } else {
      return css`
        font-size: 0.875rem;
        line-height: 1.375rem;
      `;
    }
  }};
`;

const StyledSuffixPrefixContainer = styled('div')`
  margin-right: 0.375rem;
`;

const StandardInput = withTheme(
  ({
    size = InputSizeEnum.default,
    placeholderText,
    variant = InputVariantEnum.default,
    state = InputStateEnum.default,
    suffix,
    prefix,
    value,
    type,
    onChange,
    onBlur,
    name,
  }) => {
    const [inputState, setInputState] = useState(state);

    useEffect(() => {
      setInputState(state);
    }, [state]);

    const onMouseEnter = useCallback(() => {
      inputState !== InputStateEnum.focused &&
        inputState !== InputStateEnum.disabled &&
        inputState !== InputStateEnum.typing &&
        setInputState(InputStateEnum.hover);
    }, [inputState]);

    const onMouseLeave = useCallback(() => {
      inputState !== InputStateEnum.focused &&
        inputState !== InputStateEnum.typing &&
        inputState !== InputStateEnum.disabled &&
        setInputState(InputStateEnum.default);
    }, [inputState]);

    const onContainerBlur = useCallback(() => {
      inputState !== InputStateEnum.default &&
        inputState !== InputStateEnum.disabled &&
        setInputState(InputStateEnum.default);
    }, [inputState]);

    const onFocus = useCallback(() => {
      inputState !== InputStateEnum.disabled &&
        setInputState(InputStateEnum.focused);
    }, [inputState]);

    return (
      <StyledInputContainer
        size={size}
        inputState={inputState}
        variant={variant}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onBlur={onContainerBlur}
        onFocus={onFocus}>
        {prefix && (
          <StyledSuffixPrefixContainer>{prefix}</StyledSuffixPrefixContainer>
        )}
        <StyledInput
          type={type}
          size={size}
          placeholder={placeholderText}
          inputState={inputState}
          variant={variant}
          disabled={inputState === InputStateEnum.disabled}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={onBlur}
          name={name}
        />
        {suffix && (
          <StyledSuffixPrefixContainer>{suffix}</StyledSuffixPrefixContainer>
        )}
        {variant === InputVariantEnum.warning && (
          <WarningIconSmall width={14} height={14} />
        )}
        {variant === InputVariantEnum.error && (
          <ErrorIconSmall width={14} height={14} />
        )}
        {variant === InputVariantEnum.success && (
          <SuccessIconSmall width={14} height={14} />
        )}
      </StyledInputContainer>
    );
  },
);

export { StandardInput, InputSizeEnum, InputStateEnum, InputVariantEnum };
