import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Root() {
  return (
    <div className="root-element">
      <Header />
      <div className="outlet">
          <Outlet />
      </div>
      <Footer />
    </div>
  );
}
