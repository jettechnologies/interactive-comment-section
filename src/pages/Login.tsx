import { userIcon } from "../assets";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs";
import bcrypt from "bcryptjs-react";
import { LocalStorageData } from "../dataModel";

interface User{
  userName: string;
  password: string;
  error: {msg: string; status: boolean;}
}

const Login = () => {
  const [user, setUser] = useState<User>({
    userName: "",
    password: "",
    error: {msg: "", status: false}
  });
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  })

  const navigate = useNavigate();

  useEffect(() =>{
    const localStorage: string | null = window.localStorage.getItem("comments");
        let localStorageData: LocalStorageData | undefined;

        // check to ensure that the localStorage is not empty
        localStorage !== null ? localStorageData = JSON.parse(localStorage) : localStorageData = undefined; 

        if (localStorageData?.currentUser !== undefined && Object.keys(localStorageData.currentUser).length > 0) {
          setUserData(localStorageData.currentUser);
        }
  }, []);

  const passwordCompare = (enteredPassword: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(enteredPassword, hashedPassword); // Compare passwords
  };

    // setting the values of the input fields
    function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      const { name, value } = target;
  
      setUser({ ...user, [name]: value.toLocaleLowerCase() });
    }

    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const {userName, password} = user;
      let msg = "";
      
      // would need to sort out the comparsion with the data been savd in the localstorage and the data been inputed by the user

      const isPasswordCorrect = passwordCompare(password, userData.password);

      if(userName !== userData.userName){
        msg = "Username doesn't match"
        console.log(msg);
        setUser({...user, error:{msg: msg, status: true}});

        return;
      }
      else if(!isPasswordCorrect){
        msg = "Password doesn't match"
        console.log(msg); 
        setUser({...user, error:{msg: msg, status: true}});
      
        return;
      }
      
      setUser({
        userName: "",
        password: "",
        error: {msg: "", status: false}
      });

      navigate("/comments", { replace: true });
    }

  return (
    <section className="w-full min-h-screen bg-blue pb-6 pt-3">
      <h3 className="text-size-600 font-bold text-gray-100 uppercase ml-3">
        Welcome | Login
      </h3>
      <div className = "grid place-items-center mt-6">
        <div className="w-24 h-24 rounded-full bg-gray-blue-200 grid place-items-center">
            <img src={userIcon} alt="user image" className="w-3/5 h-3/5"/>
          </div>
          <div className="fluid-width h-fit shadow-md rounded-lg bg-gray-200 opacity-80 p-8 mt-6">
              <form className="w-full" onSubmit={handleFormSubmit}>
                {user.error.status && <div className="py-2 pl-4 bg-soft-red mb-4">
                  <p className="text-white text-size-400 font-normal">{user.error.msg}</p>
                </div>}
                <div className="w-full flex flex-col gap-y-3 mb-2">
                  <label htmlFor="name" className="text-size-500 font-bold text-dark-blue">Username</label>
                  <input type="text" id = "name" name="userName" className="h-[3rem] input-outline bg-white border-2 border-gray-300 rounded-md pl-2" onChange={handleInputChange}/>
                </div> 
                <div className="w-full flex flex-col gap-y-4 mb-2">
                  <label htmlFor="password" className="text-size-500 font-bold text-dark-blue">Password</label>
                  <input type="password" id = "password" name="password" className="h-[3rem] input-outline bg-white border-2 border-gray-300 rounded-md pl-2" onChange={handleInputChange}/>
                </div> 
                <button type = "submit" className="w-full h-12 bg-blue text-white font-bold text-size-500 rounded-md mt-6">Login</button>
              </form>
          </div>
      </div>
    </section>
  )
}

export default Login