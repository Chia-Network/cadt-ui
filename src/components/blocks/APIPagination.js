import React, { useState, useEffect } from 'react';
import styled, { withTheme, css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ArrowDownIcon, ThreeDotsIcon } from '..';
import { getPaginatedData } from '../../store/actions/climateWarehouseActions';
import constants from '../../constants';

export const PaginationContainer = styled('div')`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  background-color: ${props => props.theme.colors.default.white};
  color: ${props => props.theme.colors.default.secondary};
`;

export const ControlsContainer = styled('div')`
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.default.shade5};
  box-sizing: border-box;
  border-radius: 2px;
  ${props =>
    props.isDisabled &&
    `background: ${props.theme.colors.default.shade6}; color: ${props.theme.colors.default.shade5}; cursor: default;`};
  ${props =>
    props.isBackButton &&
    `transform-origin: center;   
    transform: rotate(90deg);`};
  ${props =>
    props.isNextButton &&
    `transform-origin: center;   
    transform: rotate(270deg);`};

  ${props =>
    !props.isDisabled &&
    (props.isNextButton || props.isBackButton) &&
    css`
      :hover {
        color: ${props => props.theme.colors.default.secondaryDark};
        border: 1px solid ${props => props.theme.colors.default.secondaryDark};
      }
    `}
`;

export const PagesContainer = styled(ControlsContainer)`
  font-family: ${props => props.theme.typography.primary.regular};
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  ${props => {
    if (props.isActive) {
      return `border: 1px solid ${props.theme.colors.default.secondaryDark};
                    color: ${props.theme.colors.default.secondaryDark};`;
    } else {
      return `border: 1px solid ${props.theme.colors.default.shade5};
                    color: ${props.theme.colors.default.secondary};`;
    }
  }};

  :hover {
    ${props => {
      if (props.isActive) {
        return `border: 1px solid ${props.theme.colors.default.secondaryDark};
                    color: ${props.theme.colors.default.secondaryDark};`;
      } else {
        return `border: 1px solid ${props.theme.colors.default.secondaryDark};
                    color: ${props.theme.colors.default.secondaryDark};`;
      }
    }};
  }
`;

const APIPagination = withTheme(({ showLast = false, actions }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(
    climateWarehouseStore.pageCount || 1,
  );
  const backButtonIsDisabled = currentPageNumber === 1;
  const nextButtonIsDisabled = currentPageNumber === numberOfPages;

  useEffect(() => {
    setCurrentPageNumber(1);
    setNumberOfPages(climateWarehouseStore.pageCount || 1);
  }, [climateWarehouseStore.pageCount, searchParams.get('myRegistry')]);

  const changeCurrentPageTo = newPage => {
    setCurrentPageNumber(newPage);

    const options = {
      type: actions.toLowerCase(),
      page: newPage,
      resultsLimit: constants.MAX_TABLE_SIZE,
    };
    if (searchParams.has('search')) {
      options.searchQuery = searchParams.get('search');
    }
    if (searchParams.get('orgUid') !== 'all') {
      options.orgUid = searchParams.get('orgUid');
    }
    dispatch(getPaginatedData(options));
  };

  let displayedPages = [currentPageNumber];
  let numberOfAddedPages = 1;
  for (
    let i = 1;
    i < 5 && numberOfAddedPages < 5 && numberOfAddedPages < numberOfPages;
    i++
  ) {
    if (currentPageNumber - i > 0) {
      displayedPages.unshift(currentPageNumber - i);
      numberOfAddedPages++;
    }
    if (currentPageNumber + i <= numberOfPages) {
      displayedPages.push(currentPageNumber + i);
      numberOfAddedPages++;
    }
  }

  return (
    <PaginationContainer>
      <ControlsContainer
        isDisabled={backButtonIsDisabled}
        isBackButton={true}
        onClick={() =>
          !backButtonIsDisabled && changeCurrentPageTo(currentPageNumber - 1)
        }
      >
        <ArrowDownIcon height={12} width={12} />
      </ControlsContainer>
      {displayedPages &&
        displayedPages.map(element => (
          <PagesContainer
            key={element}
            isActive={currentPageNumber === element}
            onClick={() =>
              currentPageNumber !== element && changeCurrentPageTo(element)
            }
          >
            {element}
          </PagesContainer>
        ))}
      {showLast && currentPageNumber + 3 < numberOfPages && numberOfPages > 5 && (
        <>
          <ThreeDotsIcon width={10} height={10} />
          <PagesContainer onClick={() => changeCurrentPageTo(numberOfPages)}>
            {numberOfPages}
          </PagesContainer>
        </>
      )}
      <ControlsContainer
        isDisabled={nextButtonIsDisabled}
        isNextButton
        onClick={() =>
          !nextButtonIsDisabled && changeCurrentPageTo(currentPageNumber + 1)
        }
      >
        <ArrowDownIcon height={12} width={12} />
      </ControlsContainer>
    </PaginationContainer>
  );
});

export { APIPagination };
