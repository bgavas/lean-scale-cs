import dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();
import { AppServer } from './server';

const appServer = new AppServer();
appServer.setupStatusRoute();
appServer.startServer();
