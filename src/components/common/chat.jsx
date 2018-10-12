import React, { Component } from 'react';
import { Input, Button, Row, Col, message, List, Avatar } from 'antd';

const { Group, Search } = Input;

const SUPER_MAX = 100000
const TEXT_MSG = {
  type: 'text',
  userId: 1,
  direction: 'fromUser',
  message: 'demo text hello',
}


console.log('hello in chat');

// const TextItem = (props) => (<span></span>)

class MessageItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { justify, children, avatarOrder, avatar } = this.props;
    return <Row type="flex" justify={justify} align="bottom">
      <Col order={avatarOrder}>{avatar}</Col>
      <Col order={1}>{children}</Col>
    </Row>
  }
}

export default class MessageBox extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      messageList: [
        // TEXT_MSG,
        // {...TEXT_MSG, direction: 'toUser'}
      ]
    }
    this.sessionId = 'mp_1'
    this.retryCount = 0;
    this.connectWs(this.sessionId);
    this.fetchUserMessageLog()
  }
  
  connectWs = (sessionId) => {
    this.ws = new WebSocket("ws://hackathon2018.smartstudy.com/hello-world/ws", sessionId);
    this.ws.onmessage = (msg) => {
      const { data } = msg;
      let messageObj = {};
      try {
        messageObj = JSON.parse(data);
      } catch (e) {
        console.log(e, data, msg);
      }
      this.onMessage(messageObj);
      // const { type } = messageObj;
    }
    setInterval(() => {
      this.ws.send(JSON.stringify({ type: 'ping' }));
      this.retryCount += 1;
    }, 1000 * 30);
  }

  onMessage = (msg) => {
    const { type } = msg;
    switch (type) {
      case 'pong':
        this.retryCount = 0;
        break;
      case 'text':
        const { messageList = [] } = this.state;
        messageList.push(msg);
        this.setState({ messageList }, () => {
          if (this.messageListEl) {
            this.messageListEl.scrollTop = SUPER_MAX;
          }
        });
        break;
      default:
        break;
    }
  }

  // TODO: fetchSessionLogList
  fetchUserMessageLog = async () => {
    const userId = this.sessionId.split('_')[1];
    const url = `https://hackathon2018.smartstudy.com/hello-world/api/crm/message/list?userId=${userId}`
    const a = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const list = await a.json();
    // const { messageList = [] } = this.state;
    // messageList.push(msg);
    this.setState({ messageList: list }, () => {
      if (this.messageListEl) {
        this.messageListEl.scrollTop = SUPER_MAX;
      }
    });
    console.log(list);
  }
  // TODO: fetchUserInfo

  handleTextChange = (e) => {
    const a = e && e.target && e.target.value || '';
    this.setState({
      text: a,
    });
  }

  sendTextMsg = (text) => {
    const textMsg = {
      type: 'text',     
      // userId: 1,
      direction: 'toUser',
      message: text,
      sessionId: this.sessionId,
    }
    
    const url = 'https://hackathon2018.smartstudy.com/hello-world/api/crm/message/send-to-user';
    fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(textMsg),
    })
  }

  hanldeSend = () => {
    const { text } = this.state;
    if (!text) return;
    this.setState({
      sendLoading: true,
    });
    try {
      if (this.ws.readyState !== 1) {
        this.connectWs(this.sessionId)
      }
      this.sendTextMsg(text);
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
    console.log('hello in chat render')
    return <div style={{ width: '70vw', margin: '0 auto'}}>
      <div
        ref={el => {
          this.messageListEl = el;
        }}
        style={{
          height: 'calc(100vh - 100px)',
          overflow: 'scroll',
        }}
      >
        {
          // JSON.stringify(this.state.messageList)
          this.state.messageList.map(msg => {
            const { type, direction, serviceId } = msg;
            let justify = 'center';
            let avatarOrder = 0;
            let avatar;
            switch (direction) {
              case 'fromUser':
                justify = 'start'
                avatarOrder = 0;
                avatar = <Avatar size="large">User</Avatar>
                break;
              case 'toUser':
                justify = 'end';
                avatarOrder = 10;
                avatar = <Avatar size="large">{serviceId || 'U'}</Avatar>
                break;
              default:
                break;
            }
            return <MessageItem
              justify={justify}
              avatarOrder={avatarOrder}
              avatar={avatar}
            >{msg.message}</MessageItem>
          })
        }
      </div>
      <Search
        placeholder="input text"
        value={this.state.text}
        onSearch={this.hanldeSend}
        onChange={this.handleTextChange}
        enterButton="发送"
      />
    </div>
  }
}

