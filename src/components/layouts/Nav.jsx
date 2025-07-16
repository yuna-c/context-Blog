import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

function Nav() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthContext();

  const handleSignOut = async () => {
    await signOut();
    console.log('로그아웃 성공');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="index.html">
          Context Blog
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse " id="navbarResponsive">
          <ul className="navbar-nav ms-auto py-4 py-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link px-lg-3 py-3 py-lg-4">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link px-lg-3 py-3 py-lg-4">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link px-lg-3 py-3 py-lg-4">
                Sample Post
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link px-lg-3 py-3 py-lg-4">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              {user ? (
                <a href="#" onClick={handleSignOut} className="nav-link px-lg-3 py-3 py-lg-4">
                  SignOut
                </a>
              ) : (
                <Link to="/signin" className="nav-link px-lg-3 py-3 py-lg-4">
                  SignIn
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
