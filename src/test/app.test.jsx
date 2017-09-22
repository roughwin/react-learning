import React from 'react'
import { shallow } from 'enzyme'
import Test from './app';
describe('单元测试1', () => {
  it('App组件正常渲染', () => {
    shallow(<Test />)
  })
})