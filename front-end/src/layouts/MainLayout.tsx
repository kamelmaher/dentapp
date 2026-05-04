import { Outlet } from "react-router"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import { Slide, ToastContainer } from "react-toastify"
const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <NavBar />
            <Outlet />
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
                pauseOnHover={false}
                transition={Slide}
                rtl
                theme="light"
            />
        </div>
    )
}

export default MainLayout
