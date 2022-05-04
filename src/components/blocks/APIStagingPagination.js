import React, { useState, useEffect } from 'react';
import { withTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowDownIcon,
  ThreeDotsIcon,
  PagesContainer,
  ControlsContainer,
  PaginationContainer,
} from '..';
import constants from '../../constants';
import { getStagingPaginatedData } from '../../store/actions/climateWarehouseActions';

const APIStagingPagination = withTheme(
  ({ showLast = false, actions, formType }) => {
    const dispatch = useDispatch();
    const climateWarehouseStore = useSelector(store => store.climateWarehouse);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(
      climateWarehouseStore.pageCount || 1,
    );
    const backButtonIsDisabled = currentPageNumber === 1;
    const nextButtonIsDisabled = currentPageNumber === numberOfPages;

    useEffect(() => {
      setCurrentPageNumber(1);
      setNumberOfPages(climateWarehouseStore.stagingPageCount || 1);
    }, [climateWarehouseStore.stagingPageCount]);

    const changeCurrentPageTo = newPage => {
      setCurrentPageNumber(newPage);

      const options = {
        type: actions,
        page: newPage,
        formType: formType[0]?.table,
        resultsLimit: constants.MAX_TABLE_SIZE,
      };

      dispatch(getStagingPaginatedData(options));
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
        {showLast &&
          currentPageNumber + 3 < numberOfPages &&
          numberOfPages > 5 && (
            <>
              <ThreeDotsIcon width={10} height={10} />
              <PagesContainer
                onClick={() => changeCurrentPageTo(numberOfPages)}
              >
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
  },
);

export { APIStagingPagination };
