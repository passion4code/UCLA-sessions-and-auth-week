# Exercise 6 Challenge

The existing application currently creates a user by saving their email and password in Mongo.

This needs to be changed to do the following:

1. Using the bcrypt npm package, save the user's password as a hash instead of a plain-text string. 
2. In the login POST handler, change the lookup to find the user by their email, then validate their hash password.

https://www.npmjs.com/package/bcrypt



