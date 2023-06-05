import BarraFooter from "../componentes/BarraFooter";
import BarraHeader from "../componentes/BarraHeader";
import { Outlet } from "react-router-dom";
import { ListaContext, RecordatorioContext } from "../scripts/DataContext";

export default function HomeLayout() {
  return (
    <main className="main-container">
      <ListaContext>
        <RecordatorioContext>
          <BarraHeader />
          <Outlet />
          <BarraFooter />
        </RecordatorioContext>
      </ListaContext>
    </main>
  );
}
