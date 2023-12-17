import { css } from "@kuma-ui/core";

import { AppTitle } from "./control/AppTitle";
import { CoordControls } from "./control/CoordControls";
import { MainStage } from "./MainStage";

const wrapper = css`
  position: relative;
`;

const layout = css`
  display: grid;
  grid-template-rows: 60px 40px 1fr;
  height: 100vh;
`;

export const App = () => {
  return (
    <div className={layout}>
      <AppTitle />
      <CoordControls />
      <div className={wrapper}>
        <MainStage />
      </div>
    </div>
  );
};

export default App;
