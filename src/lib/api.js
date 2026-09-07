import axios from "axios";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

export const API_BASE = "https://video-backend-zt5v.onrender.com";

export const api = axios.create({ baseURL: API_BASE });

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getUserId() {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.id || decoded.userId || decoded._id || null;
  } catch {
    return null;
  }
}

export function isTokenValid() {
  const token = getToken();
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return !decoded.exp || decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

let socket = null;
export function getSocket() {
  if (typeof window === "undefined") return null;
  if (!socket) {
    socket = io(API_BASE, { transports: ["websocket", "polling"] });
  }
  return socket;
}
