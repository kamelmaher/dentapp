
export default function DashboardHome() {
    return <>
        {/* Header */}
        <div>
            <h2 className="text-3xl font-bold text-gray-900">
                مرحباً د. 
            </h2>

            <p className="text-gray-500 mt-1">
                لوحة إدارة العيادة والمواعيد بشكل احترافي
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <p className="text-gray-500 text-sm">حجوزات اليوم</p>
                <h3 className="text-3xl font-bold text-blue-600 mt-2">12</h3>
            </div>

            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <p className="text-gray-500 text-sm">الحجوزات القادمة</p>
                <h3 className="text-3xl font-bold text-emerald-600 mt-2">8</h3>
            </div>

            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <p className="text-gray-500 text-sm">حالة العيادة</p>
                <h3 className="text-3xl font-bold text-blue-500 mt-2">
                    نشطة
                </h3>
            </div>

        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">

            {/* Schedule */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-5">
                    جدول اليوم
                </h3>

                <div className="space-y-4">

                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                        <span className="text-gray-700">10:00 - أحمد علي</span>
                        <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                            محجوز
                        </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                        <span className="text-gray-700">12:00 - سارة محمد</span>
                        <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                            محجوز
                        </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-500">14:00 - متاح</span>
                        <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                            فارغ
                        </span>
                    </div>

                </div>
            </div>

            {/* Upcoming */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-5">
                    المواعيد القادمة
                </h3>

                <ul className="space-y-4 text-sm">

                    <li className="p-3 bg-gray-50 rounded-xl flex justify-between">
                        <span>غداً - 11:00 - محمد خالد</span>
                        <span className="text-gray-400">قريباً</span>
                    </li>

                    <li className="p-3 bg-gray-50 rounded-xl flex justify-between">
                        <span>غداً - 13:00 - ريم أحمد</span>
                        <span className="text-gray-400">قريباً</span>
                    </li>

                    <li className="p-3 bg-gray-50 rounded-xl flex justify-between">
                        <span>بعد غد - 10:00 - علي حسن</span>
                        <span className="text-gray-400">قريباً</span>
                    </li>

                </ul>
            </div>
        </div>
    </>
}
