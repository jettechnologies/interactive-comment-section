import { checkIcon, userIcon } from "../assets"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { MD5 } from "crypto-js";

interface StateObj{
  str: string;
  error: boolean;
}

interface User{
  userName:StateObj;
  password: StateObj;
  imgUrl?: StateObj;
}

interface UserData{
  userName: string;
  password: string;
  imgUrl?: string;
  createdAt: Date;
}

const Signup = () => {
  const [user, setUser] = useState<User>({
    userName: {str: "", error: false},
    password: {str: "", error: false},
    imgUrl: {str: "", error: false},
  });

  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();


  // setting the values of the input fields
  function handleInputChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;

    setUser({ ...user, [name]: {str: value, error: false} });
}

const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  const { files } = target;

  if (!files || !files[0]) {
    return;
  }

  const file = files[0];
  const allowedExtensions = /\.(jpg|jpeg|png|svg)$/i;

  if (!allowedExtensions.test(file.name)) {
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target?.result as string;

    img.onload = () => {
      const { height, width } = img;

      if (height > 100 || width > 100) {
        alert("Image dimensions exceed 100px.");
        setUser(prevUser => {
          return { ...prevUser, imgUrl: { str: ""	, error: false } };
      });
        return;
      }

      const base64String = event.target?.result as string;
      setUser(prevUser => {
          return { ...prevUser, imgUrl: { str: base64String, error: false } };
      });
    };
  };

  reader.readAsDataURL(file);
};


const formSubmit = (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const nameRegex = /^[a-zA-Z\s]*$/;
  // const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/i;
  const {userName, password} = user;
  const userData: UserData = {
    userName: "",
    password: "",
    createdAt: new Date()
  };

 
  if(!nameRegex.test(userName.str)){
    setUser({ ...user, userName: { ...userName, error: true } });
    return;
  }
  else if(!passwordRegex.test(password.str)){
    setUser({ ...user, password: { ...password, error: true } });
    return;
  }

  const hashedPassword = MD5(password.str).toString();

  userData.userName = userName.str;
  userData.password = hashedPassword;
  userData.imgUrl = user.imgUrl?.str;

  setUser({
    userName: {str: "", error: false},
    password: {str: "", error: false},
    imgUrl: {str: "", error: false},
  })

  setCompleted(true);
}

  return (
    <section className="w-full min-h-screen bg-blue pb-6 pt-3 relative">
      <div className="w-full h-full">
        <h3 className="text-size-600 font-bold text-gray-100 uppercase ml-3">
          Welcome | signup
        </h3>
        <div className = "grid place-items-center mt-6">
          <div className="w-24 h-24 rounded-full bg-gray-blue-200 grid place-items-center">
              <img src={userIcon} alt="user image" className="w-3/5 h-3/5"/>
            </div>
            <div className="fluid-width h-fit shadow-md rounded-lg bg-gray-200 opacity-80 p-8 mt-6">
                <form onSubmit={formSubmit} className="w-full">
                  <div className="w-full flex flex-col gap-y-3 mb-2">
                    <label htmlFor="userName" className="text-size-500 font-bold text-dark-blue">Name</label>
                    <input type="text" id = "userName" name="userName" className="h-[3rem] input-outline bg-white border-2 border-gray-300 rounded-md pl-2" value = {user.userName.str} onChange={handleInputChange}/>
                    {user.userName.error && <p className="text-soft-red text-size-400 font-normal">Username shouldn't be empty and should be a aplhabet</p>}
                  </div> 
                  <div className="w-full flex flex-col gap-y-4 mb-2">
                    <label htmlFor="password" className="text-size-500 font-bold text-dark-blue">Password</label>
                    <input type="text" id = "password" name="password" value={user.password.str} onChange={handleInputChange} className="h-[3rem] input-outline bg-white border-2 border-gray-300 rounded-md pl-2"/>
                    {user.password.error && <p className="text-soft-red text-size-400 font-normal">Password shouldn't be empty and should be within 8 to 15 characters</p>}
                  </div> 
                  <div className="w-full flex flex-col gap-y-4 mb-2">
                    <label htmlFor="file_input" className="text-size-500 font-bold text-dark-blue">Profile Upload</label>
                    <input className="block w-full h-12 file:h-full text-size-500 file:mr-4 file:bg-soft-red file:text-white file:border-none input-outline border-2 border-gray-300 text-dark-blue font-normal rounded-lg cursor-pointer" aria-describedby="file_input_help" id="file_input" type="file" name="imgUrl" onChange={handleImgUpload} />
                    {user.imgUrl?.error && <p className="text-soft-red text-size-400 font-normal">File selected should be PNG, JPG OR SVG and shouldn't exceed 100x100</p>}
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG (MAX.100x100 ).</p>

                  </div> 
                  <button type = "submit" className="w-full h-12 bg-blue text-white font-bold text-size-500 rounded-md mt-6">Sign Up</button>
                </form>
            </div>
        </div>
      </div>
      {completed && <div className="w-full h-full grid place-items-center absolute inset-0 bg-gray-blue-200 opacity-80">
        <div className="w-[23rem] pt-6 pb-2 px-4 shadow-lg shadow-white rounded-md bg-white flex flex-col items-center gap-y-4">
            <img src={checkIcon} alt="congratulation icon" className="w-20 h-20"/>
            <p className="font-medium text-size-500 uppercase">Thanks for signing up</p>
            <button type = "button" className="w-full h-12 bg-blue text-white font-bold text-size-500 rounded-md mt-6" onClick = {() => navigate("/comments")}>Continue</button>
        </div>
      </div>}
    </section>
  )
}

export default Signup