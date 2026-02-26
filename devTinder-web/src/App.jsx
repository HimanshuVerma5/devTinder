import { BrowserRouter, Routes, Route } from "react-router-dom";

import Body from "./components/Body";
import PublicLayout from "./components/PublicLayout";

import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import CreatorPage from "./components/CreatorPage";
import Connections from "./components/Connections";
import Requests from "./components/Requests";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>

         
        </Route>

        {/* PROTECTED / APP ROUTES */}
        <Route element={<Body />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/requests" element={<Requests/>} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/creator/himanshu-verma" element={<CreatorPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
