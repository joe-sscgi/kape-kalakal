import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export { default as HomeLayout } from "./HomeLayout";
export { default as Landing } from "./Landing";
export { default as Login } from "./Login";
export { default as Register } from "./Register";
export { default as Error } from "./Error";
export { default as Homepage } from "./Homepage";

// ADMIN PAGES
export { default as AdminDashboard } from "./AdminDashboard";
export { default as AdminDashboardLayout } from "./AdminDashboardLayout";
export { default as MainUsers } from "./adminPages/MainUsers/MainUsers";
export { default as AddUser } from "./adminPages/MainUsers/AddUser";
export { default as EditUser } from "./adminPages/MainUsers/EditUser";
export { default as DelUser } from "./adminPages/MainUsers/DelUser";
export { default as MainProds } from "./adminPages/MainProducts/MainProds";
export { default as AddProd } from "./adminPages/MainProducts/AddProd";
export { default as EditProd } from "./adminPages/MainProducts/EditProd";
export { default as DelProd } from "./adminPages/MainProducts/DelProd";
export { default as MainBrands } from "./adminPages/MainBrands/MainBrands";
export { default as AddBrand } from "./adminPages/MainBrands/AddBrand";
