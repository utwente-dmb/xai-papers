import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Layout, Menu, Table, Mentions } from 'antd'
import { PlusCircleOutlined, DotChartOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { TestComponent } from './components'
import { useAppSelector } from './hooks';

const { Header, Content, Footer, Sider} = Layout

const columns = [
  {
    title: 'Title',
    dataIndex: 'Title',
    key: 'title'
  },
  {
    title: 'Venue',
    dataIndex: 'Venue',
    key: 'venue',
  },
  {
    title: 'Year',
    dataIndex: 'Year',
    key: 'year',
  },
  {
    title: 'Authors',
    key: 'authors',
    dataIndex: 'Authors',
  }
  
];

function App() {
  const [collapsed, setCollapsed] = useState(true)
  const papers = useAppSelector((state) => state.papers)

  const papersData = papers.map((paper) => ({...paper, key: papers.indexOf(paper), Authors: paper.Authors[0] + ' et al.'}))

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
          <Table 
            columns={columns} 
            dataSource={papersData} 
            expandable={{
              expandedRowRender: record => <p style={{ margin: 0 }}>{record.url}</p>
            }}
          />
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
  );
}

export default App;
