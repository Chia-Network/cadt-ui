import React from 'react';
import styled, { withTheme } from 'styled-components';
import { ArrowDownIcon, ThreeDotsIcon } from '..';

const PaginationContainer = styled('div')`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  color: #8c8c8c;
  background-color: white;
`;

const ControlsContainer = styled('div')`
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 2px;
  ${props =>
    props.isDisabled &&
    `background: #F5F5F5; color: #D9D9D9; cursor: default;`};
  ${props =>
    props.isBackButton &&
    `transform-origin: center;   
    transform: rotate(90deg);`};
  ${props =>
    props.isNextButton &&
    `transform-origin: center;   
    transform: rotate(270deg);`};
`;

const PagesContainer = styled(ControlsContainer)`
  font-family: ${props => props.theme.typography.primary.regular};
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  ${props => {
    if (props.isActive) {
      return `border: 1px solid ${props.theme.colors.default.primary};
                    color: ${props.theme.colors.default.primary};`;
    } else {
      return `border: 1px solid #D9D9D9;
                    color: #262626;`;
    }
  }};
`;

const Pagination = withTheme(({ pages, current, showLast = false, callback }) => {
  // if current page number higher or equal than number of pages, first page is displayed
  const currentPageNumber =
    current && current > 0 && current < pages ? current + 1 : 1;
  const numberOfPages = pages && pages !== 0 ? pages : 1;
  const changeCurrentPageTo = value => callback(value - 1);
  const backButtonIsDisabled = currentPageNumber === 1;
  const nextButtonIsDisabled = currentPageNumber === numberOfPages;

  let displayedPages = [currentPageNumber];
  let numberOfAddedPages = 1;
  for (
    let x = 1;
    x < 5 && numberOfAddedPages < 5 && numberOfAddedPages < numberOfPages;
    x++
  ) {
    if (currentPageNumber - x > 0) {
      displayedPages.unshift(currentPageNumber - x);
      numberOfAddedPages++;
    }
    if (currentPageNumber + x <= numberOfPages) {
      displayedPages.push(currentPageNumber + x);
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
        }>
        <ArrowDownIcon height={12} width={12} />
      </ControlsContainer>
      {displayedPages &&
        displayedPages.map(element => (
          <PagesContainer
            key={element}
            isActive={currentPageNumber === element}
            onClick={() =>
              currentPageNumber !== element && changeCurrentPageTo(element)
            }>
            {element}
          </PagesContainer>
        ))}
      {showLast && currentPageNumber + 2 + 1 < numberOfPages && numberOfPages > 5 && (
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
        }>
        <ArrowDownIcon height={12} width={12} />
      </ControlsContainer>
    </PaginationContainer>
  );
});

export { Pagination };
