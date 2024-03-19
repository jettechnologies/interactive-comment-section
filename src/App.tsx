import { Routes, Route, Navigate } from "react-router-dom";
import { CommentSection, Signup, Login } from "./pages";


const App = () => {

  return (
    <Routes>
      <Route path="/">
        <Route index element = {<Signup />} />
        <Route path = "login" element = {<Login />} />

        <Route path="comments" element = {<CommentSection />}/>

        {/* redirect route for any route thats isnt stated for */}
        <Route path="*" element = {<Navigate to = "/" replace/>}></Route>
      </Route>
    </Routes>
  )
}

export default App