import { Outlet } from "react-router"
import Footer from "~/components/Footer"
import NavBar from "~/components/NavBar"
const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout
