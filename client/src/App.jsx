import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router";

import {
  HomeLayout,
  Login,
  Register,
  Landing,
  Error,
  HomepageLayout,
  Homepage,
  RecipeLayout,
  Recipe,
  RecipeContainer,
  RecipeDetail,
  Shop,
  Cart,
  Profile,
  AdminDashboardLayout,
  AdminDashboard,
  ManageContent,
  SetFotm,
  SetBest,
  SetFeat,
  MaintenanceDashboard,
  MainUsers,
  AddUser,
  EditUser,
  DelUser,
  MainProds,
  AddProd,
  ProdImgs,
  ProdGallery,
  EditProd,
  ReplenishProd,
  DelProd,
  MainBrands,
  AddBrand,
  EditBrand,
  DelBrand,
  MainRecipes,
  AddRecipe,
  EditRecipe,
  DelRecipe,
  UtilitiesDashboard,
  ArchiveBrands,
  ArchiveProducts,
  ArchiveRecipes,
  ArchiveUsers,
} from "./pages";

// ACTIONS
import { action as actionRegister } from "./pages/Register";
import { action as actionLogin } from "./pages/Login";
import { action as actionAddUser } from "./pages/adminPages/Maintenance/MainUsers/AddUser";
import { action as actionEditUser } from "./pages/adminPages/Maintenance/MainUsers/EditUser";
import { action as actionDelUser } from "./pages/adminPages/Maintenance/MainUsers/DelUser";
import { action as actionAddProd } from "./pages/adminPages/Maintenance/MainProducts/AddProd";
import { action as actionEditProd } from "./pages/adminPages/Maintenance/MainProducts/EditProd";
import { action as actionReplenishProd } from "./pages/adminPages/Maintenance/MainProducts/ReplenishProd";
import { action as actionUploadProd } from "./pages/adminPages/Maintenance/MainProducts/ProdImgs";
import { action as actionDelProd } from "./pages/adminPages/Maintenance/MainProducts/DelProd";
import { action as actionAddBrand } from "./pages/adminPages/Maintenance/MainBrands/AddBrand";
import { action as actionEditBrand } from "./pages/adminPages/Maintenance/MainBrands/EditBrand";
import { action as actionDelBrand } from "./pages/adminPages/Maintenance/MainBrands/DelBrand";
import { action as actionAddRecipe } from "./pages/adminPages/Maintenance/MainRecipes/AddRecipe";
import { action as actionEditRecipe } from "./pages/adminPages/Maintenance/MainRecipes/EditRecipe";
import { action as actionDelRecipe } from "./pages/adminPages/Maintenance/MainRecipes/DelRecipe";
import { action as actionSetContent } from "./pages/adminPages/ManageContent/ManageContent";
import { action as actionSetFotm } from "./pages/adminPages/ManageContent/SetFotm";
import { action as actionSetBest } from "./pages/adminPages/ManageContent/SetBestSellers";
import { action as actionSetFeat } from "./pages/adminPages/ManageContent/SetFeatBrands";
import { action as actionUpdateProfile } from "./pages/Profile";
import { action as actionArchiveBrand } from "./pages/adminPages/Utils/Archive/ArchiveBrands";
import { action as actionArchiveProduct } from "./pages/adminPages/Utils/Archive/ArchiveProducts";
import { action as actionArchiveRecipes } from "./pages/adminPages/Utils/Archive/ArchiveRecipes";
import { action as actionArchiveUsers } from "./pages/adminPages/Utils/Archive/ArchiveUsers";

// LOADERS
import { loader as landingLoader } from "./pages/Landing";
import { loader as homepageLoader } from "./pages/HomepageLayout";
import { loader as recipeLoader } from "./pages/RecipeContainer";
import { loader as recipeDetailLoader } from "./pages/RecipeDetail";
import { loader as shopLoader } from "./pages/Shop";
import { loader as cartLoader } from "./pages/Cart";
import { loader as contentLoader } from "./pages/adminPages/ManageContent/ManageContent";
import { loader as setFotmLoader } from "./pages/adminPages/ManageContent/SetFotm";
import { loader as setBestSellerLoader } from "./pages/adminPages/ManageContent/SetBestSellers";
import { loader as setFeatBrandLoader } from "./pages/adminPages/ManageContent/SetFeatBrands";
import { loader as profileLoader } from "./pages/Profile";
import { loader as adminDashboardLoader } from "./pages/AdminDashboardLayout";
import { loader as adminDashboardDataLoader } from "./pages/AdminDashboard";
import { loader as getUsersLoader } from "./pages/adminPages/Maintenance/MainUsers/MainUsers";
import { loader as editUserLoader } from "./pages/adminPages/Maintenance/MainUsers/EditUser";
import { loader as delUserLoader } from "./pages/adminPages/Maintenance/MainUsers/DelUser";
import { loader as getProdsLoader } from "./pages/adminPages/Maintenance/MainProducts/MainProds";
import { loader as getProdImgsLoader } from "./pages/adminPages/Maintenance/MainProducts/ProdImgs";
import { loader as getProdGalleryLoader } from "./pages/adminPages/Maintenance/MainProducts/ProdGallery";
import { loader as editProdLoader } from "./pages/adminPages/Maintenance/MainProducts/EditProd";
import { loader as replenishProdLoader } from "./pages/adminPages/Maintenance/MainProducts/ReplenishProd";
import { loader as delProdLoader } from "./pages/adminPages/Maintenance/MainProducts/DelProd";
import { loader as getBrandsLoader } from "./pages/adminPages/Maintenance/MainBrands/MainBrands";
import { loader as editBrandLoader } from "./pages/adminPages/Maintenance/MainBrands/EditBrand";
import { loader as delBrandLoader } from "./pages/adminPages/Maintenance/MainBrands/DelBrand";
import { loader as getRecipesLoader } from "./pages/adminPages/Maintenance/MainRecipes/MainRecipes";
import { loader as editRecipeLoader } from "./pages/adminPages/Maintenance/MainRecipes/EditRecipe";
import { loader as delRecipeLoader } from "./pages/adminPages/Maintenance/MainRecipes/DelRecipe";
import { loader as getArchiveBrandsLoader } from "./pages/adminPages/Utils/Archive/ArchiveBrands";
import { loader as getArchiveProductsLoader } from "./pages/adminPages/Utils/Archive/ArchiveProducts";
import { loader as getArchiveRecipesLoader } from "./pages/adminPages/Utils/Archive/ArchiveRecipes";
import { loader as getArchiveUsersLoader } from "./pages/adminPages/Utils/Archive/ArchiveUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
      },
      {
        path: "/login",
        element: <Login />,
        action: actionLogin,
      },
      {
        path: "/register",
        element: <Register />,
        action: actionRegister,
      },
    ],
  },
  {
    path: "dashboard",
    element: <HomepageLayout />,
    errorElement: <Error />,
    loader: homepageLoader,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "recipes",
        element: <RecipeLayout />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Recipe />,
          },
          {
            path: "recipe-container/:type",
            element: <RecipeContainer />,
            errorElement: <Error />,
            loader: recipeLoader,
            // action: actionSetContent,
          },
          {
            path: "recipe-container/:type/:id",
            element: <RecipeDetail />,
            errorElement: <Error />,
            loader: recipeDetailLoader,
          },
        ],
      },
      {
        path: "shop",
        element: <Shop />,
        errorElement: <Error />,
        loader: shopLoader,
        // action: actionSetContent,
      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <Error />,
        loader: cartLoader,
        // action: actionSetContent,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminDashboardLayout />,
    errorElement: <Error />,
    loader: adminDashboardLoader,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
        loader: adminDashboardDataLoader,
      },
      {
        path: "set-content",
        element: <ManageContent />,
        errorElement: <Error />,
        loader: contentLoader,
        action: actionSetContent,
      },
      {
        path: "set-content/fotm",
        element: <SetFotm />,
        errorElement: <Error />,
        loader: setFotmLoader,
        action: actionSetFotm,
      },
      {
        path: "set-content/best-sellers",
        element: <SetBest />,
        errorElement: <Error />,
        loader: setBestSellerLoader,
        action: actionSetBest,
      },
      {
        path: "set-content/featured-brands",
        element: <SetFeat />,
        errorElement: <Error />,
        loader: setFeatBrandLoader,
        action: actionSetFeat,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <Error />,
        loader: profileLoader,
        action: actionUpdateProfile,
      },
      {
        path: "maintenance",
        element: <MaintenanceDashboard />,
        errorElement: <Error />,
      },
      {
        path: "main-users",
        element: <MainUsers />,
        errorElement: <Error />,
        loader: getUsersLoader,
      },
      {
        path: "add-user",
        element: <AddUser />,
        errorElement: <Error />,
        action: actionAddUser,
      },
      {
        path: "edit-user/:id",
        element: <EditUser />,
        errorElement: <Error />,
        loader: editUserLoader,
        action: actionEditUser,
      },
      {
        path: "del-user/:id",
        element: <DelUser />,
        loader: delUserLoader,
        action: actionDelUser,
      },
      {
        path: "main-products",
        element: <MainProds />,
        errorElement: <Error />,
        loader: getProdsLoader,
      },
      {
        path: "add-product",
        element: <AddProd />,
        errorElement: <Error />,
        action: actionAddProd,
      },
      {
        path: "edit-product/:id",
        element: <EditProd />,
        errorElement: <Error />,
        loader: editProdLoader,
        action: actionEditProd,
      },
      {
        path: "replenish-product/:id",
        element: <ReplenishProd />,
        errorElement: <Error />,
        loader: replenishProdLoader,
        action: actionReplenishProd,
      },
      {
        path: "product-imgs/:id",
        element: <ProdImgs />,
        errorElement: <Error />,
        loader: getProdImgsLoader,
        action: actionUploadProd,
      },
      {
        path: "product-gallery/:id",
        element: <ProdGallery />,
        errorElement: <Error />,
        loader: getProdGalleryLoader,
      },
      {
        path: "del-product/:id",
        element: <DelProd />,
        loader: delProdLoader,
        action: actionDelProd,
      },
      {
        path: "main-brands",
        element: <MainBrands />,
        errorElement: <Error />,
        loader: getBrandsLoader,
      },
      {
        path: "add-brand",
        element: <AddBrand />,
        errorElement: <Error />,
        action: actionAddBrand,
      },
      {
        path: "edit-brand/:id",
        element: <EditBrand />,
        errorElement: <Error />,
        loader: editBrandLoader,
        action: actionEditBrand,
      },
      {
        path: "del-brand/:id",
        element: <DelBrand />,
        errorElement: <Error />,
        loader: delBrandLoader,
        action: actionDelBrand,
      },
      {
        path: "main-recipes",
        element: <MainRecipes />,
        loader: getRecipesLoader,
      },
      {
        path: "add-recipe",
        element: <AddRecipe />,
        errorElement: <Error />,
        action: actionAddRecipe,
      },
      {
        path: "edit-recipe/:id",
        element: <EditRecipe />,
        errorElement: <Error />,
        loader: editRecipeLoader,
        action: actionEditRecipe,
      },
      {
        path: "del-recipe/:id",
        element: <DelRecipe />,
        loader: delRecipeLoader,
        action: actionDelRecipe,
      },
      {
        path: "utilities",
        element: <UtilitiesDashboard />,
        children: [
          {
            path: "archive-brands",
            element: <ArchiveBrands />,
            loader: getArchiveBrandsLoader,
            action: actionArchiveBrand,
          },
          {
            path: "archive-products",
            element: <ArchiveProducts />,
            loader: getArchiveProductsLoader,
            action: actionArchiveProduct,
          },
          {
            path: "archive-recipes",
            element: <ArchiveRecipes />,
            loader: getArchiveRecipesLoader,
            action: actionArchiveRecipes,
          },
          {
            path: "archive-users",
            element: <ArchiveUsers />,
            loader: getArchiveUsersLoader,
            action: actionArchiveUsers,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <RouterProvider router={router} />
  //     <ReactQueryDevtools initialIsOpen={false} />
  //   </QueryClientProvider>
  // );
};
export default App;
