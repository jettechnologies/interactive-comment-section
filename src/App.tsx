import { Routes, Route, Navigate } from "react-router-dom";
import { CommentSection, Signup, Login } from "./pages";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import { CommentProvider } from "./context/CommentContext";
import { LocalStorageData } from "./dataModel";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);  

  useEffect(() =>{
    const localStorage: string | null = window.localStorage.getItem("comments");
        let localStorageData: LocalStorageData | undefined;

        // check to ensure that the localStorage is not empty
        localStorage !== null ? localStorageData = JSON.parse(localStorage) : localStorageData = undefined; 

        if (localStorageData?.currentUser !== undefined && Object.keys(localStorageData.currentUser).length > 0) {
          setIsLogged(true);
        }
  }, []);

  return (
    <CommentProvider>
      <Routes>
        <Route path="/" element = {<Layout />}>
          <Route index element = {isLogged ? <Login /> : <Signup />} />
          {/* <Route path = "login" element = {<Login />} /> */}

          <Route path="comments" element = {<CommentSection />}/>

          {/* redirect route for any route thats isnt stated for */}
          <Route path="*" element = {<Navigate to = "/" replace/>}></Route>
        </Route>
      </Routes>
    </CommentProvider>
  )
}

export default App