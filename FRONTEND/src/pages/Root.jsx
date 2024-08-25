import { Outlet } from "react-router-dom";
import Header from "../components/Header";
export default function Root() {
  return (
    <div className="root-element">
      <Header />
      <div className="outlet">
          <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
