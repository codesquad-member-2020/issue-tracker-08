import React, { useState } from "react";
import styled from "styled-components";

import Button from "@Style/Button";
import Text from "@Style/Text";

import PersonalInputBox from "@InputBox/PersonalInputBox";
import useDebounce from "@Hooks/useDebounce";
import { REGEX, ID_MSG, PSWD1_MSG, PSWD1_INVALID_CASE, PSWD2_MSG, EMAIL_ERR_MSG } from "@Constants/validate";

const SignupPage = ({ isSignupOpen, openHandler }) => {
  const [userInfo, setUserInfo] = useState({ id: "", password: "", email: "" });
  const [passwordCheck, setPasswordCheck] = useState("");

  const [idMsg, setIdMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passworCheckdMsg, setPasswordCheckMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  return (
    <>
      <SignupWrap isSignupOpen={isSignupOpen}>
        <PersonalInputBox title="아이디" />
        <PersonalInputBox title="비밀번호" type="password" />
        <PersonalInputBox title="비밀번호 확인" type="password" />
        <PersonalInputBox title="이메일" />
        <SignUpButtonWrap>
          <Button backgroundColor="blue" style={loginButtonStyle} onClick={openHandler}>
            회원가입
          </Button>
        </SignUpButtonWrap>
      </SignupWrap>
    </>
  );
};

const SignupWrap = styled.div`
  display: ${(props) => (props.isSignupOpen ? "block" : "none")};
`;

const SignUpButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  height: 32px;
`;

const loginButtonStyle = {
  width: "49%",
  textAlign: "center",
};

export default SignupPage;
