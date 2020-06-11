import React from "react";
import styled from "styled-components";

import Text from "@Style/Text";
const CommentViewBox = ({ owner }) => {
  return (
    <>
      <Wrapper>
        <Avatar src="https://avatars1.githubusercontent.com/u/30427711?s=88&u=0f6f414055ea0bec267856e35e8902b9f728fe1a&v=4"></Avatar>
        <CommentGroup>
          <CommentHeader owner={owner ? true : false}>
            <CommentText>
              <Text fontWeight="extraBold">choisohyun</Text>
              <Text color="gray4">
              </Text>
            </CommentText>
            <CommentAction>
              {owner && <Badge>Owner</Badge>}
              <Text color="gray4">Edit</Text>
              <Text color="gray4">Delete</Text>
            </CommentAction>
          </CommentHeader>
          <CommentContent>
          </CommentContent>
        </CommentGroup>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
`;

const Avatar = styled.img`
`;

const CommentGroup = styled.div`
`;

const CommentHeader = styled.div`
`;

const CommentContent = styled.div`
`;

const CommentText = styled.div`
`;

const CommentAction = styled.div`
`;

const Badge = styled.span`
`;

export default CommentViewBox;
