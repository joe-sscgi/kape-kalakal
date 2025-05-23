// import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export { default as HomeLayout } from "./HomeLayout";
export { default as Landing } from "./Landing";
export { default as Login } from "./Login";
export { default as Register } from "./Register";
export { default as Error } from "./Error";

// CLIENT PAGES
export { default as HomepageLayout } from "./HomepageLayout";
export { default as Homepage } from "./Homepage";
export { default as Shop } from "./Shop";
export { default as Profile } from "./Profile";

// ADMIN PAGES
export { default as AdminDashboard } from "./AdminDashboard";
export { default as AdminDashboardLayout } from "./AdminDashboardLayout";

// MAINTENANCE
export { default as MaintenanceDashboard } from "./adminPages/Maintenance/MaintenanceDashboard";
export { default as MainUsers } from "./adminPages/Maintenance/MainUsers/MainUsers";
export { default as AddUser } from "./adminPages/Maintenance/MainUsers/AddUser";
export { default as EditUser } from "./adminPages/Maintenance/MainUsers/EditUser";
export { default as DelUser } from "./adminPages/Maintenance/MainUsers/DelUser";
export { default as MainProds } from "./adminPages/Maintenance/MainProducts/MainProds";
export { default as AddProd } from "./adminPages/Maintenance/MainProducts/AddProd";
export { default as ProdImgs } from "./adminPages/Maintenance/MainProducts/ProdImgs";
export { default as ProdGallery } from "./adminPages/Maintenance/MainProducts/ProdGallery";
export { default as EditProd } from "./adminPages/Maintenance/MainProducts/EditProd";
export { default as DelProd } from "./adminPages/Maintenance/MainProducts/DelProd";
export { default as MainBrands } from "./adminPages/Maintenance/MainBrands/MainBrands";
export { default as AddBrand } from "./adminPages/Maintenance/MainBrands/AddBrand";
export { default as EditBrand } from "./adminPages/Maintenance/MainBrands/EditBrand";
export { default as DelBrand } from "./adminPages/Maintenance/MainBrands/DelBrand";
export { default as MainRecipes } from "./adminPages/Maintenance/MainRecipes/MainRecipes";
export { default as AddRecipe } from "./adminPages/Maintenance/MainRecipes/AddRecipe";
export { default as EditRecipe } from "./adminPages/Maintenance/MainRecipes/EditRecipe";
export { default as DelRecipe } from "./adminPages/Maintenance/MainRecipes/DelRecipe";

// MANAGE CONTENT
export { default as ManageContent } from "./adminPages/ManageContent/ManageContent";

export { default as UsersArchive } from "./adminPages/Utils/Archive/UsersArchive";
export { default as BrandsArchive } from "./adminPages/Utils/Archive/BrandsArchive";
export { default as ProductsArchive } from "./adminPages/Utils/Archive/ProductsArchive";
