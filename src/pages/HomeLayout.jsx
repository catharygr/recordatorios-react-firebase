import BarraFooter from "../componentes/BarraFooter";
import BarraHeader from "../componentes/BarraHeader";
import { Outlet } from "react-router-dom";
export default function HomeLayout() {
  return (
    <main className="main-container">
      <BarraHeader />
      <Outlet />
      <BarraFooter />
    </main>
  );
}
