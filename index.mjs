import cookieParser from 'cookie-parser';
import express from 'express';
import methodOverride from 'method-override';
import bindRoutes from './routes.mjs';

import {Server} from 'socket.io'
import { instrument } from '@socket.io/admin-ui';  

// Initialise Express instance
const app = express();

// socket.io stuff
/////////////////////////////////////////////////
/////////////////////////////////////////////////
const io = new Server(3005, {
  cors: {
    origin: ['http://localhost:3006', "https://admin.socket.io"],
    credentials: true,
  },
});

const CLIENT_TO_SERVER_MESSAGE = "client-to-server-message";
const SERVER_TO_CLIENT_MESSAGE = "server-to-client-message";
const JOIN_ROOM = "join-room";


io.on('connection', socket => {
  
  console.log("user is connected: " + socket.id)

  // RECEIVE MESSAGE FROM CLIENT
  socket.on(CLIENT_TO_SERVER_MESSAGE, (message, room) => {
    // console.log("room: \n")
    // console.log( room)
    // console.log("message from client: ")
    // console.log(message)

    if (room) {
      // console.log("sending message to room:")
      // console.log(room)

      socket.to(room).emit(SERVER_TO_CLIENT_MESSAGE, message)
    }
    
  })

  // // JOIN ROOM
  socket.on(JOIN_ROOM, room => {
    console.log("joining room:");
    console.log(room);
    socket.join(room)
    socket.to(room).emit(JOIN_ROOM)
  })
})

instrument(io, { auth: false })

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Set the Express view engine to expect EJS templates
app.set('view engine', 'ejs');
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind Express middleware to parse JSON request bodies
app.use(express.json());
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));
// Expose the files stored in the public folder
app.use(express.static('public'));
// Expose the files stored in the distribution folder
app.use(express.static('dist'));

// Set up Webpack in dev env
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {

  // conditionally / dynamically import the webpack libraries we need in the dev environment
  // a dynamic import syntax is called as a function and returns a promise
  // use await so that every line is executed in order
  // see more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_import

  // destructure the default import and name the variable
  // see more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#importing_defaults
  const { default: webpack } = await import('webpack')
  const { default: webpackDevMiddleware } =  await import('webpack-dev-middleware');
  const { default: webpackHotMiddleware } = await import('webpack-hot-middleware');
  const { default: webpackConfig } = await import('./webpack_conf/webpack.dev.js');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // html only
    writeToDisk: (filePath) => /\.html$/.test(filePath),
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

// Bind route definitions to the Express application
bindRoutes(app);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3006;
app.listen(PORT);
