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

  const validId = () => {
    if (!userInfo.id.match(REGEX.ID)) return setIdMsg(ID_MSG.INVALID);
    return setIdMsg(ID_MSG.SUCCESS);
  };

  const validPassword = () => {
    if (!userInfo.password.match(REGEX.PSWD_LEN)) return setPasswordMsg(PSWD1_MSG.INVALID_LEN);
    if (!userInfo.password.match(REGEX.DOWN_CASE)) return setPasswordMsg(PSWD1_INVALID_CASE.ENG_DOWN + PSWD1_MSG.INVALID);
    if (!userInfo.password.match(REGEX.NUMBER)) return setPasswordMsg(PSWD1_INVALID_CASE.NUMBER + PSWD1_MSG.INVALID);
    if (!userInfo.password.match(REGEX.CHARACTOR)) return setPasswordMsg(PSWD1_INVALID_CASE.CHARACTOR + PSWD1_MSG.INVALID);
    return setPasswordMsg(PSWD1_MSG.SUCCESS);
  };

  const validPasswordCheck = () => {
    if (userInfo.password !== passwordCheck) return setPasswordCheckMsg(PSWD2_MSG.FAIL);
    return setPasswordCheckMsg(PSWD2_MSG.SUCCESS);
  };

  const validEmail = () => {
    if (!userInfo.email.match(REGEX.EMAIL)) return setEmailMsg(EMAIL_ERR_MSG);
  };

  const changeId = ({ target }) => {
    setUserInfo({ ...userInfo, id: target.value });
    validId();
  };

  const changePassword = ({ target }) => {
    setUserInfo({ ...userInfo, password: target.value });
    validPassword();
  };

  const changePasswordCheck = ({ target }) => {
    setPasswordCheck(target.value);
    validPasswordCheck();
  };

  const changeEmail = ({ target }) => {
    setUserInfo({ ...userInfo, email: target.value });
    validEmail();
  };

  return (
    <>
      <SignupWrap isSignupOpen={isSignupOpen}>
        <PersonalInputBox title="아이디" onChange={changeId} />
        <Text>{idMsg}</Text>
        <PersonalInputBox title="비밀번호" type="password" onChange={changePassword} />
        <Text>{passwordMsg}</Text>
        <PersonalInputBox title="비밀번호 확인" type="password" onChange={changePasswordCheck} />
        <Text>{passworCheckdMsg}</Text>
        <PersonalInputBox title="이메일" onChange={changeEmail} />
        <Text>{emailMsg}</Text>
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
