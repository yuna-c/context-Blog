import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  return (
    <div className="text-center form-auth">
      <form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <label htmlFor="inputEmail" className="sr-only">
          Email
        </label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
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
    </div>
  );
}

export default Login;
