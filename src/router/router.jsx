import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AddBlog from "../pages/PrivatePages/AddBlog/AddBlog";
import PrivateRoute from "./PrivateRoute";
import Wishlist from "../pages/PrivatePages/Wishlist/Wishlist";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs/FeaturedBlogs";
import Login from "../pages/AuthPages/Login";
import SignUp from "../pages/AuthPages/SignUp";
import DetailedBlog from "../pages/PrivatePages/DetailedBlog/DetailedBlog";
import UpdateBlog from "../pages/PrivatePages/UpdateBlog/UpdateBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-blogs",
        element: <AllBlogs></AllBlogs>,
      },
      {
        path: "/featured-blogs",
        element: <FeaturedBlogs></FeaturedBlogs>,
      },
      {
        path: "/add-blog",
        element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>,
      },
      {
        path: "/wishlist",
        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>,
      },
      {
        path: `/post/:id`,
        element: <DetailedBlog></DetailedBlog>,
        loader: ({ params }) => fetch(`https://theguidebb.vercel.app/blog/${params.id}`),
      },
      {
        path: `/updatePost/:id`,
        element: <PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>,
        loader: ({ params }) => fetch(`https://theguidebb.vercel.app/blog/${params.id}`),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
