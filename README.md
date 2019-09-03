# YelpCamp app
Full stack app where users can login, post and review campgrounds, and comment

[app's link](https://yelpcamp-kenny.herokuapp.com/)

# Core knowledge point 1 : RESTful 7 routes
![RESTful 7 routes](https://i.loli.net/2019/08/30/CLEgtMA1FNbKexj.png)

### What are routes?
Routes are the code that are responsible for listening and receiving requests and then deciding what to send back.

### What is CRUD?
4 basic types of (DB) actions: Create, Read, Update, and Delete.

### How this helps?
By following this pattern, you don’t have to reinvent the wheel every time you build a new CRUD app. The routes and method names have already been decided so that you can run the action by directly editing URL !!!

### Advanced: Nested Routes
we take the campground in the ID and just put it before all of the routes that have to do with comments.
![before nesting](https://i.loli.net/2019/09/03/MVB7a4EWkiRHYPh.png)

Why? **Dependency**
Because a comment is **dependent on a campground**. They are inherently linked. Inside the CREATE, we're not just going to make a comment: make a comment + then associate it with the campground.

![nested routes](https://i.loli.net/2019/09/03/MVB7a4EWkiRHYPh.png)

So we're going to have to do a find by ID for camp ground.


# Core knowledge point 2: Data Associations
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

# Core knowledge point 3: Authentication
