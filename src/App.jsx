import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import SignUp from './components/pages/Auth/SignUp';
import SignIn from './components/pages/Auth/SignIn';
import AddPost from './components/pages/Post/AddPost';

function App() {
  return (
    <div className="wrap">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="/addpost" element={<AddPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
