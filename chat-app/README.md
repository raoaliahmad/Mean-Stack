# Chat-App


## A little explanation about the modules we installed:
- **Nodemon**: runs in development mode, whenever you make changes to your code and save, it restarts our server.
- **Babel/core**: contains the Node API and requires hook.
- **Babel/preset-env**: contains a set of plugins to convert ES6 features to equivalent ES5.
- **Babel/register:** uses Node’s require() hook system to compile files when they are loaded.
- **Babel-polyfill**: includes a custom regenerator runtime and core-js which imitates a full ES6 environment and is intended to be used in an application.
- **Express**: minimal Node.js framework that uses an abstraction layer to perform operations such as creating a server and handling routes.
- **Body-parser**: Body parsing middleware to parse incoming request bodies to pass to our routes.
- **Cloudinary**: module that includes Cloudinary API.
- **Dotenv**: module that loads production-sensitive data (database connection links, passwords, etc) in form of variables into the application.
- **Mongoose**: ODM for performing transactions with MongoDB.
- **Multer**: module for handling file uploads from requests.
- **Socket.io**: module that helps to set up a Socket.IO server for accepting and broadcasting messages to connected clients.