import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  Button,
  Layout,
  Menu,
  Table,
  Mentions,
  Collapse,
  Row,
  Col,
  DatePicker,
  Space,
  Dropdown,
} from "antd";
import {
  PlusCircleOutlined,
  DotChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  GoogleCircleFilled,
} from "@ant-design/icons";
import { TestComponent } from "./components";
import { useAppSelector } from "./hooks";
import { TestChart } from "./components";
import { text } from "stream/consumers";

const { Header, Content, Footer, Sider } = Layout;
const { Panel } = Collapse;

const { RangePicker } = DatePicker;

const columns = [
  {
    title: "Title",
    dataIndex: "Title",
    key: "title",
  },
  {
    title: "Venue",
    dataIndex: "Venue",
    key: "venue",
  },
  {
    title: "Year",
    dataIndex: "Year",
    key: "year",
  },
  {
    title: "Authors",
    key: "authors",
    dataIndex: "Authors",
  },
];

const genExtra = () => (
  <a href={"google.com"} style={{ margin: 0 }}>
    {"google.com"}
  </a>
);

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

function App() {
  const [collapsed, setCollapsed] = useState(true);
  const papers = useAppSelector((state) => state.papers);

  const papersData = papers.map((paper) => ({
    ...paper,
    key: papers.indexOf(paper),
    Authors: paper.Authors[0] + " et al.",
  }));

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed, type) => {
          console.log(
            "Ah, so this gets logged in the browser console using F12",
            collapsed,
            type
          );
          setCollapsed(collapsed);
        }}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      >
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<PlusCircleOutlined />}>
            Add Paper
          </Menu.Item>
          <Menu.Item key="2" icon={<DotChartOutlined />}>
            Charts
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ position: "sticky", top: 0, width: "100%" }}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">Share</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
            <Menu.Item key="3">Feedback</Menu.Item>
          </Menu>
        </Header> */}
        <Content style={{ padding: "0 50px", marginTop: 20 }}>
          <TestChart></TestChart>
          <Row justify="end">
            <Col>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown overlay={menu} placement="bottomLeft">
                    <Button>test filter drop down</Button>
                  </Dropdown>
                </Space>
              </Space>
            </Col>
            <Col>
              <RangePicker></RangePicker>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={papersData}
            expandable={{
              expandedRowRender: (record) => (
                <a href={record.url} style={{ margin: 0 }}>
                  {record.url}
                </a>
              ),
            }}
          />
          {/* <Collapse>
            <Panel header="This header" key="1" extra={genExtra()}>
              {"asv"}
            </Panel>
          </Collapse> */}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
