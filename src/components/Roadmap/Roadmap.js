import React, { Component } from 'react'
import { Timeline, Card, Col } from 'antd';
import CustomContent from '../CustomContent/CustomContent';

export default class Roadmap extends Component {
  render() {

    let roadmap =
      <Col offset={7} span={12}>
        <Card style={{ width: 530, boxShadow: "0 0 3px rgba(0,0,0,0.2)" }}>

          <Timeline>
            <Timeline.Item color="green">Create project structure</Timeline.Item>
            <Timeline.Item color="green">Write contracts</Timeline.Item>
            <Timeline.Item color="green">Test contracts</Timeline.Item>

            <Timeline.Item color="green">
              <p>Design and development of main pages</p>
              <p>Several UI updates and modifications</p>
              <p>Integrate MetaMask and Web3</p>
            </Timeline.Item>

            <Timeline.Item color="green">
              <p>Technical testing 1</p>
              <p>Technical testing 2</p>
              <p>Modifications and fixes</p>
            </Timeline.Item>

            <Timeline.Item color="green">Official launch of v1.0</Timeline.Item>
            <Timeline.Item color="orange">Bug fixes and updates</Timeline.Item>

            <Timeline.Item color="blue">
              <p>Integrate real world news to market</p>
              <p>Build betting games that use players</p>
              <p>Build a weekly fantasy league</p>
            </Timeline.Item>

          </Timeline >
          <hr />
          <br />

          <p>Built with <span role="img" aria-label="heart">💜</span></p>

        </Card>
      </Col>

    return (
      <CustomContent title="Roadmap" content={roadmap} />
    )
  }
}
