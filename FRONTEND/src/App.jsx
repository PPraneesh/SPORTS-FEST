import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Success from "./Success";
function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Home />,
    },
    {
      path: "/success",
      element: <Success />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
