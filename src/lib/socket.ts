// src/lib/socket.ts
import { io } from 'socket.io-client';
const socket = io('http://localhost:5174'); // Backend server
export default socket;
