import _ from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';

import { MagnifyGlassIcon, MagnifyGlassIconWhite } from '../icons';

const Input = styled('input')`
  color: ${props => props.theme.colors[props.selectedTheme].onSurface};
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: transparent;
  display: flex;
  border: 1px solid #d9d9d9;
  justify-content: center;
  border-top-left-radius: 0.1rem;
  border-bottom-left-radius: 0.1rem;
  font-size: 1rem;
  margin: 0;
  ${props =>
    (props.size === 'large' && 'width: 31.5625rem;height:2.5rem') ||
    (props.size === 'default' && 'width: 32.0625rem;height:2rem') ||
    (props.size === 'small' && 'width: 32.5625rem;height:1.5rem')};

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: ${props => props.theme.typography.primary.regular};
    color: ${props =>
      props.theme.hexToRgba(
        props.theme.colors[props.selectedTheme].onSurface,
        0.25,
      )};
  }
`;

const SearchIconContainer = styled('div')`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
  ${props => props.outline && 'border: 0.0625rem solid #d9d9d9;'};
  border-left-style: none;
  ${props =>
    (props.size === 'large' && 'width: 2.6875rem;height:2.625rem') ||
    (props.size === 'default' && 'width: 2.1875rem;height:2.125rem') ||
    (props.size === 'small' && 'width: 1.6875rem;height:1.625rem')};

  ${props =>
    (typeof props.buttonText === 'string' &&
      props.size === 'large' &&
      'width:81px; height:2.75rem;') ||
    (typeof props.buttonText === 'string' &&
      props.size === 'default' &&
      'width:81px; height:2.125rem;') ||
    (typeof props.buttonText === 'string' &&
      props.size === 'small' &&
      'width:81px; height:1.625rem;')};

  ${props =>
    (props.usePrimaryButton &&
      props.size === 'large' &&
      'background-color: #1890FF;height:2.75rem;') ||
    (props.usePrimaryButton &&
      props.size === 'default' &&
      'background-color: #1890FF;height:2.25rem;') ||
    (props.usePrimaryButton &&
      props.size === 'small' &&
      'background-color: #1890FF;height:1.75rem;')};
`;

const SearchContainer = withTheme(styled('div')`
  font-family: ${props => props.theme.typography.primary.regular};
  margin-top: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
`);

const ButtonSearchText = withTheme(styled('p')`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  height: 2.5rem;
  width: 3.125rem;
  color: ${props => (props.usePrimaryButton ? '#ffffff' : '#000000')};
`);

const SearchInput = withTheme(
  ({
    usePrimaryButton = false,
    buttonText = null,
    onChange= _.noop,
    size = 'default',
    outline = false,
    onSearch = _.noop,
  }) => {
    const intl = useIntl();
    const appStore = useSelector(state => state.app);

    return (
      <SearchContainer usePrimaryButton={usePrimaryButton} size={size}>
        <Input
          type="text"
          selectedTheme={appStore.theme}
          placeholder={intl.formatMessage({ id: 'search' })}
          onChange={onChange}
          size={size}
          outline={outline}
        />
        <SearchIconContainer
          outline={outline}
          onClick={onSearch}
          size={size}
          selectedTheme={appStore.theme}
          usePrimaryButton={usePrimaryButton}
          buttonText={buttonText}>
          {(buttonText && (
            <ButtonSearchText usePrimaryButton={usePrimaryButton}>
              {buttonText}
            </ButtonSearchText>
          )) ||
            (!buttonText && usePrimaryButton ? (
              <MagnifyGlassIconWhite width={'13.75'} height={'13.75'} />
            ) : (
              <MagnifyGlassIcon width={'13.75'} height={'13.75'} />
            ))}
        </SearchIconContainer>
      </SearchContainer>
    );
  },
);

export { SearchInput };
