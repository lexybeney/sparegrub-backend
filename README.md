<img alt="SpareGrub Logo" src="./public/logo_dark_bg.png" width="400px" style="display:block;margin:0 auto;"/>

# SpareGrub - Reducing Food Wastage

## The concept

As part of my software development bootcamp, I had to come up with an idea for my final project to demonstrate my understanding of servers, APIs and databases. [SpareGrub](https://sparegrub.co.uk) was created as my answer to reducing food wastage.

This is the backend repo, for the frontend repo click [here](https://github.com/lexybeney/sparegrub-frontend).

## What I used

- Node.js (Express)
- MySQL
- CORS
- Send-in-blue (third party email sending)

## Main features

- Self-built authorisation system and token generation
- RESTful API
- Password hashing using sha256
- Connected to a MySQL server
- Third party integration to send emails on signup and checkout
- Prepared statements to prevent against SQL injection

## How to use

### 1. To run locally

#### Clone this repo

```bash
git clone https://github.com/lexybeney/sparegrub-backend.git
```

#### Run the development server

```bash
npm start
```

## API Endpoints and methods

No authorisation needed:

| **Methods** |     **URLs**      |       **Actions**       |
| :---------- | :---------------: | :---------------------: |
| POST        |   /create/user    |       create user       |
| POST        |   /create/item    |    create user item     |
| POST        | /create/in_basket | add item to user basket |
| POST        |      /login       |       user login        |

Authorisation required:

| **Methods** |       **URLs**        |     **Actions**     |
| :---------- | :-------------------: | :-----------------: |
| GET         |      /read/user       |  get user profile   |
| GET         |     /read/listing     |  get user listing   |
| GET         | /read/available_items |    get all items    |
| GET         |   /read/user_basket   |   get user basket   |
| PUT         |     /update/user      | update user profile |
| PUT         |     /update/item      | update item details |
| DELETE      |        /logoff        |  remove user token  |
