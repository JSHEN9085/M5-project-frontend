import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { connect } from 'react-redux';
import {Button, Form, Segment, Modal, Message} from 'semantic-ui-react';

class NewChatForm extends React.Component {
  state = {
    topic: '',
    description: '',
    creator_id: this.props.user.user.id
  };

  handleChange = e => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/chats`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.status === 200){
        this.props.handleClose()
      } else {
        alert("Please enter a topic")
      }
    })
    this.setState({ topic: '' });
  };

  render = () => {
    return (
      <Segment inverted>
        <Form inverted className="new-chat-form" onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              name="topic"
              placeholder='Topic'
              value={this.state.topic}
              onChange={this.handleChange}
              style={{fontSize: "22pt"}}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              name="description"
              placeholder='Description(optional)'
              value={this.state.description}
              onChange={this.handleChange}
              style={{fontSize: "22pt"}} />
          </Form.Group>
          <Button type='submit'>Submit</Button>

        </Form>
      </Segment>
    );
  };
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })


export default connect(mapStateToProps)(NewChatForm);
