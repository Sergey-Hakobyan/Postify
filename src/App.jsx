  import Home from "./pages/Home/Home";
  import PostDetails from "./pages/PostDetails/PostDetails";
  import CreatePost from "./pages/CreatePost/CreatePost";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import "../App.css"
  function App() {

    return (
      <>
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/posts/:id" element ={<PostDetails/>} />
            </Routes>
      </BrowserRouter>
      </>
    )
  }

  export default App
