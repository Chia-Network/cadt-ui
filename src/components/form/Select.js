import React, { useEffect, useRef, useState } from 'react';
import styled, { withTheme, css } from 'styled-components';
import { ArrowDownIcon, MagnifyGlassIcon, CloseIcon } from '../icons';
import ScrollContainer from 'react-indiana-drag-scroll';

const SelectSizeEnum = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const SelectTypeEnum = {
  basic: 'basic',
  multiple: 'multiple',
  search: 'search',
};

const SelectStateEnum = {
  default: 'default',
  hover: 'hover',
  focused: 'focused',
  filled: 'filled',
  disabled: 'disabled',
};

const StyledSelect = withTheme(styled('div')`
  min-width: ${props => props.width};
  max-width: ${props => props.width};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 0.125rem;
  color: #262626;
  box-sizing: border-box;
  border: 0.0625rem solid #d9d9d9;
  background: #ffffff;
  z-index: 5;
  user-select: none;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-family: ${props => props.theme.typography.primary.regular};
  ${props => {
    if (props.size === SelectSizeEnum.large) {
      return css`
        min-height: 2.5rem;
        padding: 0.5rem 0.75rem 0.5rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5rem;
      `;
    } else if (props.size === SelectSizeEnum.small) {
      return css`
        min-height: 1.5rem;
        padding: 0.0625rem 0.5rem 0.0625rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.375rem;
      `;
    } else {
      return css`
        min-height: 2rem;
        padding: 0.3125rem 0.75rem 0.3125rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1.375rem;
      `;
    }
  }};
  ${props => {
    if (props.state === SelectStateEnum.hover) {
      return `border: 1px solid #40A9FF;`;
    } else if (props.state === SelectStateEnum.focused) {
      return `
        border: 1px solid #3B8EE0;
        box-shadow: 0px 0px 4px rgba(24, 144, 255, 0.5);
      `;
    } else if (props.state === SelectStateEnum.disabled) {
      return `
        background: #F5F5F5;
        color: #BFBFBF;
        cursor: default;`;
    }
  }};
`);

const StyledBasicMenu = styled(ScrollContainer)`
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  padding: 0.25rem 0rem 0.25rem 0rem;
  top: 2.8125rem;
  background: #ffffff;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
    0px 6px 16px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
  border-radius: 0.125rem;
  z-index: 10;
  ${props => {
    if (props.size === SelectSizeEnum.large) {
      return `top: 2.9375rem;`;
    } else if (props.size === SelectSizeEnum.small) {
      return `top: 1.9375rem;`;
    } else {
      return `top: 2.4375rem;`;
    }
  }};
`;

const StyledBasicMenuItem = withTheme(styled('div')`
  padding: 0.3125rem 0.75rem 0.3125rem 0.75rem;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  font-family: ${props => props.theme.typography.primary.regular};
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.375rem;
  padding: 0.3125rem 0.75rem 0.3125rem 0.75rem;
  ${props => {
    if (props.isSelected) {
      return `
        background-color: #E6F7FF;
        font-style: normal;
        font-weight: 600;
      `;
    } else {
      return `font-weight: normal;`;
    }
  }};
`);

const StyledArrowDownContainer = styled('div')`
  ${props => {
    if (props.state === SelectStateEnum.disabled) {
      return `color: #BFBFBF;`;
    } else if (props.state === SelectStateEnum.focused) {
      return `color: #262626;`;
    } else {
      return `color: #BFBFBF;`;
    }
  }};
  margin-left: 0.625rem;
`;

const StyledMultipleSelect = styled(ScrollContainer)`
  max-width: 12.5rem;
  max-height: 80px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const StyledMultipleSelectItem = withTheme(styled('div')`
  background: #f5f5f5;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1px 8px;
  font-family: ${props => props.theme.typography.primary.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: #262626;
`);

const StyledSearchInput = styled('input')`
  width: 100%;
  border: none;
  margin: 0;
  box-sizing: border-box;
  font-style: normal;
  font-weight: normal;
  color: #262626;
  ${props => {
    if (props.size === SelectSizeEnum.large) {
      return css`
        font-size: 1rem;
      `;
    } else if (props.size === SelectSizeEnum.small) {
      return css`
        font-size: 0.875rem;
      `;
    } else {
      return css`
        font-size: 0.875rem;
      `;
    }
  }};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #8c8c8c;
  }
`;

const Select = ({
  size = SelectSizeEnum.default,
  type = SelectTypeEnum.basic,
  state = SelectStateEnum.default,
  options,
  selected = null,
  placeholder = 'Select',
  width = '200px'
}) => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [selectState, setSelectState] = useState(state);
  const [optionsList] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState(selected || null);
  const [searchInputValue, setSearchInputValue] = useState('');
  const ref = useRef();

  useEffect(() => {
    const closeMenu = e => {
      if (
        menuIsVisible &&
        e.target !== ref.current &&
        !ref.current.contains(e.target)
      ) {
        setMenuIsVisible(false);
        setSelectState(SelectStateEnum.default);
      }
      if (type === SelectTypeEnum.search) {
        setSearchInputValue('');
      }
    };
    if (ref && ref.current) {
      document.addEventListener('click', closeMenu);
    }
    return () => document.removeEventListener('click', closeMenu);
  }, [menuIsVisible, ref, ref.current]);

  const onClick = () => {
    if (selectState !== SelectStateEnum.disabled) {
      if (menuIsVisible) {
        setSelectState(SelectStateEnum.hover);
      }
      if (!menuIsVisible) {
        setSelectState(SelectStateEnum.focused);
      }
      setMenuIsVisible(!menuIsVisible);
    }
  };

  const onSearchClick = () => {
    if (selectState !== SelectStateEnum.disabled) {
      if (!menuIsVisible) {
        setSelectState(SelectStateEnum.focused);
        setMenuIsVisible(true);
      }
    }
  };

  const onMouseEnter = () => {
    if (
      selectState !== SelectStateEnum.focused &&
      selectState !== SelectStateEnum.disabled
    ) {
      setSelectState(SelectStateEnum.hover);
    }
  };

  const onMouseLeave = () => {
    if (
      selectState !== SelectStateEnum.focused &&
      selectState !== SelectStateEnum.disabled
    ) {
      setSelectState(SelectStateEnum.default);
    }
  };

  const toggleOptionSelection = ({ value, label }) => {
    const optionIsAlreadySelected =
      selectedOptions != null && selectedOptions.length > 0
        ? selectedOptions.find(selectedOption => selectedOption.value === value)
        : false;
    if (type === SelectTypeEnum.multiple) {
      if (optionIsAlreadySelected) {
        setSelectedOptions(prevState =>
          prevState.filter(option => option.label !== label),
        );
      } else {
        setSelectedOptions(prevState => [...prevState, { value, label }]);
      }
    } else if(type === SelectTypeEnum.search) {
      if (optionIsAlreadySelected) {
        setSelectedOptions(null);
      } else {
        setSelectedOptions([{ value, label }]);
      }      
      setSearchInputValue('');
      setMenuIsVisible(false);
    } else {
      if (optionIsAlreadySelected) {
        setSelectedOptions(null);
      } else {
        setSelectedOptions([{ value, label }]);
      }
      setMenuIsVisible(false);
    }
  };

  const onSearchInputChange = e => {
    setSearchInputValue(e.target.value);
  };

  const StyledSelectLabel = styled('div')`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
  `;

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      {/* Select for Basic type */}
      {type === SelectTypeEnum.basic && (
        <StyledSelect
          size={size}
          width={width}
          type={type}
          state={selectState}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
          <StyledSelectLabel>
            {selectedOptions != null && selectedOptions.length > 0
              ? selectedOptions[0].label
              : placeholder}
          </StyledSelectLabel>
          <StyledArrowDownContainer state={selectState}>
            <ArrowDownIcon
              height={size === SelectSizeEnum.large ? 12 : 10}
              width={size === SelectSizeEnum.large ? 12 : 10}
            />
          </StyledArrowDownContainer>
        </StyledSelect>
      )}
      {/* Select for Multiple type */}
      {type === SelectTypeEnum.multiple && (
        <StyledSelect
          width={width}
          size={size}
          type={type}
          state={selectState}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
          <StyledMultipleSelect>
            {selectedOptions != null && selectedOptions.length > 0
              ? selectedOptions.map(option => (
                  <StyledMultipleSelectItem key={option.value}>
                    {option.label}
                    <div
                      style={{ marginLeft: '5px' }}
                      onClick={() =>
                        toggleOptionSelection({
                          value: option.value,
                          label: option.label,
                        })
                      }>
                      <CloseIcon height={8} width={8} />
                    </div>
                  </StyledMultipleSelectItem>
                ))
              : placeholder}
          </StyledMultipleSelect>
          <StyledArrowDownContainer state={selectState} onClick={onClick}>
            <ArrowDownIcon
              height={size === SelectSizeEnum.large ? 12 : 10}
              width={size === SelectSizeEnum.large ? 12 : 10}
            />
          </StyledArrowDownContainer>
        </StyledSelect>
      )}
      {/* Select for Search type */}
      {type === SelectTypeEnum.search && (
        <StyledSelect
          width={width}
          size={size}
          type={type}
          state={selectState}
          onClick={onSearchClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
          {selectState !== SelectStateEnum.focused && (
            <>
              <StyledSelectLabel>
                {selectedOptions != null && selectedOptions.length > 0
                  ? selectedOptions[0].label
                  : placeholder}
              </StyledSelectLabel>
              <StyledArrowDownContainer state={selectState}>
                <ArrowDownIcon
                  height={size === SelectSizeEnum.large ? 12 : 10}
                  width={size === SelectSizeEnum.large ? 12 : 10}
                />
              </StyledArrowDownContainer>
            </>
          )}
          {selectState === SelectStateEnum.focused && (
            <>
              <div>
                <StyledSearchInput
                  type="text"
                  value={searchInputValue}
                  onChange={onSearchInputChange}
                  placeholder={placeholder}
                  autoFocus
                />
              </div>
              <StyledArrowDownContainer state={selectState}>
                <MagnifyGlassIcon
                  height={size === SelectSizeEnum.large ? 20 : 10}
                  width={size === SelectSizeEnum.large ? 20 : 10}
                />
              </StyledArrowDownContainer>
            </>
          )}
        </StyledSelect>
      )}
      {/* Menu for Basic and Multiple type */}
      {menuIsVisible && type !== SelectTypeEnum.search && (
        <StyledBasicMenu size={size}>
          {optionsList.map(option => (
            <StyledBasicMenuItem
              key={option.value}
              isSelected={
                selectedOptions != null &&
                selectedOptions.length > 0 &&
                selectedOptions.find(
                  selected => selected.value === option.value,
                )
              }
              onClick={() =>
                toggleOptionSelection({
                  value: option.value,
                  label: option.label,
                })
              }>
              {option.label}
            </StyledBasicMenuItem>
          ))}
        </StyledBasicMenu>
      )}
      {/* Menu for Search type */}
      {menuIsVisible && type === SelectTypeEnum.search && (
        <StyledBasicMenu size={size}>
          {optionsList.map(
            option =>
              option.label
                .toLowerCase()
                .includes(searchInputValue.toLowerCase()) && (
                <StyledBasicMenuItem
                  key={option.value}
                  isSelected={
                    selectedOptions != null &&
                    selectedOptions.length > 0 &&
                    selectedOptions.find(
                      selected => selected.value === option.value,
                    )
                  }
                  onClick={() =>
                    toggleOptionSelection({
                      value: option.value,
                      label: option.label,
                    })
                  }>
                  {option.label}
                </StyledBasicMenuItem>
              ),
          )}
        </StyledBasicMenu>
      )}
    </div>
  );
};

export { Select, SelectSizeEnum, SelectTypeEnum, SelectStateEnum };
  
// for multiple selection grow vertically, then scroll
// add check mark if user has multiple options selected
// limit menu height
// remove scrollbar, make scrollbar dragable
// make menu position dynamicaly based on select element bottom margin
// pass width to select element as prop