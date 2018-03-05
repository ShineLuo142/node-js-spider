# node-js实现爬虫爬取数据存入数据库并渲染到前端页面：
###### 以爬取boss直聘搜索到的web前端的job为例：
##实现思路：
#### 第一步：开启服务，模拟加载page。
#### 第二步：https.get请求boss直聘上的数据。
#### 第三步：处理数据，主要用到node的cheerio模块：找到数据后push到数组。
        cheerio模块使用：https://www.npmjs.com/package/cheerio
#### 第四步：利用Mongodb连接数据库将爬取到的数据存入数据库。（注意：异步使用匿名自执行函数）
        mangodb官网：https://www.mongodb.com/
        mangodb手册：http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/
#### 第五步：通过ejs模板引擎将爬取的数据写入前端页面，具体查看spider-load-in-web.js。
        ejs模板使用：https://www.npmjs.com/package/ejs
