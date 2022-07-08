import React, { useEffect, useRef, useState } from 'react';
import styled, { withTheme, css } from 'styled-components';
import { useIntl } from 'react-intl';
import {
  ArrowDownIcon,
  MagnifyGlassIcon,
  CloseIcon,
  CheckIcon,
} from '../icons';
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

const SelectVariantEnum = {
  error: 'error',
};

const StyledSelect = styled('div')`
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
  background: ${props => props.theme.colors.default.onButton};
  z-index: 5;
  user-select: none;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-family: ${props => props.theme.typography.primary.regular};
  ${props => {
    if (props.size === SelectSizeEnum.large) {
      return css`
        height: 2.5rem;
        padding: 0.5rem 0.75rem 0.5rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5rem;
      `;
    } else if (props.size === SelectSizeEnum.small) {
      return css`
        height: 1.5rem;
        padding: 0.0625rem 0.5rem 0.0625rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.375rem;
      `;
    } else {
      return css`
        height: 2rem;
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
        border: 1px solid ${props.theme.colors.default.primary};
        box-shadow: 0px 0px 4px rgba(24, 144, 255, 0.5);
      `;
    } else if (props.state === SelectStateEnum.disabled) {
      return css`
        background: #f5f5f5;
        color: ${props.theme.colors.default.onSurface};
        cursor: default;
      `;
    }
  }};
  ${props => {
    if (props.variant === SelectVariantEnum.error) {
      if (props.state === SelectStateEnum.focused) {
        return css`
          border: 1px solid #f5222d;
          box-shadow: 0px 0px 4px rgba(245, 34, 45, 0.5);
        `;
      } else if (props.state === SelectStateEnum.hover) {
        return `border: 1px solid #f5222d;`;
      }
      return `border: 1px solid #f5222d;`;
    }
  }}
  ${props => props.type === SelectTypeEnum.multiple && `height: 100%;`};
`;

const StyledBasicMenu = styled(ScrollContainer)`
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  padding: 0.25rem 0rem 0.25rem 0rem;
  top: ${props => (props.top ? props.top + 10 + 'px' : '10px')};
  background: ${props => props.theme.colors.default.onButton};
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
    0px 6px 16px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
  border-radius: 0.125rem;
  z-index: 10;
`;

const StyledBasicMenuItem = styled('div')`
  padding: 0.3125rem 0.75rem 0.3125rem 0.75rem;
  ${props =>
    props.width ? `max-width: ${props.width}px;` : 'max-width: 18.5rem;'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
        background-color: ${props.theme.colors.default.status.info.secondary};
        font-style: normal;
        font-weight: 600;
      `;
    } else {
      return `font-weight: normal;`;
    }
  }};
  box-sizing: border-box;
`;

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

const StyledMultipleSelectItem = styled('div')`
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
`;

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

const StyledSelectLabel = styled('div')`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
`;

const Select = withTheme(
  ({
    size = SelectSizeEnum.default,
    type = SelectTypeEnum.basic,
    state = SelectStateEnum.default,
    options,
    selected,
    placeholder,
    width = '20rem',
    onChange,
    variant,
  }) => {
    const [menuIsVisible, setMenuIsVisible] = useState(false);
    const [selectState, setSelectState] = useState(state);
    const [optionsList, setOptionsList] = useState(options);
    const [selectedOptions, setSelectedOptions] = useState(selected || null);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [menuTopPosition, setMenuTopPosition] = useState(0);
    const selectedInitialized = useRef(null);
    const ref = useRef();
    const selectRef = useRef();
    const [dropdownWidth, setDropdownWidth] = useState(0);
    const intl = useIntl();
    const placeHolderText =
      placeholder ||
      ` -- ${intl.formatMessage({
        id: 'select',
      })} -- `;

    useEffect(() => {
      if (ref && ref.current) {
        setDropdownWidth(ref.current.getBoundingClientRect().width);
      }
    }, [ref, ref.current]);

    useEffect(() => {
      if (state) {
        setSelectState(state);
      }
    }, [state]);

    useEffect(() => {
      if (options) {
        setOptionsList(options);
      }
    }, [options]);

    useEffect(() => {
      if (selected !== undefined && selectedInitialized.current === null) {
        setSelectedOptions(selected);
        selectedInitialized.current = true;
      } else if (selected === undefined) {
        setSelectedOptions(null);
      }
    }, [selected]);

    useEffect(() => {
      const newHeight = selectRef.current.clientHeight;
      if (newHeight !== menuTopPosition) {
        setMenuTopPosition(newHeight);
      }

      if (onChange && selectedOptions) {
        onChange(selectedOptions);
      }
    }, [selectedOptions, selectRef.current]);

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
          ? selectedOptions.find(
              selectedOption => selectedOption.value === value,
            )
          : false;
      if (type === SelectTypeEnum.multiple) {
        if (optionIsAlreadySelected) {
          setSelectedOptions(prevState =>
            prevState.filter(option => option.label !== label),
          );
        } else {
          setSelectedOptions(prevState =>
            prevState != null
              ? [...prevState, { value, label }]
              : [{ value, label }],
          );
        }
      } else if (type === SelectTypeEnum.search) {
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
        setSelectState(SelectStateEnum.default);
        setMenuIsVisible(false);
      }
    };

    const onSearchInputChange = e => {
      setSearchInputValue(e.target.value);
    };

    return (
      <div style={{ position: 'relative' }} ref={ref}>
        {/* Select for Basic type */}
        {type === SelectTypeEnum.basic && (
          <StyledSelect
            variant={variant}
            ref={selectRef}
            size={size}
            width={width}
            type={type}
            state={selectState}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <StyledSelectLabel>
              {selectedOptions != null && selectedOptions.length > 0
                ? selectedOptions[0].label
                : placeHolderText}
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
            ref={selectRef}
            width={width}
            size={size}
            type={type}
            state={selectState}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
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
                        }
                      >
                        <CloseIcon height={8} width={8} />
                      </div>
                    </StyledMultipleSelectItem>
                  ))
                : placeHolderText}
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
            ref={selectRef}
            width={width}
            size={size}
            type={type}
            state={selectState}
            onClick={onSearchClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {selectState !== SelectStateEnum.focused && (
              <>
                <StyledSelectLabel>
                  {selectedOptions != null && selectedOptions.length > 0
                    ? selectedOptions[0].label
                    : placeHolderText}
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
                    placeholder={placeHolderText}
                    autoFocus
                  />
                </div>
                <StyledArrowDownContainer state={selectState}>
                  <MagnifyGlassIcon
                    height={size === SelectSizeEnum.large ? 20 : 16}
                    width={size === SelectSizeEnum.large ? 20 : 16}
                  />
                </StyledArrowDownContainer>
              </>
            )}
          </StyledSelect>
        )}
        {/* Menu for Basic and Multiple type */}
        {menuIsVisible && type !== SelectTypeEnum.search && (
          <StyledBasicMenu size={size} top={menuTopPosition}>
            {optionsList.map((option, index) => {
              const isSelected =
                selectedOptions != null &&
                selectedOptions.length > 0 &&
                selectedOptions.find(
                  selected => selected.value === option.value,
                );

              return (
                <StyledBasicMenuItem
                  key={index}
                  isSelected={isSelected}
                  onClick={() =>
                    toggleOptionSelection({
                      value: option.value,
                      label: option.label,
                    })
                  }
                  width={dropdownWidth}
                >
                  {option.label}
                  {isSelected && type === SelectTypeEnum.multiple && (
                    <CheckIcon width={12} height={12} />
                  )}
                </StyledBasicMenuItem>
              );
            })}
          </StyledBasicMenu>
        )}
        {/* Menu for Search type */}
        {menuIsVisible && type === SelectTypeEnum.search && (
          <StyledBasicMenu size={size} top={menuTopPosition}>
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
                    }
                    width={dropdownWidth}
                  >
                    {option.label}
                  </StyledBasicMenuItem>
                ),
            )}
          </StyledBasicMenu>
        )}
      </div>
    );
  },
);

export {
  Select,
  SelectSizeEnum,
  SelectTypeEnum,
  SelectStateEnum,
  SelectVariantEnum,
};
