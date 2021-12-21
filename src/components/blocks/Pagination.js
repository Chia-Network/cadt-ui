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

const PagesContainer = withTheme(styled(ControlsContainer)`
  font-family: ${props => props.theme.typography.primary.regular};
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  ${props => {
    if (props.isActive) {
      return `border: 1px solid #3B8EE0;
                    color: #3B8EE0;`;
    } else {
      return `border: 1px solid #D9D9D9;
                    color: #262626;`;
    }
  }};
`);

const Pagination = ({ pages, current = 1, showLast = false, callback }) => {
  let displayedPages = [current];

  let numberOfAddedPages = 1;
  for (let x = 1; x < 5 && numberOfAddedPages < 5 && numberOfAddedPages < pages; x++) {
    if (current - x > 0) {
      displayedPages.unshift(current - x);
      numberOfAddedPages++;
    }
    if (current + x <= pages) {
      displayedPages.push(current + x);
      numberOfAddedPages++;
    }
  }

  const thereAreNoPages = pages === 0;
  const backButtonIsDisabled = current <= 1 || thereAreNoPages;
  const nextButtonIsDisabled = current === pages || thereAreNoPages;

  return (
    <PaginationContainer>
      <ControlsContainer
        isDisabled={backButtonIsDisabled}
        isBackButton={true}
        onClick={() => !backButtonIsDisabled && callback(current - 1)}>
        <ArrowDownIcon height={12} width={12} />
      </ControlsContainer>
      {displayedPages &&
        displayedPages.map(element => (
          <PagesContainer
            key={element}
            isActive={current === element}
            onClick={() => current !== element && callback(element)}>
            {element}
          </PagesContainer>
        ))}
      {showLast && current + 2 + 1 < pages && (
        <>
          <ThreeDotsIcon width={10} height={10} />
          <PagesContainer onClick={() => callback(pages)}>
            {pages}
          </PagesContainer>
        </>
      )}
      <ControlsContainer
        isDisabled={nextButtonIsDisabled}
        isNextButton
        onClick={() => !nextButtonIsDisabled && callback(current + 1)}>
        <ArrowDownIcon height={12} width={12} />
      </ControlsContainer>
    </PaginationContainer>
  );
};

export { Pagination };
