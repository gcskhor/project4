import cookieParser from 'cookie-parser';
import express from 'express';
import methodOverride from 'method-override';
import bindRoutes from './routes.mjs';

import {Server} from 'socket.io'
import { instrument } from '@socket.io/admin-ui';  

const app = express();

// socket.io stuff
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

    if (room) {
      socket.to(room).emit(SERVER_TO_CLIENT_MESSAGE, message)
    }
    
  })

  // JOIN ROOM
  socket.on(JOIN_ROOM, room => {
    console.log("joining room:");
    console.log(room);
    socket.join(room)
    socket.to(room).emit(JOIN_ROOM)
  })
})

instrument(io, { auth: false })

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.static('dist'));

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {

  const { default: webpack } = await import('webpack')
  const { default: webpackDevMiddleware } =  await import('webpack-dev-middleware');
  const { default: webpackHotMiddleware } = await import('webpack-hot-middleware');
  const { default: webpackConfig } = await import('./webpack_conf/webpack.dev.js');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: (filePath) => /\.html$/.test(filePath),
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

bindRoutes(app);

const PORT = process.env.PORT || 3006;
app.listen(PORT);
