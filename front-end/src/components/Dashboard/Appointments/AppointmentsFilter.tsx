import { AppointmentFilter } from "../../../data/AppointmentsFilter"

type AppointmentsFilterProps = {
    handleChangeType: (type: string) => void,
    handleSearch: (term: string) => void
}
const AppointmentsFilter = ({ handleChangeType, handleSearch }: AppointmentsFilterProps) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

            {/* Filter Select */}
            <div className="relative w-full sm:w-64">
                <select
                    className="w-full appearance-none px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition outline-none cursor-pointer"
                    defaultValue=""
                    onChange={(e) => handleChangeType(e.target.value)}
                >
                    {AppointmentFilter.map((item) => (
                        <option key={item.text} value={item.value}>
                            {item.text}
                        </option>
                    ))}
                </select>

                {/* Arrow icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    ▼
                </div>
            </div>

            {/* Search */}
            <div className="relative w-full sm:flex-1">
                <input
                    placeholder="بحث عن مريض..."
                    className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500/20 transition outline-none"
                    onChange={e => handleSearch(e.target.value)}
                />

                {/* Search icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                </div>
            </div>

        </div>
    )
}

export default AppointmentsFilter
