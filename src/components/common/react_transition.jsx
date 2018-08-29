import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch } from 'react-router-dom'
import PinyinWorker from 'components/workers/pinyin.worker.js';
import SelectPlus from './select-plus';

import { Button, Input, Select } from 'antd'
import { filter as sortWords, trans, rank } from './sortwords';
const duration = 150

const { Option } = Select;
// console.log(Worker)
window.pinyinWorker = PinyinWorker;
const worker = new PinyinWorker();
worker.onmessage = console.log;

const defaultStyle = {
  transition: `${duration}ms ease-in-out`,
  // transform: 'translateX(100px)',
  opacity: 0,
}

const transitionStyles = {
  entering: { transform: 'translateX(100px)', opacity: 0 },
  entered: { transform: 'translateX(0px)', opacity: 1 },
  exiting: { transform: 'translateX(0px)', opacity: 1 },
  exited: { transform: 'translateX(100px)', opacity: 0 },
}

const Fade2 = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames={{
      appear: 'my-appear',
      appearActive: '',
      enter: 'fadeIn',
      enterActive: 'animated',
      exit: 'fadeOut',
      exitActive: 'animated',
    }}
  >
    {children}
  </CSSTransition>
)

const Fade = ({ in: inProp }) => (
  <div>
    hello
    <Transition in={inProp} timeout={duration}>
      {
        (state) => (<div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          I'm A fade Transition!
        </div>)
      }
    </Transition>
  </div>
)


export const CssTransitionHOC = DefaultComponent => class extends Component {
  // constructor() {
  //   super();
  // }
  render() {
    return <CSSTransition
      {...this.props}
      timeout={1000}
      classNames={{
        appear: 'my-appear',
        appearActive: '',
        enter: 'fadeInUp',
        enterActive: 'animated',
        exit: 'fadeOutDown',
        exitActive: 'animated',
      }}
    >
      <DefaultComponent
        {...this.props}
      />
    </CSSTransition>
  }
}


@CssTransitionHOC
class AAA extends Component {
  render() {
    return <div>{
      this.props.children
    }</div>
  }
}

class TransitionEx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    }
    // this.interval = setInterval(() => {
    //   this.setState({
    //     show: !this.state.show,
    //   })
    // }, 1000)
    this.arr =
      trans(["合作项目", "微信公众号", "陌拜到访", "软文推广", "品牌专区-线上", "关注微信", "商机自动分配", "美小线上", "APP", "品牌-直接访问", "app 注册", "朋友圈分享", "常春藤CLUB", "公众账号", "微信群", "淘宝店", "天猫店", "京东店", "网络电话-线上", "活动", "新媒体", "渠道合作", "英特学校", "中美班", "中澳班", "本地渠道", "渠道活动", "电商运营", "一级", "员工介绍", "学生介绍", "二级", "综合渠道数据", "三级", "自然流量", "线上", "微信", "网站数据", "渠道", "呼入", "A1", "媒介", "A2", "A3", "A4", "B1", "香港SAT", "促销", "用户活动", "社群", "直播课", "其他", "CPS联盟", "DSP", "SEM", "未付款", "乐语", "移动数据", "国学数据", "ha3", "其他活动", "银行渠道", "异业合作", "机构渠道", "其他投放", "户外广告", "平面广告", "短信/EDM", "B2", "B3", "陌拜", "C1", "美小运营", "C2", "商务拓展渠道", "C3", "LP", "D1", "D2", "智留学微信公众号", "D3", "模考软件", "备考站-PC", "批改网数据", "AAA1", "yunoffer", "信息流", "电商", "学习中心-美洽", "投放-知壳网美洽", "知壳网", "E1", "E2", "AAA2", "E3", "F1", "F2", "F3", "AAA", "自然-美洽", "用户活动-投放", "线上BD-渠道合作-电视页面导流", "线上BD-渠道合作-渠道换量", "线上BD-渠道合作-图书课程激活", "AAA3", "知壳网公众号", "托福", "线上BD-活动-合作活动", "雅思", "GRE", "GMAT", "SAT", "h33", "选校帝合作数据", "校园渠道", "第三方平台", "个人渠道", "中心活动", "行业展会", "地推", "社群运营", "PC-品牌专区-百度", "PC-搜索-百度", "PC-搜索-搜狗", "移动-展示-朋友圈", "移动-展示-广点通", "资讯", "移动-搜索-百度", "移动-搜索-搜狗", "PC-搜索-360", "移动-搜索-360", "移动-展示-智汇推", "移动-展示-有道智选", "移动-品牌专区-百度", "移动-展示-百度信息流", "PC-品牌专区-360", "移动-品牌专区-360", "h44", "预约体验课", "美小数字营销-展示", "选校帝", "论坛", "test3", "美小自然流量", "数字营销-SEM", "四级", "网站注册", "训练营", "运营活动", "APP-选校帝", "论坛注册", "微信-智留学", "微博-知壳网", "知乎", "今日头条", "QQ空间", "百度合作", "百度合作-百度百科", "百度合作-百度糯米", "百度合作-百度翻译", "百度合作-大搜视频", "百度合作-百度文库", "搜狗合作-选校帝", "百度合作-选校帝", "渠道招商", "其它地推", "D4", "线下", "介绍", "渠道数据", "历史渠道", "校园其它", "校园讲座", "校园代理", "酒店会销", "校园外展", "社区", "竞品地推", "考点地推", "拉到访", "图书大厦", "约到访", "美小移动-展示", "异业活动", "图书大厦活动", "美小邀约数据", "在线咨询", "线上代理", "淘宝", "淘宝-知壳网", "图书夹带", "E4", "美小第三方数据", "数字营销-展示", "微信-知壳网", "1", "2", "3", "4", "t123", "美小-广点通-线上", "B4", "C4", "F4", "移动-搜索-360-线上", "美小-今日头条-线上", "美小邀约数据-NT", "公众号", "添加好友", "扫码", "线上课程卡", "移动展示", "二级来源测试", "历史", "呼入400", "QQ群", "", "一级来源测试", "三级来源测试", "PC-品牌专区-搜狗", "移动-品牌专区-搜狗", "赛事活动", "移动-搜索-搜狗-线上", "渠道拉新", "渠道公众号", "群主拉新", "朋友圈", "111111", "集团渠道", "PC-品牌专区-百度-线上", "PC-品牌专区-搜狗-线上", "PC-品牌专区-360-线上", "移动-品牌专区-百度-线上", "移动-品牌专区-搜狗-线上", "移动-品牌专区-360-线上", "呼入400-线上", "ha4", "PC-展示-智汇推", "PC-展示-广点通", "PC-展示-今日头条", "网络电话", "a1", "a2", "a3", "a4", "运营", "PC-知壳网数据", "添加数据来源测试", "备考站", "品牌专区", "美洽", "PC展示", "移动-公众号", "在线咨询-线上", "PC-搜索-百度-线上", "品牌", "PC-搜索-搜狗-线上", "校园", "线上BD", "PC-搜索-360-线上", "拉访", "移动-搜索-百度-线上", "续报", "test1", "老生续报"]);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const arr = new Array(100).fill(0).map((c, i) => i);
    return <div>
      <Select
        style={{width: 300}}
        onPopupScroll={(e) => {
          console.log(e.target.scrollTop, e.target.offsetTop, e.target.scrollHeight)
        }}
        showSearch
        onFocus={() => console.log('onfocus')}
        onSearch={console.log}
        onChange={console.log}
        // getPopupContainer={() => { return document.createElement('div')} }
      >
        <Option key="select__all" value="select__all" disabled>
          <div>
            <Button
              size="small"
              onClick={() => {
                console.log('click select all');
              }}
            >选择全部</Button>
          </div>
        </Option>
        {
          arr.map(i => <Option key={`${i}`} value={i}>{i}</Option>)
        }
      </Select>
      <SelectPlus
        style={{ width: 300 }}
      >
        {
          arr.map(i => <Option key={`${i}`} value={i}>{i}</Option>)
        }
      </SelectPlus>
      <Input
        onChange={(e) => {
          const inputValue = e ? e.target.value : '';
          this.setState({
            inputValue,
          });
        }}
      />
      {
        sortWords(this.arr, this.state.inputValue || '').map(s => (<div>{s[1]}</div>))
      }
      <Button
        type="primary"
        onClick={() => {
          this.setState({
            show: !this.state.show,
          })
        }}
      >Button</Button>
      <Fade
        in={this.state.show}
      ></Fade>
      <TransitionGroup>
        {
          this.state.show &&
          <Fade2
          // in={this.state.show}
          >
            <div id={123}>
              hello9999999
            </div>
          </Fade2>
        }
      </TransitionGroup>
      <Button
        onClick={() => {
          const list = this.state.fadeList || [];
          const t = window.performance.now();
          const aaa = <AAA key={t}>{t}</AAA>
          list.push(aaa)
          this.setState({
            fadeList: list,
          })
        }}
      >
        PUSH
      </Button>
      <Button
        onClick={() => {
          const list = this.state.fadeList || [];
          list.pop();
          this.setState({
            fadeList: list,
          })
        }}
      >
        POP
      </Button>
      <Button
        onClick={() => {
          this.setState({
            fadeList: [],
          })
        }}
      >
        CLEAR
      </Button>
      <TransitionGroup>
        {
          this.state.fadeList
        }
      </TransitionGroup>
    </div>
  }
}

export default TransitionEx;
