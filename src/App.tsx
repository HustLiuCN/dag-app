import React from 'react'
import AsideMenu from './views/menu'
import { Layout } from 'antd'
import Content from './views/content'
import DialogComponent from './views/dialog'

export default function App() {
  return (
    <Layout id="app">
      <AsideMenu />
      <Content />
      <DialogComponent />
    </Layout>
  )
}
