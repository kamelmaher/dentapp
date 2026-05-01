export default function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
    return <div className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition group">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
};