import React from "react";
import styled from "styled-components";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import EventNoteIcon from "@material-ui/icons/EventNote";
import TimeAgo from "react-timeago";
import koreaStrings from "react-timeago/lib/language-strings/ko";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import Text from "@Style/Text";

const formatter = buildFormatter(koreaStrings);

const IssueList = () => {
  return (
    <Wrapper>
      <CheckboxWrapper>
        <Checkbox />
      </CheckboxWrapper>
      <OpenIcon />
      <IssueWrapper>
        <Title>
          <Text fontWeight="bold" as="a">
            목록 보기 구현
          </Text>
          <Badge>bug</Badge>
        </Title>
        <Info>
          <Text fontSize="sm">#2 opened</Text>
          <Text fontSize="sm">
            <TimeAgo date="May 25, 2020" formatter={formatter} />{" "}
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
  );
};

const Wrapper = styled.div``;

const CheckboxWrapper = styled.div``;

const Checkbox = styled.input.attrs({ type: "checkbox" })``;

const OpenIcon = styled(ErrorOutlineIcon)``;

const IssueWrapper = styled.div``;

const Title = styled.div``;

const Badge = styled.span``;

const Info = styled.div``;

const Milestone = styled.span``;

export default IssueList;
