// 아이디 형식 검사 함수
export const validIdFormat = (id) => {
  const idRegex = /^[a-z0-9_]{1,14}$/;
  return idRegex.test(id);
};

// 비밀번호 형식 검사 함수
export const validPwFormat = (password) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
  return passwordRegex.test(password);
};

// 닉네임 형식 검사 함수
export const validNickFormat = (nick) => {
  const nickRegex = /^[a-z0-9_]{1,14}$/;
  return nickRegex.test(nick);
};
