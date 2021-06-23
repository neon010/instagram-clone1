import './App.scss';

import {renderScreens} from "./utills/renderScreens";

function App() {

  const isLogin = false;

  return (
    <div>
      {renderScreens(isLogin)}
    </div>
  );
}

export default App;
