import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import { join } from 'path'
import API from './src/api'
const app = express()
const server = http.createServer(app)

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];
//Use Cors
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin,X-Requested-With,x-access-token,Content-Type,Authorization,Accept",
    preflightContinue: false,
}));

// Call API 
app.use('/api', API);

// Server listen
server.listen(process.env.PORT || 3000)