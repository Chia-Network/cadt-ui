import React, { useEffect, useRef, useState } from 'react';
import styled, { withTheme, css } from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  ArrowDownIcon,
  MagnifyGlassIcon,
  CloseIcon,
  CheckIcon,
} from '../icons';
import ScrollContainer from 'react-indiana-drag-scroll';

const SimpleSelectSizeEnum = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const SimpleSelectTypeEnum = {
  basic: 'basic',
  multiple: 'multiple',
  search: 'search',
};

const SimpleSelectStateEnum = {
  default: 'default',
  hover: 'hover',
  focused: 'focused',
  filled: 'filled',
  disabled: 'disabled',
};

const SimpleSelectVariantEnum = {
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
    if (props.size === SimpleSelectSizeEnum.large) {
      return css`
        height: 2.5rem;
        padding: 0.5rem 0.75rem 0.5rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5rem;
      `;
    } else if (props.size === SimpleSelectSizeEnum.small) {
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
    if (props.state === SimpleSelectStateEnum.hover) {
      return `border: 1px solid #40A9FF;`;
    } else if (props.state === SimpleSelectStateEnum.focused) {
      return `
        border: 1px solid ${props.theme.colors.default.primary};
        box-shadow: 0px 0px 4px rgba(24, 144, 255, 0.5);
      `;
    } else if (props.state === SimpleSelectStateEnum.disabled) {
      return `
        background: #F5F5F5;
        color: #BFBFBF;
        cursor: default;`;
    }
  }};
  ${props => {
    if (props.variant === SimpleSelectVariantEnum.error) {
      if (props.state === SimpleSelectStateEnum.focused) {
        return css`
          border: 1px solid #f5222d;
          box-shadow: 0px 0px 4px rgba(245, 34, 45, 0.5);
        `;
      } else if (props.state === SimpleSelectStateEnum.hover) {
        return css`
          border: 1px solid #f5222d;
        `;
      }
      return css`
        border: 1px solid #f5222d;
      `;
    }
  }}
  ${props => props.type === SimpleSelectTypeEnum.multiple && `height: 100%;`};
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
  transform: translateX(0);
  transition: 8s;
  ${props => {
    if (props.width && props.scrollWidth && props.scrollWidth > props.width) {
      return `  
          &:hover {
            transform: translateX(calc(${props.width}px - ${
        props.scrollWidth + 10
      }px));
          }
        `;
    }
  }}
`;

const StyledArrowDownContainer = styled('div')`
  ${props => {
    if (props.state === SimpleSelectStateEnum.disabled) {
      return `color: #BFBFBF;`;
    } else if (props.state === SimpleSelectStateEnum.focused) {
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
    if (props.size === SimpleSelectSizeEnum.large) {
      return css`
        font-size: 1rem;
      `;
    } else if (props.size === SimpleSelectSizeEnum.small) {
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

const BasicMenuItem = ({ children, isSelected, onClick, width }) => {
  const [scrollWidth, setScrollWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (ref?.current?.scrollWidth) {
      setScrollWidth(ref.current.scrollWidth);
    }
  }, [ref, ref.current]);

  return (
    <StyledBasicMenuItem
      ref={ref}
      isSelected={isSelected}
      onClick={onClick}
      width={width}
      scrollWidth={scrollWidth}
    >
      {children}
    </StyledBasicMenuItem>
  );
};

const SimpleSelect = withTheme(
  ({
    size = SimpleSelectSizeEnum.default,
    type = SimpleSelectTypeEnum.basic,
    state = SimpleSelectStateEnum.default,
    variant,
    options,
    selected,
    placeholder,
    width = '20rem',
    onChange,
    addInput,
    onBlur,
  }) => {
    const [menuIsVisible, setMenuIsVisible] = useState(false);
    const [selectState, setSelectState] = useState(state);
    const [selectedOptions, setSelectedOptions] = useState(selected || null);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [inputValue, setInputValue] = useState(false);
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
      setSelectState(state);
    }, [state]);

    useEffect(() => {
      if (ref && ref.current) {
        setDropdownWidth(ref.current.getBoundingClientRect().width);
      }
    }, [ref, ref.current]);

    useEffect(() => {
      if (inputValue && !selectedOptions) {
        onSearchClick();
      }
    }, [menuIsVisible, inputValue, selectedOptions]);

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
          setSelectState(SimpleSelectStateEnum.default);
        }
        if (type === SimpleSelectTypeEnum.search) {
          setSearchInputValue('');
        }
      };
      if (ref && ref.current) {
        document.addEventListener('click', closeMenu);
      }
      return () => document.removeEventListener('click', closeMenu);
    }, [menuIsVisible, ref, ref.current]);

    const onClick = () => {
      if (selectState !== SimpleSelectStateEnum.disabled) {
        if (menuIsVisible) {
          setSelectState(SimpleSelectStateEnum.hover);
        }
        if (!menuIsVisible) {
          setSelectState(SimpleSelectStateEnum.focused);
        }
        setMenuIsVisible(!menuIsVisible);
      }
    };

    const onSearchClick = () => {
      if (selectState !== SimpleSelectStateEnum.disabled) {
        if (!menuIsVisible) {
          setSelectState(SimpleSelectStateEnum.focused);
          setMenuIsVisible(true);
        }
      }
    };

    const onMouseEnter = () => {
      if (
        selectState !== SimpleSelectStateEnum.focused &&
        selectState !== SimpleSelectStateEnum.disabled
      ) {
        setSelectState(SimpleSelectStateEnum.hover);
      }
    };

    const onMouseLeave = () => {
      if (
        selectState !== SimpleSelectStateEnum.focused &&
        selectState !== SimpleSelectStateEnum.disabled
      ) {
        setSelectState(SimpleSelectStateEnum.default);
      }
    };

    const addInputField = () => {
      setSelectedOptions(null);
      setInputValue(true);
    };

    const toggleOptionSelection = optionToToggle => {
      const optionIsAlreadySelected =
        selectedOptions != null && selectedOptions.length > 0
          ? selectedOptions.find(
              selectedOption => selectedOption === optionToToggle,
            )
          : false;
      if (type === SimpleSelectTypeEnum.multiple) {
        if (optionIsAlreadySelected) {
          setSelectedOptions(prevState =>
            prevState.filter(option => option !== optionToToggle),
          );
        } else {
          setSelectedOptions(prevState =>
            prevState != null
              ? [...prevState, optionToToggle]
              : [optionToToggle],
          );
        }
      } else if (type === SimpleSelectTypeEnum.search) {
        if (optionIsAlreadySelected) {
          setSelectedOptions(null);
        } else {
          setSelectedOptions([optionToToggle]);
        }
        setSearchInputValue('');
        setMenuIsVisible(false);
      } else {
        if (optionIsAlreadySelected) {
          setSelectedOptions(null);
        } else {
          setSelectedOptions([optionToToggle]);
        }
        setSelectState(SimpleSelectStateEnum.default);
        setMenuIsVisible(false);
      }
    };

    const onSearchInputChange = e => {
      if (inputValue) {
        setSelectedOptions([e.target.value]);
      }
      setSearchInputValue(e.target.value);
    };

    return (
      <div style={{ position: 'relative' }} ref={ref}>
        {/* Select for Basic type */}
        {type === SimpleSelectTypeEnum.basic && !inputValue && (
          <StyledSelect
            ref={selectRef}
            size={size}
            width={width}
            type={type}
            state={selectState}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            variant={variant}
            onBlur={onBlur}
          >
            <StyledSelectLabel>
              {selectedOptions != null && selectedOptions.length > 0
                ? selectedOptions[0]
                : placeHolderText}
            </StyledSelectLabel>
            <StyledArrowDownContainer state={selectState}>
              <ArrowDownIcon
                height={size === SimpleSelectSizeEnum.large ? 12 : 10}
                width={size === SimpleSelectSizeEnum.large ? 12 : 10}
              />
            </StyledArrowDownContainer>
          </StyledSelect>
        )}
        {/* Select for Multiple type */}
        {type === SimpleSelectTypeEnum.multiple && (
          <StyledSelect
            ref={selectRef}
            width={width}
            size={size}
            type={type}
            state={selectState}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onBlur={onBlur}
          >
            <StyledMultipleSelect>
              {selectedOptions != null && selectedOptions.length > 0
                ? selectedOptions.map(option => (
                    <StyledMultipleSelectItem key={option}>
                      {option}
                      <div
                        style={{ marginLeft: '5px' }}
                        onClick={() => toggleOptionSelection(option)}
                      >
                        <CloseIcon height={8} width={8} />
                      </div>
                    </StyledMultipleSelectItem>
                  ))
                : placeHolderText}
            </StyledMultipleSelect>
            <StyledArrowDownContainer state={selectState} onClick={onClick}>
              <ArrowDownIcon
                height={size === SimpleSelectSizeEnum.large ? 12 : 10}
                width={size === SimpleSelectSizeEnum.large ? 12 : 10}
              />
            </StyledArrowDownContainer>
          </StyledSelect>
        )}
        {/* Select for Search type */}
        {(type === SimpleSelectTypeEnum.search || inputValue) && (
          <StyledSelect
            ref={selectRef}
            width={width}
            size={size}
            type={type}
            state={selectState}
            onClick={onSearchClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onBlur={onBlur}
          >
            {selectState !== SimpleSelectStateEnum.focused && (
              <>
                <StyledSelectLabel>
                  {selectedOptions != null && selectedOptions.length > 0
                    ? selectedOptions[0]
                    : inputValue
                    ? null
                    : placeHolderText}
                </StyledSelectLabel>
                <StyledArrowDownContainer state={selectState}>
                  <ArrowDownIcon
                    height={size === SimpleSelectSizeEnum.large ? 12 : 10}
                    width={size === SimpleSelectSizeEnum.large ? 12 : 10}
                  />
                </StyledArrowDownContainer>
              </>
            )}
            {selectState === SimpleSelectStateEnum.focused && (
              <>
                <div style={inputValue && { width: '100%' }}>
                  <StyledSearchInput
                    type="text"
                    value={searchInputValue}
                    onChange={onSearchInputChange}
                    placeholder={
                      inputValue
                        ? intl.formatMessage({ id: `add-unlisted-${addInput}` })
                        : placeHolderText
                    }
                    autoFocus
                  />
                </div>
                <StyledArrowDownContainer state={selectState}>
                  {!inputValue && (
                    <MagnifyGlassIcon
                      height={size === SimpleSelectSizeEnum.large ? 20 : 16}
                      width={size === SimpleSelectSizeEnum.large ? 20 : 16}
                    />
                  )}
                </StyledArrowDownContainer>
              </>
            )}
          </StyledSelect>
        )}
        {/* Menu for Basic and Multiple type */}
        {menuIsVisible && type !== SimpleSelectTypeEnum.search && !inputValue && (
          <StyledBasicMenu size={size} top={menuTopPosition}>
            {addInput && (
              <BasicMenuItem
                isSelected={inputValue}
                onClick={() => addInputField()}
                width={dropdownWidth}
              >
                <FormattedMessage id={`add-unlisted-${addInput}`} />
              </BasicMenuItem>
            )}
            {options.map(option => {
              const isSelected =
                selectedOptions != null &&
                selectedOptions.length > 0 &&
                selectedOptions.find(selected => selected === option);

              return (
                <BasicMenuItem
                  key={option}
                  isSelected={isSelected}
                  onClick={() => toggleOptionSelection(option)}
                  width={dropdownWidth}
                >
                  {option}
                  {isSelected && type === SimpleSelectTypeEnum.multiple && (
                    <CheckIcon width={12} height={12} />
                  )}
                </BasicMenuItem>
              );
            })}
          </StyledBasicMenu>
        )}
        {/* Menu for Search type */}
        {menuIsVisible && (type === SimpleSelectTypeEnum.search || inputValue) && (
          <StyledBasicMenu size={size} top={menuTopPosition}>
            {options.map(
              option =>
                option
                  .toLowerCase()
                  .includes(searchInputValue.toLowerCase()) && (
                  <BasicMenuItem
                    key={option}
                    isSelected={
                      selectedOptions != null &&
                      selectedOptions.length > 0 &&
                      selectedOptions.find(selected => selected === option)
                    }
                    onClick={() => toggleOptionSelection(option)}
                    width={dropdownWidth}
                  >
                    {option}
                  </BasicMenuItem>
                ),
            )}
          </StyledBasicMenu>
        )}
      </div>
    );
  },
);

export {
  SimpleSelect,
  SimpleSelectSizeEnum,
  SimpleSelectTypeEnum,
  SimpleSelectStateEnum,
  SimpleSelectVariantEnum,
};
