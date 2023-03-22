import BtnHome from "./BtnHome";
import BtnProfile from "./BtnProfile";

const Header = () => {
  return (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 0 2%",
      }}
    >
      <BtnHome />
      <BtnProfile />
    </div>
  );
};
export default Header;
