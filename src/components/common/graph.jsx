import React, { Component } from 'react';
import Echarts from 'echarts';
import _ from 'lodash';

const EXAMPLE_DATA = {
  data: [
    {
      category: 0,
      name: "a",
      value: 1,
    },
    {
      category: 1,
      name: "b",
      value: 1,
    },
    {
      category: 1,
      name: "c",
      value: 1,
    },
    {
      category: 1,
      name: "d",
      value: 1,
    }
  ],
  links: [
    {
      source: 'a',
      target: 'b'
    },
    {
      source: 'b',
      target: 'c'
    },
    {
      source: 'b',
      target: 'd'
    }
  ],
  categories: [
    {
      base: 'add',
      keyword: {},
      name: "add",
      itemStyle: {
        color: '#0c0'
      }
    },
    {
      base: 'common',
      keyword: {},
      name: "common"
    }
  ]
}
export default class Graph extends Component {
  constructor() {
    super();
  }
  init = (el) => {
    console.log(el)
    if (this.myChart) {
      return;
    }
    this.myChart = Echarts.init(el);
    // 绘制图表
    this.myChart.setOption({
      // legend: {
      //   data: ['add', 'common']
      // },
      title: {
          text: 'hello, world'
      },
      tooltip: {},
      series: [{
        name: 'user',
        type: 'graph',
        layout: 'force',
        edgeSymbol: ['', 'arrow'],
        data: [],
        edges: [],
        // categories: EXAMPLE_DATA.categories,
        edgeSymbolSize: 5
      }],
    });
    this.setUserGraph();
  }

  setUserGraph = () => {
    getGraph(2, 123).then(list => {
      console.log(list)
      const data = _.uniq(list.reduce((sum, c) => ([...sum, c.currentUserId, c.fromUserId]), [])).map(l => ({
        category: 1,
        name: l,
        // value: 1,
      }));
      const links = list.map(l => ({
        source: l.fromUserId,
        target: l.currentUserId,
      }));
      if (this.myChart) {
        console.log('set chat')
        this.myChart.setOption({
          series: [{
            roam: true,
            data,
            edges: links,
          }]
        });
      }
    })
  }

  render() {
    return <div style={{width: '100vw', height: '90vh'}}>
      <div style={{width: 600, height:400}} ref={this.init}></div>
    </div>
  }
}


async function getUserHistLinks(userId, pageId) {
  const url = `https://hackathon2018.smartstudy.com/hello-world/api/back/graph/hist-link?userId=${userId}&pageId=${pageId}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
  console.log(result);
  return result;
}

async function getGraph(userId, pageId) {
  const url = `https://hackathon2018.smartstudy.com/hello-world/api/back/graph/all?userId=${userId}&pageId=${pageId}`;
  const result = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
  console.log(result);
  return await result.json();
}