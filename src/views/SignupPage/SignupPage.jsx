import React from "react";
import styled from "styled-components";

import Button from "@Style/Button";

import PersonalInputBox from "@InputBox/PersonalInputBox";

const SignupPage = ({ isSignupOpen, openHandler }) => {
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
