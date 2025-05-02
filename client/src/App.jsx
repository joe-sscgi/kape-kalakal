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
  Homepage,
  AdminDashboardLayout,
  AdminDashboard,
  MainUsers,
  AddUser,
  EditUser,
  DelUser,
  MainProds,
  AddProd,
  EditProd,
  DelProd,
  MainBrands,
  AddBrand,
} from "./pages";

// ACTIONS
import { action as actionRegister } from "./pages/Register";
import { action as actionLogin } from "./pages/Login";
import { action as actionAddUser } from "./pages/adminPages/MainUsers/AddUser";
import { action as actionEditUser } from "./pages/adminPages/MainUsers/EditUser";
import { action as actionDelUser } from "./pages/adminPages/MainUsers/DelUser";
import { action as actionAddProd } from "./pages/adminPages/MainProducts/AddProd";
import { action as actionEditProd } from "./pages/adminPages/MainProducts/EditProd";
import { action as actionDelProd } from "./pages/adminPages/MainProducts/DelProd";
import { action as actionAddBrand } from "./pages/adminPages/MainBrands/AddBrand";

// LOADERS
import { loader as homepageLoader } from "./pages/Homepage";
import { loader as adminDashboardLoader } from "./pages/AdminDashboardLayout";
import { loader as getUsersLoader } from "./pages/adminPages/MainUsers/MainUsers";
import { loader as editUserLoader } from "./pages/adminPages/MainUsers/EditUser";
import { loader as delUserLoader } from "./pages/adminPages/MainUsers/DelUser";
import { loader as getProdsLoader } from "./pages/adminPages/MainProducts/MainProds";
import { loader as editProdLoader } from "./pages/adminPages/MainProducts/EditProd";
import { loader as delProdLoader } from "./pages/adminPages/MainProducts/DelProd";
import { loader as getBrandsLoader } from "./pages/adminPages/MainBrands/MainBrands";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 50,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
        action: actionLogin(queryClient),
      },
      {
        path: "/register",
        element: <Register />,
        action: actionRegister,
      },
    ],
  },
  {
    path: "homepage",
    element: <Homepage />,
    errorElement: <Error />,
    loader: homepageLoader,
  },
  {
    path: "admin",
    element: <AdminDashboardLayout queryClient={queryClient} />,
    errorElement: <Error />,
    loader: adminDashboardLoader(queryClient),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "main-users",
        element: <MainUsers queryClient={queryClient} />,
        errorElement: <Error />,
        loader: getUsersLoader(queryClient),
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
        loader: editUserLoader(queryClient),
        action: actionEditUser(queryClient),
      },
      {
        path: "del-user/:id",
        element: <DelUser />,
        loader: delUserLoader(queryClient),
        action: actionDelUser(queryClient),
      },
      {
        path: "main-products",
        element: <MainProds queryClient={queryClient} />,
        errorElement: <Error />,
        loader: getProdsLoader(queryClient),
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
        loader: editProdLoader(queryClient),
        action: actionEditProd(queryClient),
      },
      {
        path: "del-product/:id",
        element: <DelProd />,
        loader: delProdLoader(queryClient),
        action: actionDelProd(queryClient),
      },
      {
        path: "main-brands",
        element: <MainBrands queryClient={queryClient} />,
        errorElement: <Error />,
        loader: getBrandsLoader(queryClient),
      },
      {
        path: "add-brand",
        element: <AddBrand />,
        errorElement: <Error />,
        action: actionAddBrand,
      },
    ],
  },
]);

const App = () => {
  // return <RouterProvider router={router} />;
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
