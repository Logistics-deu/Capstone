import React from 'react';
import io from "socket.io-client";
import SplitPane from 'react-split-pane/lib/SplitPane';
import Pane from 'react-split-pane/lib/Pane'

var socket = null;

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      message: '',
      logs: [],
      height: 0
    }
    this.send = this.send.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    socket = io("http://121.145.133.119:3003");
    socket.on("connect", () => { console.log("connection server"); });
    socket.on('chat-msg', (obj) => {
      const logs2 = this.state.logs;
      obj.key = 'key_' + (this.state.logs.length + 1);
      console.log(obj);
      logs2.push(obj);
      this.setState({logs: logs2});
    })
  }

  send(e) {
    e.preventDefault();
    console.log('아이디 ' + e.target.id.value + '메세지 ' + e.target.message);
    socket.emit('chat-msg', {
      id: e.target.id.value,
      message: e.target.message.value
    });
    this.setState({message: ''});
    let message = document.getElementById('message');
    message.value = '';
  }

  componentDidMount() {
    this.setState({
      height: this.props.height
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.height !== prevProps.height) {
      this.setState({
        height: this.props.height
      });
    }
    this.scrollToBottom();
  };

  scrollToBottom =() =>{
    const objDiv = document.getElementById('MessageBox');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    const messages = this.state.logs.map(e => (
      <div key = {e.key}>
        <span>{e.id}: </span>
        <span>{e.message}</span>
      </div>
    ));
    return(
      <SplitPane split="horizontal">
        <Pane initialSize='90%'>
          <div 
          id="MessageBox"
          style={{overflowY:'scroll', height: this.state.height * 0.9}}>
            {messages}
          </div>
        </Pane>
        <Pane>
          <div>
            <form onSubmit={this.send}>
              <input id="id"></input>
              <input id="message"></input>
              <button type="submit"> 보내기 </button>
            </form>
          </div>
        </Pane>
      </SplitPane>
    );
  }
}

export default Chat;