import React, { Component } from 'react';
import Echarts from 'echarts';
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
    getGraph(2, 123).then(list => {
      
    })
    // setInterval(() => {
    //   const newPoint = {
    //     category: 1,
    //     name: Math.random().toString(32),
    //     value: 1,
    //   }
    //   EXAMPLE_DATA.data.push(newPoint);
    //   const randomData = EXAMPLE_DATA.data[Math.ceil(Math.random() * (EXAMPLE_DATA.data.length - 2))];
      
    //   EXAMPLE_DATA.links.push({
    //     source: randomData.name,
    //     target: newPoint.name,
    //   });
    //   if (this.myChart) {
    //     this.myChart.setOption({
    //       series: [{
    //         roam: true,
    //         data: EXAMPLE_DATA.data,
    //         edges: EXAMPLE_DATA.links,
    //       }]
    //     });
    //   }
    // }, 10000);
  }
  init = (el) => {
    console.log(el)
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
        name: 'helo',
        type: 'graph',
        layout: 'force',
        edgeSymbol: ['', 'arrow'],
        data: EXAMPLE_DATA.data,
        edges: EXAMPLE_DATA.links,
        categories: EXAMPLE_DATA.categories,
        edgeSymbolSize: 5
      }],
    });
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
  return result;
}