import React from "react";
import styled from "styled-components";

const Table = ({ tableHeader, tableList }) => {
  return (
    <>
      <Wrapper>
        <TableWrapper>
          <Header>{tableHeader}</Header>
          {tableList}
        </TableWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

const TableWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 5px;
  width: 65%;
  max-width: 1000px;
`;

const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1};
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

export default Table;
