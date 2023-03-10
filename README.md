# YelpCamp-like APP

Full stack app where users can login, post and review campgrounds, and comment.

## NPM and NodeJS

### node.js

node.js 是一个 JavaScript 运行时，**它让 JavaScript 脱离了浏览器环境，可以直接在计算机上运行**，如访问 PC 其他组件/在 server 端(其他的电脑上)运行，所以让 JS（或者说框架 Express) **可以作为后端语言，极大地拓展了 JavaScript 用途**。

node.js 优点：有非阻塞，事件驱动 I/O 等特性，从而让高并发（high concurrency）在的轮询（Polling）和 comet 构建的应用中成为可能

### npm

npm 是 NodeJS 的包管理器(NodeJS package manager)，一般是随同 NodeJS 一起安装，能解决 NodeJS 代码部署上的很多问题：

- 在 Node.js 上开发时，会用到很多别人已经写好的 javascript 代码，如果每当我们需要别人的代码时，都根据名字搜索一下，下载源码，解压，再使用，会非常麻烦——于是就出现了包管理器 npm。大家把自己写好的源码上传到 npm 官网上，如果要用某个或某些个，直接通过 npm 安装就可以了

## Route: 不只是指 path 变量

route 路由，在 web 开发中，“route”是**指根据 url， 分配到对应的处理程序**。 就是一个**路径的解析，根据客户端提交的路径，将请求解析到相应的控制器上**。
a mechanism where **HTTP requests are routed to the code that handles them**. To put simply, in the Router you **determine what should happen when a user visits a certain page**.

#### Used npm packages:

Express, mongoose, ejs

## Demo

[app's link](https://yelpcamp-kenny.herokuapp.com/)

## Web Dev Essence

![Web Dev Facts](https://i.loli.net/2019/10/10/XjM4W1LUueZcbKT.png)

# Core Point 1 : RESTful routes

#### Conventional 7 routes

![RESTful 7 routes](https://i.loli.net/2019/08/30/CLEgtMA1FNbKexj.png)

#### Alternative

![other possible routes](https://i.loli.net/2019/10/10/C2ThtAwbxH178SI.png)

### routes(路由)——对应 web 开发中间一环，"处理"

Routes are the **program(code)** that are responsible for listening and receiving requests and then deciding what to send back.

路由：**url** 对应分配到的**处理程序**

---

### Restful

REST, Representational State Transfer 是一种**网络架构的风格**，具有这种**风格**的系统可以称为是 RESTful 的。
或者更直白地說：Restful is just **a pattern** for **defining routes**, by **mapping HTTP requests(C 端发起的请求) to CRUD operations(S 端处理请求的方式)**.

#### Why Restful? Benefits?

直观地从 **URL** 、发送的**http 请求**(GET、POST、DELETE...)、以及请求所得到的**状态码**，就知道做了什么操作，结果如何

---

### What is "CRUD"?

4 basic types of (DB) actions: **Create, Read, Update, and Delete. 增删改查**

(**上文的 7** routes 实则是 **CRUD： Read 对应 2 个 + C U D 3 个 + Create 和 Update 需先用 Read 2 个**, 但得**根据<u>实际的</u>业务需求来定义 routes**，所以**routes 的组合并不唯一**)

### 和 DB 交互的实现：Mongoose module， 在程序内负责：连接接 DB+处理 CRUD

mongoose: an Object Data Modeling (ODM) Library for MongoDB and Node.js, provides a straight-forward, schema-based solution to MODEL application data.

是针对 MongoDB 操作的一个对象模型库

1. 和 mongoDB**建立连接**
2. 封装了 MongoDB 对文档的的一些**增删改查**等常用方法

让**NodeJS 操作 Mongodb 数据库变得更加灵活简单**

---

## Advanced: Nested Routes

we take the campground in the ID and just put it before all of the routes that have to do with comments.
![before nesting](https://i.loli.net/2019/09/03/MVB7a4EWkiRHYPh.png)

Why? **Dependency**
Because a comment is **dependent on a campground**. They are inherently linked. Inside the CREATE, we're not just going to make a comment: make a comment + then associate it with the campground.

![nested routes](https://i.loli.net/2019/09/03/MVB7a4EWkiRHYPh.png)

So we're going to have to do a find by ID for camp ground.

### How this helps?

By following this pattern, you **don’t have to reinvent the wheel** every time you build a **new CRUD app**. The **<u>routes and method names</u>** have already been **<u>decided</u>** so that you can run the action by directly <u>**editing URL**</u> !!!

# Core Point 2: Data Associations

### Introduction to Associations: 3 types

- one to one
- **one to many**
- many to many

### 2 ways of writing associations

focus on **one to many** here
exmaple: user - entire posts

#### way1: Embedding Entire Data in JS array [] (No referencinng ID!) -> Embedded data is not a doc in DB

very straightfoward

![Embedded data](https://i.loli.net/2019/09/01/JT6jdwUgItNC3vB.png)

#### way2: References Data(Object References)

1. build reference in schema first

![build reference](https://i.loli.net/2019/09/01/8gdRm9Oqv7ChDpY.png)

2. refrence the post by **normal .push** as well
   ![reference](https://i.loli.net/2019/09/01/EK564MCQhA7jRVe.png)

3. show only IDs vs show complete data

- in .save() method's callback after pushing, its return value "user" shows only post IDs

- use findOne(userName: userName).**populate**("post").**excute**(func(err, user))
  to show **complete data** in referenced posts

# Core Point 3: Authentication
