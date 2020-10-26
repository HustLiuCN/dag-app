import React from 'react'
import AsideMenu from './views/menu'
import { Layout, ConfigProvider } from 'antd'
import Content from './views/content'
import DialogComponent from './views/dialog'
// import { defaultValidateMessages } from 'src/lib/validateMessages'

export default function App() {
  return (
    <ConfigProvider componentSize="middle">
      <Layout id="app">
        <AsideMenu />
        <Content />
        <DialogComponent />
      </Layout>
    </ConfigProvider>
  )
}
