import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //* --------------------------------------------------------------------------

  //컴토넌트 함수에 직접 실행하고 싶지 않아서 useEffect()안에서 실행
  //실제로 앱이 시작될 때 한 번만 실행됩니다 그 이후로 의존성은 절대 변경되지 않기 때문입니다
  //여기에는 의존성([dependencies])이 없기 때문입니다.
  //이 코드를 한 번 실행하고 싶습니다 그리고 그건 앱이 시작되는 경우죠

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === 1) {
      setIsLoggedIn(true);
    }
  }, []);

  //* --------------------------------------------------------------------------

  const loginHandler = (email, password) => {
    //사용자가 로그인 했으면 = 1, 아니면 = 0
    //무언가를 저장 하고 싶을 때 사용.
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    //로그아웃 버튼을 클릭할 때마다 다시 로컬 저장소에 연결하도록 합니다 거기에서 isLoggedIn 키를 제거합니다
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
