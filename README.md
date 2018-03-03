# node-js-实现爬虫爬取数据：
###### 以爬取boss直聘搜索到的web前端的job为例：
### 第一步：开启服务，模拟加载page。
### 第二步：https.get请求boss直聘上的数据。
### 第三步：处理数据，主要用到node的cheerio模块：找到数据后push到数组； 利用Mongodb连接数据库将爬取到的数据存入数据库。（注意：异步使用匿名紫执行函数）
### 第四步：通过ejs模板引擎将爬取的数据写入前端页面，具体查看spider-load-in-web.js。
