import { useEffect } from 'react'
import { NavLink } from 'react-router'
import Spinner from './Spinner'
import { useAuthStore } from '../store/auth.store'

const NavBar = () => {
    const { isAuthenticated, fetchUser, loading, logout } = useAuthStore()
    useEffect(() => {
        if (!isAuthenticated)
            fetchUser()
    }, [fetchUser, isAuthenticated])
    return (
        <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
            <div className="text-2xl font-bold text-blue-600"><NavLink to={"/"}>SmileDesk</NavLink ></div>
            <div className="hidden md:flex rtl:space-x-reverse items-center gap-3">
                <NavLink to="#features" className="text-gray-600 hover:text-blue-600 transition">المميزات</NavLink>
                <NavLink to="/clinics" className="text-gray-600 hover:text-blue-600 transition">قسم العيادات</NavLink>
                <NavLink to="#pricing" className="text-gray-600 hover:text-blue-600 transition">الأسعار</NavLink>
                {
                    loading ? <div
                        className="w-30 text-center"
                    >
                        <Spinner size="md" color="blue-600" />
                    </div> :
                        isAuthenticated ? <>
                            <NavLink to={"/dashboard"} className="mx-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">لوحة التحكم</NavLink>
                            <button
                                onClick={() => logout()}
                                className="mx-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                                تسجيل الخروج
                            </button></> :
                            <>
                                <NavLink to={"/login"} className="text-gray-700 font-medium">تسجيل دخول</NavLink>
                                <NavLink to={"/register"} className="mx-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                                    ابدأ مجاناً
                                </NavLink>
                            </>
                }
            </div>
        </nav>
    )
}

export default NavBar
