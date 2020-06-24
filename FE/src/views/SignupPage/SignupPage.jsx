import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Button from "@Style/Button";
import Text from "@Style/Text";

import PersonalInputBox from "@InputBox/PersonalInputBox";
import useDebounce from "@Hooks/useDebounce";
import { REGEX, ID_MSG, PSWD1_MSG, PSWD1_INVALID_CASE, PSWD2_MSG, EMAIL_MSG } from "@Constants/validate";

const SignupPage = ({ isSignupOpen, openHandler }) => {
  const [userInfo, setUserInfo] = useState({ id: "", password: "", email: "" });
  const [passwordCheck, setPasswordCheck] = useState("");

  const [idMsg, setIdMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordCheckMsg, setPasswordCheckMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  const debounceUserInfo = useDebounce(userInfo);
  const debouncedpwdCheck = useDebounce(passwordCheck);

  useEffect(() => {
    validId();
    validPassword();
    validPasswordCheck();
    validEmail();
  }, [debounceUserInfo, debouncedpwdCheck]);

  const validId = () => {
    if (!userInfo.id) return;
    if (!userInfo.id.match(REGEX.ID)) return setIdMsg(ID_MSG.INVALID);
    return setIdMsg(ID_MSG.SUCCESS);
  };

  const validPassword = () => {
    if (!userInfo.password) return;
    if (!userInfo.password.match(REGEX.PSWD_LEN)) return setPasswordMsg(PSWD1_MSG.INVALID_LEN);
    if (!userInfo.password.match(REGEX.DOWN_CASE)) return setPasswordMsg(PSWD1_INVALID_CASE.ENG_DOWN + PSWD1_MSG.INVALID);
    if (!userInfo.password.match(REGEX.NUMBER)) return setPasswordMsg(PSWD1_INVALID_CASE.NUMBER + PSWD1_MSG.INVALID);
    if (!userInfo.password.match(REGEX.CHARACTOR)) return setPasswordMsg(PSWD1_INVALID_CASE.CHARACTOR + PSWD1_MSG.INVALID);
    return setPasswordMsg(PSWD1_MSG.SUCCESS);
  };

  const validPasswordCheck = () => {
    if (!passwordCheck) return;
    if (userInfo.password !== passwordCheck) return setPasswordCheckMsg(PSWD2_MSG.INVALID);
    return setPasswordCheckMsg(PSWD2_MSG.SUCCESS);
  };

  const validEmail = () => {
    if (!userInfo.email) return;
    if (!userInfo.email.match(REGEX.EMAIL)) return setEmailMsg(EMAIL_MSG.INVALID);
    return setEmailMsg(EMAIL_MSG.SUCCESS);
  };

  const changeId = ({ target }) => {
    setUserInfo({ ...userInfo, id: target.value });
  };

  const changePassword = ({ target }) => {
    setUserInfo({ ...userInfo, password: target.value });
  };

  const changePasswordCheck = ({ target }) => {
    setPasswordCheck(target.value);
  };

  const changeEmail = ({ target }) => {
    setUserInfo({ ...userInfo, email: target.value });
  };

  return (
    <>
      <SignupWrap isSignupOpen={isSignupOpen}>
        <PersonalInputBox title="아이디" onChange={changeId} errorMsg={idMsg} />
        <PersonalInputBox title="비밀번호" type="password" onChange={changePassword} errorMsg={passwordMsg} />
        <PersonalInputBox title="비밀번호 확인" type="password" onChange={changePasswordCheck} errorMsg={passwordCheckMsg} />
        <PersonalInputBox title="이메일" onChange={changeEmail} errorMsg={emailMsg} />
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
