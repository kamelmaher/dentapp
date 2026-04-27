import { NavLink, Outlet } from "react-router";
import { dashboardPages } from "~/data/constants";
import { useAuthStore } from "~/store/auth.store";

export default function Dashboard() {
    const { user } = useAuthStore();

    return (
        <div className="min-h-screen bg-[#f6f9fc] flex" dir="rtl">

            {/* Sidebar */}
            <aside className="w-64 bg-white border-l border-gray-100 p-6 hidden md:block shadow-sm">
                <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight mb-10">
                    DentApp
                </h1>

                <nav className="space-y-3 text-gray-600 text-sm flex flex-col gap-2">

                    {
                        dashboardPages.map(page =>
                            <NavLink
                                to={page.link}
                                className={`px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium`}
                                key={page.visible}
                            >
                                {page.visible}
                            </NavLink>
                        )
                    }

                    <p className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer mt-8 transition">
                        تسجيل الخروج
                    </p>
                </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 p-8 space-y-8">
                <Outlet />
            </main>
        </div >
    );
}