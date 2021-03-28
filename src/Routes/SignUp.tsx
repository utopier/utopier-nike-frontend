import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useInput } from '../Hooks/useInput';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

export const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!, $username: String!) {
    signUp(email: $email, password: $password, username: $username) {
      token
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SignupContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 90px;

  width: 420px;
  margin: 50px 5vw;
  align-items: center;
`;

const SignupTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin: 5vh 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const SignupBody = styled.div`
  width: 100%;
`;

const SignupWrapper = styled.div`
  width: 100%;
  div {
    height: 40px;
    margin: 15px 0;
  }
  input {
    border: 1px solid #e5e5e5;
    width: 90%;
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
    width: 90%;
    height: 40px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [confirmPassword, onChangeConfirmPassword] = useInput('');
  const [username, onChangeUsername] = useInput('');
  const [signUpMutation] = useMutation(SIGN_UP);

  const history = useHistory();

  const onSubmitForm = useCallback(
    async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      try {
        signUpMutation({
          variables: { email, password, username },
        });
        history.push('/login'); 
      } catch (e) {
        console.error(e);
      }
    },
    [email, password, username],
  );

  return (
    <>
      <Wrapper>
        <SignupContainerWrapper>
          <SignupTitle>
            <h2>Nike - Sign Up</h2>
          </SignupTitle>
          <SignupBody>
            <SignupWrapper>
              <form onSubmit={onSubmitForm}>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChangeEmail}
                    required={true}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Password"
                    required={true}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                    placeholder="Confirm Password"
                    required={true}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    placeholder="Username"
                    required={true}
                  />
                </div>
                <button type="submit">Sign Up</button>
              </form>
            </SignupWrapper>
          </SignupBody>
        </SignupContainerWrapper>
      </Wrapper>
    </>
  );
};

export default SignUp;
