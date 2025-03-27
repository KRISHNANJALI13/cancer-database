import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Uploads from "layouts/upload";
// import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";

// Vision UI Dashboard React icons
import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import LungTable from "layouts/lungTable";
import BrainTumorTable from "layouts/brainTumor";
import LeukemiaTable from "layouts/leukemia";

const routes = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/dashboard",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Tables,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AI predictor",
    key: "tables",
    route: "/upload",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Uploads,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AI predictor",
    key: "tables",
    route: "/lung",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: LungTable,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AI predictor",
    key: "tables",
    route: "/brain-tumor",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: BrainTumorTable,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AI predictor",
    key: "tables",
    route: "/leukemia",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: LeukemiaTable,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "AI predictor Result",
  //   key: "tables",
  //   route: "/result",
  //   icon: <IoStatsChart size="15px" color="inherit" />,
  //   component: Uploads,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <BsCreditCardFill size="15px" color="inherit" />,
  //   component: Billing,
  //   noCollapse: true,
  // },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  },
];

export default routes;
