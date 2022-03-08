import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Layout, Menu } from 'antd'
import { PlusCircleOutlined, DotChartOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { TestComponent } from './components'

const { Header, Content, Footer, Sider} = Layout

function App() {
  const [collapsed, setCollapsed] = useState(true)

  return (

      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed, type) => {
            console.log("Ah, so this gets logged in the browser console using F12", collapsed, type)
            setCollapsed(collapsed)
          }}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: 0,
            left: 0
          }}
          trigger={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        >
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<PlusCircleOutlined />}>Add Paper</Menu.Item>
            <Menu.Item key="2" icon={<DotChartOutlined />}>Charts</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{position: 'sticky', top: 0, width: '100%'}}>
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="1">Share</Menu.Item>
              <Menu.Item key="2">About</Menu.Item>  
              <Menu.Item key="3">Feedback</Menu.Item>
            </Menu>
          </Header>
          <TestComponent/>
          <Content>
          <div style={{ padding: 24, background: "#fff", textAlign: "center" }}>
              ...
              <br />
              Really
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              long
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              content
            </div>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
  );
}

export default App;