import "antd/dist/antd.css";
import {
  Layout,
} from "antd";
import { Filters, SideBar, Charts, Papers } from "./components";

const {  Content } = Layout;

function App() {
  
  return (
    <Layout>
      <SideBar />
      <Layout>
        <Content style={{ padding: "0 50px", marginTop: 20 }}>
                <Charts />
             <Filters />
           <Papers />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
