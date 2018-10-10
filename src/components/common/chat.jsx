import React, { Component } from 'react';
import { Input, Button, Col, message } from 'antd';

const { Group } = Input;

export default class MessageBox extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    }
    this.sessionId = 1231212
    this.connectWs(this.sessionId);
  }
  
  connectWs = (sessionId) => {
    this.ws = new WebSocket("ws://hackathon2018.smartstudy.com/hello-world/ws", sessionId);
    this.ws.onmessage = (msg) => {
      const { data } = msg;
      let messageObj = {};
      try {
        JSON.parse(data);
      } catch (e) {
        console.log(e);
      }
      const { type } = messageObj;
    }
    setInterval(() => {
      this.ws.send(JSON.stringify({ type: 'ping' }));
    }, 1000 * 30);
  }

  handleTextChange = (e) => {
    const a = e && e.target && e.target.value || '';
    this.setState({
      text: a,
    });
    console.log(a)
  }

  hanldeSend = (e) => {
    e.preventDefault();
    const { text } = this.state;
    if (!text) return;
    this.setState({
      sendLoading: true,
    });
    try {
      // const url = 'https://hackathon2018.smartstudy.com/hello-world/api/crm/message/send-to-user';
      // fetch(url, {
      //   method: 'post',
      //   mode: 'cors',
      //   headers: {
      //     "Content-Type": "application/json; charset=utf-8",
      //   },
      //   body: JSON.stringify({
      //     content: text,
      //   }),
      // })
      if (this.ws.readyState !== 1) {
        this.connectWs(this.sessionId)
      }
      this.ws.send(text);
      this.setState({
        text: ''
      });
    } catch (e) {
      message.error(`${e.message}`);
    } finally {
      this.setState({ sendLoading: false });
    }
  }
  render() {
    return <div>
      <Group>
        <Col span={20}>
          <Input autosize onPressEnter={this.hanldeSend} value={this.state.text} onChange={this.handleTextChange} />
        </Col>
        <Col span={4}>
          <Button type="primary" loading={this.state.sendLoading} disabled={!this.state.text} onClick={this.hanldeSend}>发送</Button>
        </Col>
      </Group>
    </div>
  }
}