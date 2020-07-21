import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Button from "@Style/Button";

const Pagination = ({ numberOfPage, currentPage }) => {
  let history = useHistory();

  const pageNumbers = Array.from(Array(numberOfPage), (_, i) => i + 1);
  const prevPage = Number(currentPage) - 1;
  const nextPage = Number(currentPage) + 1;

  const onPass = (number) =>
    history.push({
      pathname: "/IssueListPage",
      search: `?page=${number}`,
    });

  return (
    <>
      <Wrapper>
        <PageLists>
          <PrevPageButton onClick={() => onPass(prevPage)}>
            <ArrowBackIosIcon />
          </PrevPageButton>
          {pageNumbers.map((number) => (
            <PageButton key={number} onClick={() => onPass(number)}>
              {number}
            </PageButton>
          ))}
          <NextPageButton onClick={() => onPass(nextPage)}>
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
  &::after {
    content: "Previous";
  }
`;

const PageButton = styled.button`
  cursor: pointer;
  font-size: 2rem;
  color: ${(props) => props.theme.uiColorOrange};
  margin: 0 0.3rem;
  padding: 0;
  border: none;
  background: none;
`;

const NextPageButton = styled(Button)`
  &::before {
    content: "Next";
  }
`;

export default Pagination;
