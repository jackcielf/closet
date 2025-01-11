import { AppRouting } from "./AppRouting";
import { Layout as LayoutAnt } from "antd";
import { Sidebar, Footer } from "./components";
import "./App.scss";

const { Content: ContentAnt } = LayoutAnt;

export default function App() {
  return (
    <LayoutAnt style={{ minHeight: "100vh" }}>
      <Sidebar />

      <LayoutAnt>
        <ContentAnt style={{ margin: "0 16px" }}>
          <AppRouting />
        </ContentAnt>
        
        <Footer />
      </LayoutAnt>
    </LayoutAnt>
  )
};