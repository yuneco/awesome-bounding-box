import { css } from "@kuma-ui/core";

import { CoordControls } from "./control/CoordControls";
import { MainStage } from "./MainStage";

const wrapper = css`
  position: relative;
`;

const layout = css`
  display: grid;
  grid-template-rows: 80px 1fr;
  height: 100vh;
`;

export const App = () => {
  return (
    <div className={layout}>
      <CoordControls />
      <div className={wrapper}>
        <MainStage />
      </div>
    </div>
  );
};

export default App;
