import { MdDashboard } from "react-icons/md";

export const NavData: SidebarData[] = [
    {
        title: "Dashboard",
        link: "/",
        icon: MdDashboard,
    },
    {
        title: "Intern Management",
        link: "/intern",
        icon: MdDashboard,
        role: ["Admin", "District Cordinator"],
    },
];