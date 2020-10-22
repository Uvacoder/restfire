import { Layout } from 'antd'
import React, { useEffect } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Maintenance from '../../components/Maintenance'

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <Header defaultSelectedKey="about" />
      <Layout.Content style={{ minHeight: '90vh', padding: '20px 24px' }}>
        <Maintenance />
      </Layout.Content>
      <Footer />
    </Layout>
  )
}

export default About