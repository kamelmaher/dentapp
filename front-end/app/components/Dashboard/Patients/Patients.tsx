export default function Patients() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">المرضى</h2>
        <p className="text-gray-500">قائمة جميع المرضى المسجلين</p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">

        <input
          placeholder="ابحث عن مريض..."
          className="rounded-2xl p-2 bg-white border border-gray-100 shadow-sm hover: shadow-md transition outline-0 w-80"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
          بحث
        </button>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover: shadow-md transition">

        <div className="grid grid-cols-4 bg-gray-50 p-4 text-gray-600 text-sm">
          <span>الاسم</span>
          <span>الهاتف</span>
          <span>آخر زيارة</span>
          <span>الحالة</span>
        </div>

        <div className="grid grid-cols-4 p-4 border-t items-center">

          <span className="font-medium">أحمد علي</span>
          <span className="text-gray-600">059xxxxxxx</span>
          <span className="text-gray-500">10/4/2026</span>

          <span className="text-green-600 text-sm">
            نشط
          </span>

        </div>

      </div>

    </div>
  );
}