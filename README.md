# YelpCamp app
Full stack app where users can login, post and review campgrounds, and comment.

## NPM and NodeJS

npm是nodejs的包管理器（package manager）一般是随同NodeJS一起安装，能解决NodeJS**<u>代码部署</u>**上的很多问题：在Node.js上开发时，会用到很多别人已经写好的javascript代码，如果每当我们需要别人的代码时，都根据名字搜索一下，下载源码，解压，再使用，会非常麻烦。于是就出现了包管理器npm。大家把**自己写好的源码**上传到npm官网上，如果要用某个或某些个，直接通过npm安装就可以了

#### Used npm packages: 

express, mongoose, ejs

## Demo

[app's link](https://yelpcamp-kenny.herokuapp.com/)



## Web Dev Essence

![Web Dev Facts](https://i.loli.net/2019/10/10/XjM4W1LUueZcbKT.png)

# Core Point 1 : RESTful routes

#### Conventional 7 routes

![RESTful 7 routes](https://i.loli.net/2019/08/30/CLEgtMA1FNbKexj.png)

#### Alternative

![other possible routes](https://i.loli.net/2019/10/10/C2ThtAwbxH178SI.png)

### routes(路由)

Routes are the **program(code)** that are responsible for listening and receiving requests and then deciding what to send back.

路由：**url** 对应分配到的**处理程序**

### Restful

REST, Representational State Transfer 是一种**网络架构的风格**，具有这种**风格**的系统可以称为是 RESTful 的。
或者更直白地說：Restful is just **a pattern** for **defining 7 routes**, by **mapping HTTP requests to CRUD operations**.

####  Why Restful? Benefits?

直观地从 URL 名称、发送的**http请求**(GET、POST、DELETE...)、以及请求所得到的**状态码**，就知道做了什么操作，结果如何

### What is "CRUD"?
4 basic types of (DB) actions: **Create, Read, Update, and Delete. 增删改查**

**上文的7** routes 实则是 **CRUD： Read对应2个 + C U D 3个 + Create和Update需先用Read 2个**, 但得**根据<u>实际的</u>业务需求来定义routes**，所以**routes的组合并不唯一**

### How this helps?
By following this pattern, you don’t have to reinvent the wheel every time you build a new CRUD app. The routes and method names have already been decided so that you can run the action by directly editing URL !!!



### 和DB交互的实现：Mongoose module， 在程序内，链接DB+处理CRUD 

mongoose: an Object Data Modeling (ODM) Library for MongoDB and Node.js, provides a straight-forward, schema-based solution to MODEL application data.

是针对MongoDB操作的一个对象模型库

1. 和mongoDB**建立连接** 
2. **封装了MongoDB对文档的的一些增删改查等常用方法**

让**NodeJS操作Mongodb数据库变得更加灵活简单**

## Advanced: Nested Routes
we take the campground in the ID and just put it before all of the routes that have to do with comments.
![before nesting](https://i.loli.net/2019/09/03/MVB7a4EWkiRHYPh.png)

Why? **Dependency**
Because a comment is **dependent on a campground**. They are inherently linked. Inside the CREATE, we're not just going to make a comment: make a comment + then associate it with the campground.

![nested routes](https://i.loli.net/2019/09/03/MVB7a4EWkiRHYPh.png)

So we're going to have to do a find by ID for camp ground.


# Core Point 2: Data Associations
### Introduction to Associations: 3 types
- one to one
- **one to many**
- many to many


### 2 ways of writing associations
focus on **one to many** here
exmaple: user - entire posts 

#### way1: Embedding Entire Data in Array(No referencinng ID!) -> Embedded data is not a doc in DB
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
