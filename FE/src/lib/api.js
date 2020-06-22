import axios from "axios";
import { API_URL } from "@Constants/url";

export const getIssue = () => axios.get(API_URL.issue);

export const getMilestone = () => axios.get(`${API_URL.milestone}`);
export const postMilestone = (params) => axios.post(`${API_URL.milestone}`, params);
export const getMilestoneDetail = (milestoneId) => axios.get(`${API_URL.milestone}${milestoneId}/issues`);
export const putMilestone = (milestoneId, params) => axios.put(`${API_URL.milestone}${milestoneId}`, params);
export const patchMilestone = (milestoneId) => axios.patch(`${API_URL.milestone}${milestoneId}`);
export const deleteMilestone = (milestoneId) => axios.delete(`${API_URL.milestone}${milestoneId}`);

export const getLabel = () => axios.get(API_URL.label);
export const createLabel = (params) => axios.post(API_URL.label, params);
export const editLabel = (labelName, params) => axios.put(`${API_URL.label}${labelName}`, params);
export const deleteLabel = (labelName) => axios.delete(`${API_URL.label}${labelName}`);
