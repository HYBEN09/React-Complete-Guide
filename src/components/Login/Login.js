import React, { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../context/auth-context";

//* --------------------------------------------------------------------------

//Todo  ->  useReducer()

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

//* --------------------------------------------------------------------------

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //* --------------------------------------------------------------------------

  //Todo  ->  useReducer()

  //? 값과 유효성을 하나의 state로 결합하여 useReducer로 관리하는 것입니다

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  //* --------------------------------------------------------------------------
  //Todo -> useContext()

  const authCtx = useContext(AuthContext);

  //* --------------------------------------------------------------------------

  //Todo  ->  useEffect()

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  //* --------------------------------------------------------------------------

  // 이펙트가 불필요하게 실행되는 것을 피하기 위해
  //유효성이 변경되지 않으면 실행되지 않게 함.
  //핵심은 우리가 destructuring을 사용한다는 것이 아니라, 전체 개체 대신 특정 속성을 종속성으로 전달한다는 것입니다.

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  //? enteredEmail 또는 enteredPassword가 바뀔 때마다 다시 실행.
  //이메일 또는 비밀번호 필드의 키 입력에 대한 응답으로 해당 폼의 유효성을 확인하고 업데이트하는 것
  //또한 사이드이펙트라고 할 수 있습니다

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    //cleanUp function
    //모든 새로운 사이드이펙트 함수가 실행되기 전에, 그리고 컴포넌트가 제거되기 전에 실행됩니다
    //첫 번째 사이드이펙트 함수가 실행되기 전에는 실행되지 않습니다. 그러나 그 이후에는 실행됩니다
    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  //* --------------------------------------------------------------------------

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
