import React from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Button from "@Style/Button";
import { addQueryParams } from "@Lib/addQueryParams";

const Pagination = ({ numberOfPage, currentPage }) => {
  let history = useHistory();
  let location = useLocation();
  currentPage = currentPage ? currentPage : 1;

  const pageNumbers = Array.from(Array(numberOfPage), (_, i) => i + 1);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const isManyPage = numberOfPage >= 10;
  const isFrontPage = currentPage < 7;
  const isMiddlePage = currentPage >= 7 && currentPage <= numberOfPage - 6;
  const isEndPage = currentPage > numberOfPage - 6;

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= numberOfPage;

  const addPageQuery = (pageNumber) => addQueryParams(history, location, "page", pageNumber);

  const page = (number) => (
    <PageButton key={number} onClick={() => addPageQuery(number)} className={currentPage === number ? "focus" : "default"}>
      {number}
    </PageButton>
  );

  return (
    <>
      <Wrapper>
        <PageLists>
          <PrevPageButton onClick={() => addPageQuery(prevPage)} disabled={isPrevDisabled} backgroundColor="white" color="blue">
            <ArrowBackIosIcon />
          </PrevPageButton>
          {!isManyPage && pageNumbers.map((number) => page(number))}
          {isManyPage && isFrontPage && (
            <>
              {pageNumbers.slice(0, currentPage + 2).map((number) => page(number))}
              ...
              {pageNumbers.slice(18, numberOfPage).map((number) => page(number))}
            </>
          )}
          {isManyPage && isMiddlePage && (
            <>
              {pageNumbers.slice(0, 2).map((number) => page(number))}
              ...
              {pageNumbers.slice(currentPage - 3, currentPage + 2).map((number) => page(number))}
              ...
              {pageNumbers.slice(18, numberOfPage).map((number) => page(number))}
            </>
          )}
          {isManyPage && isEndPage && (
            <>
              {pageNumbers.slice(0, 2).map((number) => page(number))}
              ...
              {pageNumbers.slice(currentPage - 3, numberOfPage).map((number) => page(number))}
            </>
          )}
          <NextPageButton onClick={() => addPageQuery(nextPage)} disabled={isNextDisabled} backgroundColor="white" color="blue">
            <ArrowForwardIosIcon />
          </NextPageButton>
        </PageLists>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageLists = styled.div`
  display: flex;
`;

const PrevPageButton = styled(Button)`
  height: 2rem;
  border: none;
  &::after {
    content: "Previous";
  }
`;

const PageButton = styled.button`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 0 0.2rem;
  padding: 5px 12px;
  border: none;
  background: none;
  &.default {
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
  }
  &.focus {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 6px;
  }
`;

const NextPageButton = styled(Button)`
  height: 2rem;
  border: none;
  &::before {
    content: "Next";
  }
`;

export default Pagination;
