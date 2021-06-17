import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { useInput } from '../Hooks/useInput';
import { isLoggedInVar } from '../Apollo/LocalState';

const LoginWapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 90px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 420px;
  margin: 50px 10vw;
  align-items: center;
  div {
    width: 100%;
  }
  h2 {
    font-size: 24px;
    font-weight: 600;
  }
  input {
    border: 1px solid #e5e5e5;
    width: 100%;
    height: 100%;
  }
  input::placeholder {
    color: #999999;
    font-weight: 600;
    padding-left: 7px;
  }
  button {
    background-color: black;
    color: white;
    width: 100%;
    height: 40px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const LoginHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
`;

const LoginForm = styled.div`
  margin-bottom: 30px;
  div {
    padding: 10px 0;
  }
  input {
    height: 40px;
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login: React.FC = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [loginMutation, { data, error }] = useMutation(LOGIN_MUTATION);
  const confirmError = useRef(false);

  const history = useHistory();

  const onSubmitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      confirmError.current = false;
      loginMutation({
        variables: { email, password },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data && data.login && data.login.token) {
      localStorage.setItem('token', data.login.token);
      isLoggedInVar(true);
      history.push('/');
    }
  }, [data]);

  if (error && !confirmError.current) {
    confirm(error.message);
    confirmError.current = true;
  }

  return (
    <LoginWapper>
      <LoginContainer>
        <LoginHeader>
          <img src={`${process.env.PUBLIC_URL}/image/nikelogo.png`} width="50px" height="40px" />
          <h2>Nike Login</h2>
        </LoginHeader>
        <LoginForm>
          <form onSubmit={onSubmitLoginForm}>
            <div className="input">
              <input type="text" id="email" name="email" value={email} onChange={onChangeEmail} placeholder="Email" />
            </div>
            <div className="input">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                placeholder="Password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </LoginForm>
        <div className="signup-link">
          <span>회원이 아니신가요?</span>
          <a>회원가입</a>
        </div>
      </LoginContainer>
    </LoginWapper>
  );
};

export default Login;
