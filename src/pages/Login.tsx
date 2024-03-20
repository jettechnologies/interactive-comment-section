import { userIcon } from "../assets"

const Login = () => {
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
              <form className="w-full">
                <div className="w-full flex flex-col gap-y-3 mb-2">
                  <label htmlFor="name" className="text-size-500 font-bold text-dark-blue">Name</label>
                  <input type="text" id = "name" name="name" className="h-[3rem] input-outline bg-white border-2 border-gray-300 rounded-md pl-2"/>
                </div> 
                <div className="w-full flex flex-col gap-y-4 mb-2">
                  <label htmlFor="password" className="text-size-500 font-bold text-dark-blue">Password</label>
                  <input type="text" id = "name" name="password" className="h-[3rem] input-outline bg-white border-2 border-gray-300 rounded-md pl-2"/>
                </div> 
                <button type = "submit" className="w-full h-12 bg-blue text-white font-bold text-size-500 rounded-md mt-6">Login</button>
              </form>
          </div>
      </div>
    </section>
  )
}

export default Login