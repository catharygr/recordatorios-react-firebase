import BarraFooter from "../componentes/BarraFooter";
import BarraHeader from "../componentes/BarraHeader";
import { Outlet } from "react-router-dom";
import {
  ListaContext,
  RecordatorioContext,
  TipoHomeContext,
  ColorUIContext,
} from "../scripts/DataContext";

export default function HomeLayout() {
  return (
    <main className="main-container">
      <ListaContext>
        <RecordatorioContext>
          <TipoHomeContext>
            <ColorUIContext>
              <BarraHeader />
              <Outlet />
              <BarraFooter />
            </ColorUIContext>
          </TipoHomeContext>
        </RecordatorioContext>
      </ListaContext>
    </main>
  );
}
