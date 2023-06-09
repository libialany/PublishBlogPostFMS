### description

Simple example about roles and FSM.

### diagram

```mermaid
stateDiagram-v2
    [*] --> Review     : Send post
    Review --> Publish : Publish article
    Review --> Reject  : article rejected
    Reject --> [*]     : After reject
    Publish --> [*]    : After publish
```
### start 

in postgresql:

`create database test;`

`cd PublishBlogPostFMS/publish-post`

`npm i`

`cp .env.example .env`

`npx prisma migrate dev --name init`

`npx prisma migrate reset`

`npm run start:dev`

### test
admin can't create post, we validate if is admi by email.

`localhost:3000/posts`

```
{
   "title":"flux zone come back",
   "authorEmail":"alice@prisma.io"
}
```
`Not Authorized`

admin can approve/reject post

`localhost:3000/posts/1/publish`

```
{
   "userId":"1"
}
```

`localhost:3000/posts/1/reject`

```
{
   "userId":"1"
}
```
another endpoints :).

list all post of a user

`localhost:3000/posts/2/author`
```
{
    "userId":"2"
}
```
admin can list all posts.

`localhost:3000/posts`
```
{
    "userId":"1"
}
```

### note

I'm not implementing session/cookies, it's just a simple example of Implementing State Machines (FMS) with roles assigned.

**I am going to implement JWT for the next improvement**
