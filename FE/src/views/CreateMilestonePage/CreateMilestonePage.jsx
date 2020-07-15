import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Header from "@Header/Header";
import CreateMilestoneTitle from "@CreateMilestonePage/CreateMilestoneTitle/CreateMilestoneTitle";
import CreateMilestoneContent from "@CreateMilestonePage/CreateMilestoneContent/CreateMilestoneContent";
import CreateMilestoneButtons from "@CreateMilestonePage/CreateMilestoneButtons/CreateMilestoneButtons";
import { getMilestoneDetail, postMilestone, putMilestone } from "@Modules/milestone";

const CreateMilestonePage = ({ getMilestoneDetail, postMilestone, putMilestone, milestoneDetail, loadingMilestoneDetail }) => {
  let history = useHistory();
  let { milestoneId } = useParams();

  useEffect(() => {
    const fn = async () => {
      try {
        await getMilestoneDetail(milestoneId);
      } catch (e) {
        console.log(e);
      }
    };
    if (milestoneId) {
      fn();
      initContent();
    }
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

  const [titleContent, setTitleContent] = useState("");
  const [dateContent, setDateContent] = useState("");
  const [descriptionContent, setDescriptionContent] = useState("");

  const getDefaultValue = (key) => milestoneId && data(key);

  const initContent = () => {
    if (!data()) return;
    setTitleContent(data("title"));
    setDateContent(data("dueDate"));
    setDescriptionContent(data("description"));
  };

  const onSetTitle = ({ target }) => setTitleContent(target.value);
  const onSetDate = ({ target }) => setDateContent(target.value);
  const onSetDescription = ({ target }) => setDescriptionContent(target.value);

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
            <CreateMilestoneTitle milestoneId={milestoneId} />
            <CreateMilestoneContent
              getDefaultValue={getDefaultValue}
              onSetTitle={onSetTitle}
              onSetDescription={onSetDescription}
              onSetDate={onSetDate}
            />
            <CreateMilestoneButtons
              milestoneId={milestoneId}
              titleContent={titleContent}
              onPassMilestonePage={onPassMilestonePage}
              onSaveMilestone={onSaveMilestone}
              onCreateMilestone={onCreateMilestone}
            />
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
