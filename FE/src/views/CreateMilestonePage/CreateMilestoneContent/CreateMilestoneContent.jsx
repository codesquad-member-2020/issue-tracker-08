import React from "react";
import styled from "styled-components";

import Text from "@Style/Text";

import PersonalInputBox from "@InputBox/PersonalInputBox";
import DatePickers from "@CreateMilestonePage/DatePickers";

const CreateMilestoneContent = ({ getDefaultValue, onSetTitle, onSetDescription, onSetDate }) => {
  return (
    <>
      <Wrapper>
        <PersonalInputBox
          title="Title"
          widthSize="50%"
          backgroundColor="gray1"
          placeholder="Title"
          value={getDefaultValue("title")}
          onChange={onSetTitle}
        />
        <Text fontWeight="bold">Due date (optional)</Text>
        <DatePickers defaultValue={getDefaultValue("dueDate")} onChange={onSetDate}></DatePickers>
        <Text fontWeight="bold">Description (optional)</Text>
        <DescriptionBox defaultValue={getDefaultValue("description")} onChange={onSetDescription}></DescriptionBox>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  flex-direction: column;
  padding: 20px 0;
`;

const DescriptionBox = styled.textarea`
  margin-top: 5px;
  min-height: 120px;
  max-height: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  width: 80%;
  background-color: ${({ theme }) => theme.colors.gray1};
  resize: vertical;
  overflow-y: scroll;
  &:focus {
    background-color: white;
    outline: none;
    background-color: white;
    border-color: ${({ theme }) => theme.colors.blue};
    box-shadow: inset 0 1px 2px ${({ theme }) => theme.colors.babyblue}, 0 0 0 0.2em ${({ theme }) => theme.colors.skyblue};
  }
`;

export default CreateMilestoneContent;
