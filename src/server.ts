import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as expressValidator from "express-validator";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as passport from "passport";
import * as fs from "fs";
import flash = require("connect-flash");

const connectRequestId = require("connect-requestid");
const markoExpress = require("marko/express");
const markoHotReload = require("marko/hot-reload");

import * as index from "./routes/index";

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
const RedisStore = connectRedis(session);
app.use(session({
    name: '**AppName**',
    proxy: true,
    resave: false,
    saveUninitialized: true,
    secret: '**PREFIXX**',
    cookie: {
        maxAge: 1000 * 60 * 60 * 3,
    },
    rolling: true,
    store: new RedisStore({
        host: '**FINGER_REDIS_HOST**',
        port: 6379,
        prefix: '**PREFIXX**',
        db: 0,
    }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(markoExpress());

if (process.env.NODE_ENV !== 'production') {
    markoHotReload.enable();
    fs.watch(path.join(__dirname, 'views'), {
        recursive: true,
    }, (event, filename) => {
        if (/\.marko$/.test(filename)) {
            const templatePath = path.join(path.join(__dirname, 'views'), filename);
            console.log('Marko template modified: ', templatePath);
            markoHotReload.handleFileModified(templatePath);
        }
    });
} // if

app.get("/", index.index);

import * as debug from "debug";
import * as http from "http";

const port = normalizePort(process.env.PORT || '3000');
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
