import './App.scss';
import {useEffect} from "react";
import io from 'socket.io-client'
import {useSelector, useDispatch} from "react-redux";
import {fetchLoginUser} from "./stateManager";
import {fetchSocket} from "./stateManager";
import {Helmet} from "react-helmet";




import {renderScreens} from "./utills/renderScreens";

function App() {

  const dispatch = useDispatch();
  const AuthResponse = useSelector(state => state.AuthResponse)



  const {loading, isLogin, error} = AuthResponse;
  

  useEffect(()=>{
    dispatch(fetchLoginUser());
  }, [dispatch]);

  useEffect(() => {
    const socket = io("https://myinstagram6589.herokuapp.com");
    dispatch(fetchSocket(socket));
    return () => socket.close();
  }, [dispatch]);


  return (
      <div>
          <Helmet>
                <title>Instagram</title>
                <link rel="icon" href="http://mysite.com/example" />
          </Helmet>
        {renderScreens(isLogin, loading, error)}
      </div>
  );
}

export default App;
