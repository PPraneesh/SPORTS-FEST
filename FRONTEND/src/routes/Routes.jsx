import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Success from "../pages/Success";
import Failure from "../pages/Failure";
import Category from "../pages/Category";
import Sports from "../pages/Sports";
import Accommodation from "../pages/Accommodation";
import Root from "../pages/Root";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children:[{
        path: "",
        element: <Home />,
      },
      {
        path:"/register",
        element:<Sports />
      },
      {
        path:"/accommodation",
        element:<Accommodation />
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/failure",
        element: <Failure />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path:"/admin/:category",
        element:<Category />
      }]
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
