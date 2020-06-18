import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Button from "@Style/Button";
import Text from "@Style/Text";

import Header from "@Header/Header";
import NavigationButton from "@NavigationButton/NavigationButton";
import PersonalInputBox from "@InputBox/PersonalInputBox";
import DatePickers from "./DatePickers";
import { getMilestoneDetail } from "@Modules/milestone";

const CreateMilestonePage = ({ getMilestoneDetail, milestoneDetail, loadingMilestoneDetail }) => {
  let history = useHistory();
  const { milestoneId } = useParams();

  console.log(milestoneId);
  useEffect(() => {
    const fn = async () => {
      try {
        await getMilestoneDetail();
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  }, [getMilestoneDetail]);

  !loadingMilestoneDetail && console.log(milestoneDetail);

  const [titleContent, setTitleContent] = useState(!loadingMilestoneDetail && milestoneDetail && milestoneDetail.title);
  const [dateContent, setDateContent] = useState(!loadingMilestoneDetail && milestoneDetail && milestoneDetail.dueDate);
  const [descriptionContent, setDescriptionContent] = useState(!loadingMilestoneDetail && milestoneDetail && milestoneDetail.description);

  const onSetTitle = (e) => {
    setTitleContent(e.target.value);
  };

  const onSetDescription = (e) => {
    setDescriptionContent(e.target.value);
  };

  const onCreateMilestone = () => {
    history.push(`/MilestonePage`);
  };

  return (
    <>
      <Header />
      <Wrapper>
        <ContentWrapper>
          <InfoWrapper>
            {milestoneId ? (
              <NavigationButton isMilestone />
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
            <PersonalInputBox title="Title" widthSize="50%" backgroundColor="gray1" placeholder="Title" onChange={onSetTitle}>
              {titleContent}
            </PersonalInputBox>
            <Text fontWeight="bold">Due date (optional)</Text>
            <DatePickers defaultValue={dateContent || "연도-월-일"}></DatePickers>
            <Text fontWeight="bold">Description (optional)</Text>
            <DescriptionBox onChange={onSetDescription}>{descriptionContent}</DescriptionBox>
          </Content>
          <ButtonWrapper>
            {milestoneId ? (
              <>
                <Button backgroundColor="gray1" color="black" onClick={() => history.push(`/MilestonePage`)}>
                  Cancel
                </Button>
                <Button backgroundColor="gray1" color="black" onClick={() => history.push(`/MilestonePage`)}>
                  Close milestone
                </Button>
                <Button onClick={() => history.push(`/MilestonePage`)}>Save changes</Button>
              </>
            ) : (
              <Button onClick={onCreateMilestone}>Create milestone</Button>
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
  max-width: 1000px;
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
    outline: none;
    background-color: white;
    border-color: ${({ theme }) => theme.colors.blue};
    box-shadow: inset 0 1px 2px ${({ theme }) => theme.colors.babyblue}, 0 0 0 0.2em ${({ theme }) => theme.colors.skyblue};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
`;

export default connect(
  ({ milestone, loading }) => ({
    milestoneDetail: milestone.milestoneDetail,
    loadingMilestoneDetail: loading["milestone/GET_MILESTONE_DETAIL"],
  }),
  {
    getMilestoneDetail,
  }
)(CreateMilestonePage);
