import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Button from "@Style/Button";
import Text from "@Style/Text";

import Header from "@Header/Header";
import NavigationButton from "@NavigationButton/NavigationButton";
import PersonalInputBox from "@InputBox/PersonalInputBox";
import DatePickers from "@CreateMilestonePage/DatePickers";
import { getMilestoneDetail, postMilestone, putMilestone } from "@Modules/milestone";

const CreateMilestonePage = ({ getMilestoneDetail, postMilestone, putMilestone, milestoneDetail, loadingMilestoneDetail }) => {
  let history = useHistory();
  let { milestoneId } = useParams();

  useEffect(() => {
    const fn = async () => {
      try {
        await getMilestoneDetail(milestoneId);
        initContent();
      } catch (e) {
        console.log(e);
      }
    };
    if (milestoneId) fn();
  }, [getMilestoneDetail, postMilestone, putMilestone]);

  const postHandler = (params) => {
    const fn = async () => {
      try {
        await postMilestone(params);
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  };

  const putHandler = (params) => {
    const fn = async () => {
      try {
        await putMilestone({ milestoneId, params });
      } catch (e) {
        console.log(e);
      }
    };
    if (milestoneId) fn();
  };

  const data = (key) => {
    if (key) return !loadingMilestoneDetail && milestoneDetail && milestoneDetail[key];
    return !loadingMilestoneDetail && milestoneDetail;
  };

  // const [titleContent, setTitleContent] = useState(data("title"));
  // const [dateContent, setDateContent] = useState(data("dueDate"));
  // const [descriptionContent, setDescriptionContent] = useState(data("description"));
  // 수정할때 바꾸지 않은 데이터는 초기값이 안넘어가는 문제 해결중
  const [titleContent, setTitleContent] = useState("");
  const [dateContent, setDateContent] = useState("");
  const [descriptionContent, setDescriptionContent] = useState("");

  const initContent = () => {
    if (!data()) return;
    setTitleContent(data("title"));
    setDateContent(data("dueDate"));
    setDescriptionContent(data("description"));
    // setTitleContent(milestoneDetail[title]);
    // setDateContent(milestoneDetail[dueDate]);
    // setDescriptionContent(milestoneDetail[description]);
  };

  const onSetTitle = ({ target }) => setTitleContent(target.value);
  const onSetDescription = ({ target }) => setDescriptionContent(target.value);
  const onSetDate = ({ target }) => setDateContent(target.value);

  const onPassMilestonePage = () => history.push(`/MilestonePage`);

  const params = { title: titleContent, due_date: dateContent, description: descriptionContent };

  const onCreateMilestone = () => {
    postHandler(params);
    onPassMilestonePage();
  };

  const onSaveMilestone = () => {
    putHandler(params);
    onPassMilestonePage();
  };

  return (
    <>
      <Header />
      {(!milestoneId || data()) && (
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
              <PersonalInputBox
                title="Title"
                widthSize="50%"
                backgroundColor="gray1"
                placeholder="Title"
                value={milestoneId && data("title")}
                onChange={onSetTitle}
              ></PersonalInputBox>
              <Text fontWeight="bold">Due date (optional)</Text>
              <DatePickers defaultValue={milestoneId && data("dueDate")} onChange={onSetDate}></DatePickers>
              <Text fontWeight="bold">Description (optional)</Text>
              <DescriptionBox defaultValue={milestoneId && data("description")} onChange={onSetDescription}></DescriptionBox>
            </Content>
            <ButtonWrapper>
              {milestoneId ? (
                <>
                  <Button backgroundColor="gray1" color="black" onClick={onPassMilestonePage}>
                    Cancel
                  </Button>
                  <Button backgroundColor="gray1" color="black" onClick={onPassMilestonePage}>
                    Close milestone
                  </Button>
                  <Button onClick={onSaveMilestone}>Save changes</Button>
                </>
              ) : (
                <Button onClick={onCreateMilestone} disabled={titleContent ? false : true}>
                  Create milestone
                </Button>
              )}
            </ButtonWrapper>
          </ContentWrapper>
        </Wrapper>
      )}
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
  min-width: 760px;
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
    postMilestone,
    putMilestone,
  }
)(CreateMilestonePage);
