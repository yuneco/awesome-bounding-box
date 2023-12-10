import { css } from "@kuma-ui/core";

import "./App.css";
import { MainStage } from "./MainStage";

const wrapper = css`
  position: absolute;
  width: 90%;
  height: 90%;
  left: 5%;
  top: 5%;
`;

export const App = () => {
  return (
    <>
      <div className={wrapper}>
        <MainStage />
      </div>
    </>
  );
};

export default App;
