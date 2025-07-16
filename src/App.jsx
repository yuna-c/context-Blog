import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import SignUp from './components/pages/Auth/SignUp';
import SignIn from './components/pages/Auth/SignIn';
import AddPost from './components/pages/Post/AddPost';
import SinglePost from './components/pages/Post/SinglePost';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="wrap">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/singlepost/:id" element={<SinglePost />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
