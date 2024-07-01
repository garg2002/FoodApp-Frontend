import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SearchItem from "../components/SearchItem";
import App from "../App";
import FoodCategory from "../components/FoodCategory";
import RestaurantsDetail from "../pages/RestaurantsDetail";
import Signin from "../pages/Signin";
import SignUp from "../pages/SignUp";
import Cart from "../pages/Cart";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchItem />,
      },
      {
        path: "/category/:id/",
        element: <FoodCategory />,
      },
      {
        path: "/restaurants/:id/",
        element: <RestaurantsDetail />,
      },
      {
        path: "/login",
        element: <Signin />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/cart",
        element: <Cart />,
      }
    ],
  },
]);

export default routes;
