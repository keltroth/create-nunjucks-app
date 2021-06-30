import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import nunjucks from 'express-nunjucks';

import * as routes from './src/main/javascript/routes.js';
import logger from './logger.js';

const resources = `${process.cwd()}/src/main/resources/`;

const app = express();
app.use(morgan('combined', { stream: logger.stream }));

// FIXME: change your app secret
app.use(session({secret: 'your app secret', saveUninitialized: true, resave: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(favicon(`${resources}/static/images/favicon.ico`));

app.use(express.static(`${resources}/static`));
app.set('views', `${resources}/templates`);
app.set('view engine', 'njk');
nunjucks(app, {
    watch: true,
    noCache: true,
});

app.use('/', routes.index);

app.use((req, res) => {
    res.send('ko');
});

// error handler
app.use((err, req, res) => {
    res.send(err);
});

export default app;
