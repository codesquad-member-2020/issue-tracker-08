import axios from "axios";
import { API_URL } from "@Constants/url";

export const getIssue = (params) => axios.get(API_URL.issue, { params });
export const getDetailIssue = (issueId) => axios.get(`${API_URL.issue}${issueId}`);
export const changeIssueStatus = (issueId) => axios.patch(`${API_URL.issue}/${issueId}`);
export const postIssue = (params) =>
  axios({
    url: API_URL.issue,
    data: params,
    method: "post",
    credentials: true,
  });

export const patchIssueTitle = ({ issueId, params }) => axios.patch(`${API_URL.issue}${issueId}/titles`, params);
export const postComment = ({ issueId, params }) => axios.post(`${API_URL.issue}${issueId}/comments`, params);
export const putComment = ({ issueId, commentId, params }) => axios.put(`${API_URL.issue}${issueId}/comments/${commentId}`, params);
export const deleteComment = ({ issueId, commentId }) => axios.delete(`${API_URL.issue}${issueId}/comments/${commentId}`);

export const changeAssignee = ({ issueId, params }) => axios.put(`${API_URL.issue}${issueId}/assignees`, params);
export const changeLabels = ({ issueId, params }) => axios.put(`${API_URL.issue}${issueId}/labels`, params);
export const changeMilestone = ({ issueId, params }) => axios.put(`${API_URL.issue}${issueId}/milestone`, params);

export const getMilestone = () => axios.get(API_URL.milestone);
export const getMilestoneDetail = (milestoneId) => axios.get(`${API_URL.milestone}${milestoneId}`);
export const postMilestone = (params) => axios.post(`${API_URL.milestone}`, params);
export const putMilestone = ({ milestoneId, params }) => axios.put(`${API_URL.milestone}${milestoneId}`, params);
export const patchMilestone = (milestoneId) => axios.patch(`${API_URL.milestone}${milestoneId}`);
export const deleteMilestone = (milestoneId) => axios.delete(`${API_URL.milestone}${milestoneId}`);

export const getLabel = () => axios.get(API_URL.label);
export const createLabel = (params) => axios.post(API_URL.label, params);
export const editLabel = ({ labelId, params }) => axios.put(`${API_URL.label}${labelId}`, params);
export const deleteLabel = (labelName) => axios.delete(`${API_URL.label}${labelName}`);

export const getUser = () => axios.get(API_URL.user);
export const postUser = (params) => axios.post(API_URL.user, params);
export const postLogin = (params) =>
  axios({
    url: API_URL.login,
    data: params,
    method: "post",
    mode: "cors",
    credentials: "include",
  });
