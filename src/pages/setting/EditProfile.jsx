import profile from "../../contents/profile.png";
import checked from "../../contents/checked.png";
import edit_profile from "../../contents/edit_profile.png";

const Btn = (props) => {
  return (
    <div
      style={{
        width: "170px",
        backgroundColor: "white",
        color: "#6368E3",
        border: "solid",
        borderColor: "#6368E3",
        borderRadius: "25px",
        padding: "10px",

        textAlign: "center",
        fontSize: "18px",
      }}
    >
      {props.children}
    </div>
  );
};
const EditProfile = () => {
  return (
    <div
      style={{
        // border: "solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "50%",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          //   border: "solid",
          width: "100%",
          display: "flex",
          flwxDirection: "row",
          alignItems: "center",
          marginBottom: "7%",
          padding: "0 5%",
        }}
      >
        <img src={edit_profile} width="80px" height="80px" alt="profile" />
        <div
          style={{
            border: "solid",
            // 보르더 두께줄이기
            borderColor: "#6368E3",
            borderRadius: "30px",
            width: "70%",
            margin: "5%",
            padding: "2%",
            textJustify: "center",

            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between", // 바깥에 간격있는걸로 바꾸기
          }}
        >
          <span // input박스로 변경
            style={{
              marginLeft: "5%",
              fontSize: "25px",
              fontWeight: "bold",
              opacity: "50%",
            }}
          >
            닉네임
          </span>
          <img src={checked} alt="cheched" />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          border: "solid",
          borderColor: "#6368E3",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "7%",
        }}
      >
        <div
          style={{
            display: "flex",
            borderBottom: "solid",
            width: "70%", // 모듈만들기
          }}
        >
          <div>아이디</div>
          <div>아이디 입력칸</div>
        </div>
        <div style={{ display: "flex" }}>
          <div>비밀번호</div>
          <div>비밀번호 입력칸</div>
        </div>
        <div style={{ display: "flex" }}>
          <div>이메일</div>
          <div>이메일 입력칸</div>
        </div>
      </div>
      <div
        style={{
          width: "80%",
          //   border: "solid",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Btn>탈퇴하기</Btn>

        <Btn
          props={{
            fontColor: "white",
            bgColor: "#6368E3", //색 변수 방법, props 방법
          }}
        >
          수정하기
        </Btn>
      </div>
    </div>
  );
};

export default EditProfile;
