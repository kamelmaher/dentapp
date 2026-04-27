import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "layouts/MainLayout.tsx", [
        route("", "routes/Home.tsx"),
        route("clinic/:slug", "routes/Clinic.tsx"),
        route("clinics", "routes/ClinicsList.tsx"),
        route("dashboard", "routes/Dashboard.tsx", [
            index("components/Dashboard/DashboardHome.tsx"),
            route("appointments", "components/Dashboard/Appointments.tsx"),
            route("patients", "components/Dashboard/Patients.tsx"),
            route("settings", "components/Dashboard/Settings.tsx"),
        ]),
    ]),
    route("login", "routes/Login.tsx"),
    route("register", "routes/Register.tsx"),

] satisfies RouteConfig;
