# NestJs Jwt and Post CRUD

This is an example of JWT in NestJs using passport.js, and json web tokens (JWT) and POST CRUD.

## Links

Click here for the [POSTMAN Documentation](https://www.postman.com/restless-flare-882422/workspace/0c1a6931-1348-4a50-ad25-6f1c65e767ad/overview)

## Endpoints

| METHOD |      Endpoint      |        Description         |
| ------ | :----------------: | :------------------------: |
| POST   | /auth/local/signup |       Register User        |
| POST   | /auth/local/signin |         Login User         |
| POST   |    /auth/logout    |           Logout           |
| POST   |   /auth/refresh    |       Refresh Token        |
| GET    |       /post        |        Get All Post        |
| GET    |     /post/all      | Get All Post By User Login |
| POST   |    /post/create    | Create post by user login  |
| POST   |    /post/update    | Update post by user login  |
| DELETE |   /post/refresh    | Delete post by user login  |
