import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
        <main className= "max-container min-h-screen font-rubik border-2 border-pale-red">
            <Outlet />
        </main>
    </>
  )
}

export default Layout