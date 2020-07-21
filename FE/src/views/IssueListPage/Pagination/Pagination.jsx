import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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
          {pageNumbers.map((number) => (
            <PageButton key={number} onClick={() => onPass(number)}>
              {number}
            </PageButton>
          ))}
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

const PageLists = styled.ul`
  display: flex;
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

export default Pagination;
