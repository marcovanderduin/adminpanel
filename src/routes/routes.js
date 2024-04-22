import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Scooters from "@/pages/Scooters.vue";
import TableList from "@/pages/Accounts.vue";
import Maps from "@/pages/Maps.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "scooters",
        name: "Scooter Informatie",
        component: Scooters,
      },
      {
        path: "accounts",
        name: "Accounts",
        component: TableList,
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
        },
        component: Maps,
      },
    ],
  },
];

export default routes;
