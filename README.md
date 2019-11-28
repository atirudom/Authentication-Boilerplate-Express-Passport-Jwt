# Express Template for User Authentication using Jwt Passportjs and Mongoose
This template introduces a practical and simple approach to initialize user authentication service which can be done simply by following 3 basic steps: 
* (1) install packages 
* (2) set your authorized database url to .env (see app.js for required name)
* (3) run start and there you got a charming user authentication server!
* (Bonus) Since view is not implemented, Postman is recommended for your observation.

This repository serves as a template for developing user authentication service on ExpressJS using JWT and Passport.js.
The project stores user data on MongoDB Atlas and applies Mongoose for database modelling.

*Please create an issue thread for any questions even if you are backend newbie. <3

Main features are: 
* Login 
* Logout 
* Registration 
* Check if the given email exists
* Check if the current user is logged in. 


### Packages

Main packages used in this template are:
* [Express.js](https://github.com/expressjs/express) - Node.js framework
* [Passport.js](http://www.passportjs.org/) - Authentication library
* [JWT (JSON Web Tokens)](https://jwt.io/) - Secure Web Tokens
* [Mongoose](https://mongoosejs.com/) - MongoDB Object Modelling

### Database
[MongoDB Atlas](https://cloud.mongodb.com/) is used in this template.

### Running the app

Install all dependencies and run the app (dev. mode)

```
npm i
npm start
```

## Built With

* [Node.js](https://nodejs.org) - The backend framework
* [Express.js](https://github.com/expressjs/express) - Node.js framework


## Authors

* **Antonio Erdeljac** - *Initial work* - [Passport-Tutorial](https://github.com/AntonioErdeljac/Blog-Tutorial)
* **Atirach Intaraudom** - *Owner of this repository* - [Express-Passport-Jwt-Authentication-Template](https://github.com/atirudom/Express-Passport-Jwt-Authentication-Template)

## Acknowledgments

* The initial work was created as a tutorial in Antonio's [Medium article](https://medium.com/p/4a56ed18e81e)
* This repository was created as an authentication template for personal future work and for public uses of authentication template.
* Please create an issue thread for any questions even if you are backend newbie. <3

## Signature
Created by [atirudom](https://github.com/atirudom)
