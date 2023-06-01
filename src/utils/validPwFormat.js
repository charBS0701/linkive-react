// 비밀번호 형식 검사 함수
const validPwFormat = (password) => {
const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
return passwordRegex.test(password);
};

export default validPwFormat;