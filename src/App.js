import { BrowserRouter } from "react-router-dom";
import "./App.css";
import SideBarLayout from "./layout/sidebar/SideBarLayout";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <SideBarLayout>
        <AppRouter />
      </SideBarLayout>
    </BrowserRouter>
  );
}

export default App;
