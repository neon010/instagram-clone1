import './App.scss';
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchLoginUser} from "./stateManager"


import {renderScreens} from "./utills/renderScreens";

function App() {

  const dispatch = useDispatch();
  const AuthResponse = useSelector(state => state.AuthResponse)

  const {loading, isLogin, error} = AuthResponse;
  

  useEffect(()=>{
    dispatch(fetchLoginUser());
  }, []);


  return (
    <div>
      {renderScreens(isLogin, loading, error)}
    </div>
  );
}

export default App;
