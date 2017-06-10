import React, {Component} from 'react';
// import { render } from 'react-dom';
import PropTypes from 'prop-types'
import moment from 'moment';
import { Alert, message, Select, Table, Checkbox, Input, Row, Col } from 'antd';
import 'moment/locale/zh-cn';

import {observable, action, computed, toJS} from 'mobx';
import {observer, inject} from 'mobx-react';
const InputGroup = Input.Group;
window.toJS = toJS;
@inject('store')
@observer
class SubTable extends Component {
  static propType = {
    store: PropTypes.object.isRequired,
  }
  tableData = {
    score: {
      name: 'score',
      title: '直达分',
      unit: '分',
      type: 'number',
      value: 0,
      placeholder: '修改直达分',
      editabel: false,
    },
    coursetime: {
      name: 'coursetime',
      title: '课时',
      unit: '课时',
      type: 'number',
      value: 0,
      placeholder: '赠送课时数',
      editabel: false,
    },
    deepExplain: {
      name: 'deepExplain',
      title: '逐题精讲',
      unit: '次',
      type: 'number',
      value: 0,
      placeholder: '赠送精讲月数',
      editabel: false,
    },
    spokenCorrecting: {
      name: 'spokenCorrecting',
      title: '口语批改',
      unit: '次',
      type: 'number',
      value: 0,
      placeholder: '赠送次数',
      editabel: false,
    },
    writeCorrecting: {
      name: 'writeCorrecting',
      title: '写作批改',
      unit: '次',
      type: 'number',
      value: 0,
      placeholder: '赠送次数',
      editabel: false,
    },
    validDay: {
      name: 'validDay',
      title: '商品有效期',
      unit: '天',
      type: 'number',
      value: 0,
      placeholder: '赠送天数',
      editabel: false,
    },
    rewrokTime: {
      name: 'rewrokTime',
      title: '可重读次数',
      unit: '次',
      type: 'number',
      value: 0,
      placeholder: '赠送次数',
      editabel: true,
    },    
  }
  genCourseOptions = (storeCourse) => {
    console.log(storeCourse);
    storeCourse.forEach((course) => {
      let key = course.name
      console.log(key)
      this.tableData[key].value = course.value;
      this.tableData[key].editabel = course.checked;
    })
  }
  constructor(props) {
    super(props)
    console.log(this.props.store.tableData);
    this.genCourseOptions(this.props.store.tableData)
    // ["直达分","课时","逐题精讲","口语批改","写作批改","商品有效期","可重读次数"]

  }

  render() {
    let data = this.props.store.tableData;
    let columns = this.tableData;
    window.data = data;
    console.dir(data);
    return (<div>

    <table>
        <thead className="ant-table-thead">
          <tr>
            {data.map((option) => (
              <th key={option.name}>
                <Checkbox
                checked={option.editabel}
                onChange={() => {option.editabel = !option.editabel}}
                >{option.title}</Checkbox>
              </th>
            ))}
          </tr>            
        </thead>
        <tbody className="ant-table-tbody">
          <tr className="ant-table-row  ant-table-row-level-0">
            {data.map((option) => (
              <td key={option.name}>{`${option.value}${option.unit}`}</td>
            ))}
          </tr>
          <tr className="ant-table-row  ant-table-row-level-0">
            {data.map((option) => (
              <td key={option.name}>
                <Input
                  style={{
                    width: '6rem'
                  }}
                  placeholder={option.placeholder}
                  disabled={!option.editabel}
                  addonAfter={<span>{option.unit}</span>}
                />
              </td>
            ))}
          </tr>
        </tbody>
    </table>
    <Row>
      <Col span={6}>
        <InputGroup
          style={{
            width: 'auto'
          }}
        >
          <Input
            style={{
              width: '6rem',
            }}
            placeholder={"输入两位小数"}
            addonBefore={<span>销售打折：</span>}
            onChange={()=>{console.log('onchange')}}
            addonAfter={<span>销售打折金额：****元</span>}
          />

        </InputGroup>
      </Col>
      <Col span={6}>
        <InputGroup
          style={{
            width: 'auto'
          }}
        >
          <Input
            style={{
              width: '4rem',
            }}
            placeholder={"输入金额"}
            addonBefore={<span>减免金额：</span>}
            onChange={()=>{console.log('onchange')}}
            addonAfter={<span>减免比例：10.23%</span>}
          />

        </InputGroup>
      
      </Col>
    
     
    </Row>
   
    </div>);

   
  }
}

export default SubTable;
