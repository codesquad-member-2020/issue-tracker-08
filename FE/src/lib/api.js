import axios from "axios";
import { API_URL } from "@Constants/url";

export const getIssue = () => axios.get(API_URL.issue);
export const getDetailIssue = (issueId) => axios.get(`${API_URL.issue}${issueId}`);
export const postIssue = (params) =>
  axios({
    url: API_URL.issue,
    data: params,
    method: "post",
    credentials: true,
  });

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

export const postUser = (params) => axios.post(API_URL.user, params);
export const postLogin = (params) =>
  axios({
    url: API_URL.login,
    data: params,
    method: "post",
    mode: "cors",
    credentials: "include",
  });
