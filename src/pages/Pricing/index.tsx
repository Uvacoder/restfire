import { Button, Card, Col, Layout, message, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

const Pricing: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <Header defaultSelectedKey="pricing" />
      <Layout.Content style={{ minHeight: '90vh', padding: '20px 24px' }}>
        <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '36px' }}>Pricing</Typography.Title>
        <Row>
          <Col span={24} sm={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 6 }} style={{ padding: '0 10px 20px' }}>
            <Card
              title="Frreeee"
              cover={<img style={{ maxWidth: '248px', width: '100%', margin: '0 auto' }} src="/assets/frog.png" alt="frog" />}
              actions={[<Link to="/app"><Button type="link" size="large">Select &nbsp; <span role="img" aria-label="emoji">😋</span></Button></Link>]}>
              <ul>
                <li>Basic functionality</li>
                <li>Web-based only</li>
                <li>Using custom proxy</li>
                <li>Request history</li>
                <li>More features coming soon</li>
              </ul>
            </Card>
          </Col>
          <Col span={24} sm={11} lg={{ span: 6, offset: 0 }} style={{ padding: '0 10px 20px' }}>
            <Card
              title="Premium"
              cover={<img style={{ maxWidth: '248px', width: '100%', margin: '0 auto' }} src="/assets/wolf.png" alt="wolf" />}
              actions={[<Link to="#"><Button size="large" onClick={() => message.info('Sorry, this is not available yet :(')} type="link">Download &nbsp; <span role="img" aria-label="emoji">🎉</span></Button></Link>]}>
              <ul>
                <li>All in <em>Frreeee</em></li>
                <li>Desktop installable</li>
                <li>Localhost API support</li>
                <li>Super fast</li>
                <li>More features coming soon</li>
              </ul>
            </Card>
          </Col>
        </Row>
        {/* <Row style={{ marginTop: '36px' }}>
          <Col span={24} lg={{ span: 12, offset: 6 }}>
            <Card
              title="Donate"
              actions={[
                <a href="https://karyakarsa.com/mgilangjanuar/restfire-studio">
                  <Button type="link" size="large">Buy sunflower seeds now!</Button>
                </a>
              ]}>
              <Typography.Paragraph>
                You can help us to make it better and keep it up by buying us a bag of sunflowerseeds for our
                hamsters. Ya! we have hamsters here, you can play with them anytime. They have 8 kids, now!
                <span role="img" aria-label="emoji"> 🐹 🐹 🐹 🐹 🐹 🐹 🐹 🐹 🤣</span>
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row> */}
      </Layout.Content>
      <Footer />
    </Layout>
  )
}

export default Pricing