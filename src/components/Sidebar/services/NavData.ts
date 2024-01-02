import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { Roles } from "../../../services/RoleChecker/Roles";
import { IoStatsChartSharp } from "react-icons/io5";

export const NavData: SidebarData[] = [
    {
        title: "Dashboard",
        link: "/",
        icon: MdDashboard,
    },
    {
        title: "Intern Management",
        link: "/intern",
        icon: MdManageAccounts,
        role: [Roles.ADMIN, Roles.DC],
    },
    {
        title: "Idea View",
        link: "/idea",
        icon: IoStatsChartSharp,
        role: [Roles.ADMIN, Roles.DC],
    },
];