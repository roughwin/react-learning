import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Form, Col, Row, Input, Select } from 'antd';
import DndContainer from './container';

const { Option } = Select;

const FormItem = Form.Item;
const colors = ['red', 'yellow', 'green', 'azure', 'orchid', 'gray'];
export default class DndTest extends Component {
  state = {
    items: [1, 2, 3, 4, 5, 6].map(id => ({
      id,
      key: id,
      col: 8,
      ele: <FormItem
        label={`test-${id}`}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
      >
        {/* <Input value={`${id}`} onChange={() => {}}/> */}
        <Select>
          <Option value="aa">aa</Option>
        </Select>
      </FormItem>
    })),
  }
  render() {
    return <Form layout="horizontal" style={{ width: '100%', position: 'absolute' }}>
      <Row>
        <DndContainer
          items={this.state.items}
          onChange={(items) => this.setState({ items })}
        />
      </Row>
    </Form>
  }
}