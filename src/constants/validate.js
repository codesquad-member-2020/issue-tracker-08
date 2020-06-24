export const REGEX = {
  ID: /^[a-z0-9][a-z0-9_\-]{6,16}$/,
  PSWD_LEN: /.{6,12}$/,
  DOWN_CASE: /^(?=.*[a-z])/,
  NUMBER: /\d/,
  CHARACTOR: /\W+/,
  EMAIL: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const ID_MSG = {
  SUCCESS: "사용 가능한 아이디입니다.",
  INVALID: "6~16자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.",
  OVERLAP: "이미 사용중인 아이디입니다.",
};

export const PSWD1_MSG = {
  SUCCESS: "안전한 비밀번호입니다.",
  INVALID_LEN: "6자 이상 12자 이하로 입력해주세요.",
  INVALID: `를 최소 1자 이상 포함해주세요.`,
};

export const PSWD1_INVALID_CASE = {
  ENG_DOWN: "영어 소문자",
  NUMBER: "숫자",
  CHARACTOR: "특수문자",
};

export const PSWD2_MSG = {
  SUCCESS: "비밀번호가 일치합니다.",
  FAIL: "비밀번호가 일치하지 않습니다.",
};

export const EMAIL_ERR_MSG = "이메일 주소를 다시 확인해주세요.";
