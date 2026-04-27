import React from 'react';
import { NavLink } from 'react-router';

const Dashboard = () => {
    // بيانات تجريبية للـ MVP
    const appointments = [
        { id: 1, patient: "أحمد محمد", time: "10:00 AM", type: "تنظيف أسنان", status: "Confirmed" },
        { id: 2, patient: "سارة خالد", time: "11:30 AM", type: "تقويم", status: "Pending" },
        { id: 3, patient: "محمود حسن", time: "01:00 PM", type: "فحص دوري", status: "Confirmed" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex shadow-inner">

            {/* Sidebar - بسيط جداً للـ MVP */}
            <aside className="w-64 bg-white border-l border-gray-200 hidden md:block">
                <div className="p-6 text-xl font-bold text-blue-600 border-b">DentaStack</div>
                <nav className="p-4 space-y-2">

                    <NavLink to="/" className="block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">الصفحة الرئيسية</NavLink>
                    <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">المواعيد</a>
                    <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">المرضى</a>
                    <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">الإعدادات</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto" dir="rtl">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">أهلاً دكتور محمد 👋</h1>
                        <p className="text-gray-500 text-sm">إليك ملخص عيادتك لهذا اليوم</p>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                        + حجز موعد جديد
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-right">
                    <StatCard title="مواعيد اليوم" value="8" icon="📅" color="text-blue-600" />
                    <StatCard title="مرضى جدد" value="3" icon="👤" color="text-green-600" />
                    <StatCard title="بانتظار التأكيد" value="12" icon="⏳" color="text-yellow-600" />
                </div>

                {/* Today's Appointments Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-lg text-right">جدول مواعيد اليوم</h3>
                        <button className="text-blue-600 text-sm font-medium">عرض الكل</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                                <tr>
                                    <th className="px-6 py-4">المريض</th>
                                    <th className="px-6 py-4">الوقت</th>
                                    <th className="px-6 py-4">نوع الخدمة</th>
                                    <th className="px-6 py-4">الحالة</th>
                                    <th className="px-6 py-4">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {appointments.map((apt) => (
                                    <tr key={apt.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-800">{apt.patient}</td>
                                        <td className="px-6 py-4 text-gray-600">{apt.time}</td>
                                        <td className="px-6 py-4 text-gray-600">{apt.type}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {apt.status === 'Confirmed' ? 'مؤكد' : 'قيد الانتظار'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 space-x-2 rtl:space-x-reverse">
                                            <button className="text-blue-600 hover:underline">تعديل</button>
                                            <button className="text-red-500 hover:underline">إلغاء</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Component البطاقة الإحصائية
const StatCard: React.FC<{ title: string, value: string, icon: string, color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
            <p className="text-gray-500 text-sm mb-1 font-medium">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className="text-3xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-xl">{icon}</div>
    </div>
);

export default Dashboard;