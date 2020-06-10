import React, { useState } from "react";
import styled from "styled-components";
import Text from "@Style/Text";
import Button from "@Style/Button";
import PersonalInputBox from "@InputBox/PersonalInputBox";

import GitHubIcon from "@material-ui/icons/GitHub";

const LoginPage = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div>
      <LoginPageWrap>
        <Text fontSize="xl" color="black" fontWeight="extraBold">
          이슈 트래커
        </Text>
        <BoxWrap>
          <LoginWrap isSignupOpen={isSignupOpen}>
            <PersonalInputBox title="아이디" />
            <PersonalInputBox title="비밀번호" />
            <ButtonWrap>
              <Button backgroundColor="blue" style={loginButtonStyle}>
                로그인
              </Button>
              <Button
                backgroundColor="blue"
                style={loginButtonStyle}
                onClick={() => setIsSignupOpen(!isSignupOpen)}
              >
                회원가입
              </Button>
            </ButtonWrap>
            <Button backgroundColor="gray4" style={githubButtonStyle}>
              Sign in with Github
              <GitHubIcon style={githubLogoStyle} />
            </Button>
          </LoginWrap>
          <SignupWrap isSignupOpen={isSignupOpen}>
            <PersonalInputBox title="아이디" />
            <PersonalInputBox title="비밀번호" />
            <PersonalInputBox title="비밀번호 확인" />
            <PersonalInputBox title="이름" />
            <Button
              backgroundColor="blue"
              style={loginButtonStyle}
              onClick={() => setIsSignupOpen(!isSignupOpen)}
            >
              회원가입
            </Button>
          </SignupWrap>
        </BoxWrap>
      </LoginPageWrap>
    </div>
  );
};

export default LoginPage;

const LoginPageWrap = styled.div`
  padding: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const BoxWrap = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1};
  margin: 30px;
  width: 400px;
  padding: 20px;
  /* box-shadow: 0 0 2px 0 ${({ theme }) => theme.colors.black}; */
  border: 1px solid ${({ theme }) => theme.colors.gray2};
`;

const LoginWrap = styled.div`
  display: ${(props) => (props.isSignupOpen ? "none" : "block")};
`;

const SignupWrap = styled.div`
  display: ${(props) => (props.isSignupOpen ? "block" : "none")};
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const loginButtonStyle = {
  width: "49%",
  height: "28px",
  textAlign: "center",
};

const githubButtonStyle = {
  width: "100%",
  height: "28px",
  margin: "5px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const githubLogoStyle = {
  height: "20px",
  margin: "5px",
};
