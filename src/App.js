import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Link from "./pages/link/Link";
import Header from "./pages/home/Header";

import { initState, reducer } from "./store/CustomDialogStore";
import React, {createContext, useReducer} from "react";
import CustomDialog from "./components/CustomDialog";

export const DialogDispatch = createContext(initState);

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div style={{ margin: "3% 3%" }}>
      <Router>
        <DialogDispatch.Provider value={{state, dispatch}}>
          <Header />
          <div style={{ margin: "0 6%" }}>
            <Routes>
              <Route path="/setting" element={<Setting />} />
              <Route path="/login" element={<Login />} />
              <Route path="/link" element={<Link />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
          <CustomDialog />
        </DialogDispatch.Provider>
      </Router>
    </div>
  );
}

export default App;
