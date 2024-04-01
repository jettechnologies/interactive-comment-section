import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
        <main className= "max-container min-h-screen font-rubik">
            <Outlet />
        </main>
    </>
  )
}

export default Layout