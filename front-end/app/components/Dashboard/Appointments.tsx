export default function Appointments() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">المواعيد</h2>
                <p className="text-gray-500">إدارة جميع مواعيد العيادة</p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 ">

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex justify-between items-center">
                    <p className="text-gray-500 text-sm">اليوم</p>
                    <h3 className="text-2xl font-bold text-blue-600">12</h3>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex justify-between items-center">
                    <p className="text-gray-500 text-sm">القادمة</p>
                    <h3 className="text-2xl font-bold text-emerald-600">8</h3>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex justify-between items-center">
                    <p className="text-gray-500 text-sm">ملغاة</p>
                    <h3 className="text-2xl font-bold text-red-500">2</h3>
                </div>

            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">

                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl">
                    اليوم
                </button>

                <button className="px-4 py-2 bg-gray-100 rounded-xl">
                    الأسبوع
                </button>

                <button className="px-4 py-2 bg-gray-100 rounded-xl">
                    الشهر
                </button>

                <input
                    placeholder="بحث عن مريض..."
                    className="ml-auto bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition flex justify-between items-center"
                />

            </div>

            {/* Appointments List */}
            <div className="space-y-4">

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex justify-between items-center">

                    <div>
                        <h3 className="font-bold text-gray-900">أحمد علي</h3>
                        <p className="text-gray-500 text-sm">10:00 AM - ألم أسنان</p>
                    </div>

                    <div className="flex gap-2 items-center">

                        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                            محجوز
                        </span>

                        <button className="text-sm text-green-600 hover:underline">
                            تأكيد
                        </button>

                        <button className="text-sm text-yellow-600 hover:underline">
                            تعديل
                        </button>

                        <button className="text-sm text-red-600 hover:underline">
                            إلغاء
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}