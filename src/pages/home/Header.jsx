import BtnHome from "./BtnHome";
import BtnProfile from "./BtnProfile";

const Header = ({ isLoggedIn }) => {

  return (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 0 2vh 0",
      }}
    >
      <BtnHome />
      <BtnProfile isLoggedIn={isLoggedIn} />
    </div>
  );
};
export default Header;
