export default function Settings() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">الإعدادات</h2>
                <p className="text-gray-500">إدارة بيانات العيادة والحساب</p>
            </div>

            {/* Clinic Info */}
            <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover: shadow-md transition space-y-4 ">

                <h3 className="font-bold text-gray-800">بيانات العيادة</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                    <input
                        placeholder="اسم العيادة"
                        className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />

                    <input
                        placeholder="البريد الإلكتروني"
                        className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />

                    <input
                        placeholder="رقم الهاتف"
                        className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                    حفظ التغييرات
                </button>

            </div>

            {/* Danger Zone */}
            <div className="bg-white border border-red-200 rounded-2xl p-6">

                <h3 className="font-bold text-red-500">منطقة خطيرة</h3>
                <p className="text-gray-500 text-sm mt-1">
                    حذف الحساب لا يمكن التراجع عنه
                </p>

                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl">
                    حذف الحساب
                </button>

            </div>

        </div>
    );
}