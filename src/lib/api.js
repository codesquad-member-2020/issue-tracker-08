import axios from "axios";
import { API_URL } from "@Constants/url";

export const getIssue = () => axios.get(`${API_URL.issue}`);

export const getLabel = () => axios.get(`${API_URL.label}`);

export const getMilestone = () => axios.get(`${API_URL.milestone}`);
// export const getMilestoneDetail = (milestoneId) => axios.get(`${API_URL.milestone}/${milestoneId}/issues`);
export const getMilestoneDetail = () => axios.get(`${API_URL.milestone}/1/issues`);
