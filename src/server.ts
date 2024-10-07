import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import dotenv from 'dotenv'
import http from 'http'

dotenv.config()

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'*',
    credentials:true
}))
app.use(bodyParser.json());

const dbUrl: string = process.env.DB_URL || " ";
const port: number = parseInt(process.env.PORT || "3200");
mongoose.connect(dbUrl)
    .then(() => {
        console.log('Database connected..');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});