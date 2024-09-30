// mock.js

// 引入mockjs
const Mock = require('mockjs');

// 获取 mock.Random 对象
const Random = Mock.Random
// mock新闻数据，包括新闻标题title、内容content、创建时间createdTime
const produceNewsData = function () {
    let newsList = [];
    for(let i = 0; i < 20; i++) {
        let newNewsObject = {
            title: Random.ctitle(), // Random.ctitle(min, max) 随机产生一个中文标题，长度默认在3-7之间
            content: Random.cparagraph(), // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
            createdTime: Random.date() // Random.date()指示生成的日期字符串的格式，默认为yyyy-MM-dd；
        }
        newsList.push(newNewsObject)
    }

    return newsList
}

// 请求该url，就可以返回newsList
Mock.mock('/mock/news', produceNewsData) // 后面讲这个api的使用细节


// 添加信息
let projectList = []
Mock.mock('/mock/addProject', ops => {
    // 拦截ajax请求，调用函数
    console.log(ops) // 先看一下这个ops是什么
    ops = JSON.parse(ops.body)
    projectList.push(ops)
})

// 获取信息
Mock.mock('/mock/projects', projectList)