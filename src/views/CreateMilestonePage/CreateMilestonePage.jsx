import React from "react";
import styled from "styled-components";

import Button from "@Style/Button";
import Text from "@Style/Text";

import Header from "@Header/Header";
import NavigationButton from "@NavigationButton/NavigationButton";
import PersonalInputBox from "@InputBox/PersonalInputBox";
import DatePickers from "./DatePickers";

const CreateMilestonePage = (props) => {
  const isEdit = props.match.params.state === "isEdit";
  return (
    <>
      <Header history={props.history} />
      <Wrapper>
        <ContentWrapper>
          <InfoWrapper>
            {isEdit ? (
              <NavigationButton history={props.history} isMilestone />
            ) : (
              <>
                <Text fontSize="xl" fontWeight="bold">
                  New milestone
                </Text>
                <Text>Create a new milestone to help organize your issues and pull requests. Learn more about milestones and issues.</Text>
              </>
            )}
          </InfoWrapper>
          <Content>
            <PersonalInputBox title="Title" widthSize="50%" backgroundColor="gray1" placeholder="Title" value={props.title}></PersonalInputBox>
            <Text fontWeight="bold">Due date (optional)</Text>
            <DatePickers defaultValue={props.date || "연도-월-일"}></DatePickers>
            <Text fontWeight="bold">Description (optional)</Text>
            <DescriptionBox value={props.description} />
          </Content>
          <ButtonWrapper>
            {isEdit ? (
              <>
                <Button backgroundColor="gray1" color="black" onClick={() => props.history.push(`/MilestonePage`)}>
                  Cancel
                </Button>
                <Button backgroundColor="gray1" color="black" onClick={() => props.history.push(`/MilestonePage`)}>
                  Close milestone
                </Button>
                <Button onClick={() => props.history.push(`/MilestonePage`)}>Save changes</Button>
              </>
            ) : (
              <Button onClick={() => props.history.push(`/MilestonePage`)}>Create milestone</Button>
            )}
          </ButtonWrapper>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

const ContentWrapper = styled.div`
  width: 65%;
  flex-direction: column;
`;

const InfoWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  flex-direction: column;
  padding: 20px 0;
  align-items: end;
`;

const Content = styled.div`
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
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
`;

export default CreateMilestonePage;
