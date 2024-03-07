import { createBrowserRouter } from "react-router-dom";
import Home from "./../../app/home/Home";
import ViewerPage from "@/app/viewer/ViewerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/viewer",
    element: <ViewerPage></ViewerPage>,
  },
]);

export default router;
