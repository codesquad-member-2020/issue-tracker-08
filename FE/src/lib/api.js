import axios from "axios";
import { API_URL } from "@Constants/url";

export const getIssue = () => axios.get(API_URL.issue);

export const getLabel = () => axios.get(API_URL.label);

export const createLabel = (params) => axios.post(API_URL.label, params);

export const deleteLabel = (labelName) => axios.delete(`${API_URL.label}${labelName}`);
