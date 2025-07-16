import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';

function SignIn() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [_, setError] = useState(null);
  const [message, setMessage] = useState('');

  const { signIn } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);

    const { data, error } = await signIn({ email, password });

    if (error) {
      setError(error);
      setMessage('메일주소 또는 비밀번호가 잘못되었습니다.');
      console.error('로그인 실패', error);
    } else {
      console.log('로그인 성공', data);
    }
    navigate('/');
  };

  return (
    <div className="text-center form-auth">
      <form onSubmit={handleSubmit} className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <label htmlFor="inputEmail" className="sr-only">
          Email
        </label>
        <input ref={emailRef} type="email" id="inputEmail" className="form-control" placeholder="Email address" />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          ref={passwordRef}
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" defaultValue="remember-me" /> Remember me
          </label>
        </div>
        <div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <Link to="/signup" className="btn btn-lg btn-primary btn-block">
            Sign up
          </Link>
        </div>
      </form>
      {message ? <p>{message}</p> : ''}
    </div>
  );
}

export default SignIn;
