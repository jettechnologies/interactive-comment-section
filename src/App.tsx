import { Routes, Route, Navigate } from "react-router-dom";
import { CommentSection, Signup, Login } from "./pages";
import Layout from "./components/Layout";
import { useState } from "react";


const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Routes>
      <Route path="/" element = {<Layout />}>
        <Route index element = {isLogged ? <Login /> : <Signup />} />
        {/* <Route path = "login" element = {<Login />} /> */}

        <Route path="comments" element = {<CommentSection />}/>

        {/* redirect route for any route thats isnt stated for */}
        <Route path="*" element = {<Navigate to = "/" replace/>}></Route>
      </Route>
    </Routes>
  )
}

export default App