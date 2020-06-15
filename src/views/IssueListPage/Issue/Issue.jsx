import React from "react";
import styled from "styled-components";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import EventNoteIcon from "@material-ui/icons/EventNote";
import TimeAgo from "react-timeago";
import koreaStrings from "react-timeago/lib/language-strings/ko";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import Text from "@Style/Text";
import Badge from "@Style/Badge";

const formatter = buildFormatter(koreaStrings);

const Issue = (props) => {
  return (
    <>
      <Wrapper>
        <CheckboxWrapper>
          <Checkbox />
        </CheckboxWrapper>
        <OpenIcon />
        <IssueWrapper>
          <Title onClick={() => props.history.push(`/IssueDetailPage`)}>
            <Text fontWeight="bold" as="a">
              목록 보기 구현
            </Text>
            <Badge>bug</Badge>
          </Title>
          <Info>
            <Text fontSize="sm">#2 opened</Text>
            <Text fontSize="sm">
              <TimeAgo date="May 25, 2020" formatter={formatter} />
            </Text>
            <Text fontSize="sm">by choisohyun</Text>
            <Text fontSize="sm">
              <Milestone>
                <EventNoteIcon style={{ fontSize: 15 }} />
                스프린트2
              </Milestone>
            </Text>
          </Info>
        </IssueWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
`;

const CheckboxWrapper = styled.div`
  padding-right: 10px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })``;

const OpenIcon = styled(ErrorOutlineIcon)`
  color: ${({ theme }) => theme.colors.green};
  margin-right: 15px;
`;

const IssueWrapper = styled.div``;

const Title = styled.div`
  margin-bottom: 5px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 5px;
  }
`;

const Milestone = styled.span`
  display: flex;
  align-items: center;
  &:hover {
    color: ${({ theme }) => theme.colors.gray2};
    cursor: pointer;
  }
`;

export default Issue;