"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { SystemStatus, MonitorStatus } from "../app/status/types";

interface WebSocketStatus {
  status: SystemStatus | null;
  isConnected: boolean;
  connectionCount: number;
  lastUpdate: string | null;
  error: string | null;
}

function getApiUrl(): string {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_API_URL || "https://api.register.useherald.xyz";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
}

export function useWebSocketStatus(): WebSocketStatus & {
  requestRefresh: () => void;
  subscribeToMonitor: (id: string) => void;
  unsubscribeFromMonitor: (id: string) => void;
} {
  const [data, setData] = useState<WebSocketStatus>({
    status: null,
    isConnected: false,
    connectionCount: 0,
    lastUpdate: null,
    error: null,
  });

  const socketRef = useRef<Socket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    const apiUrl = getApiUrl();

    const socket = io(`${apiUrl}/status`, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
    });

    socketRef.current = socket;

    const connectionTimeout = setTimeout(() => {
      if (!socket.connected) {
        setData((prev) => ({
          ...prev,
          error: prev.status ? null : "Service temporarily unreachable",
        }));
      }
    }, 8000);

    socket.on("connect", () => {
      console.log("Status WebSocket connected");
      clearTimeout(connectionTimeout);
      reconnectAttemptsRef.current = 0;
      setData((prev) => ({ ...prev, isConnected: true, error: null }));
    });

    socket.on("disconnect", (reason) => {
      console.log("Status WebSocket disconnected:", reason);
      setData((prev) => ({ ...prev, isConnected: false }));

      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Status WebSocket error:", err);
      clearTimeout(connectionTimeout);
      reconnectAttemptsRef.current += 1;

      if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
        setData((prev) => ({
          ...prev,
          isConnected: false,
          error: prev.status ? null : "Failed to connect to monitoring node",
        }));
      }
    });

    socket.on("statusUpdate", (payload: SystemStatus & { timestamp: string; connectionCount: number }) => {
      clearTimeout(connectionTimeout);
      setData({
        status: payload,
        isConnected: true,
        connectionCount: payload.connectionCount || 0,
        lastUpdate: payload.timestamp,
        error: null,
      });
    });

    socket.on("monitorUpdate", (monitor: MonitorStatus) => {
      setData((prev) => {
        if (!prev.status) return prev;
        const updatedMonitors = prev.status.monitors.map((m) =>
          m.id === monitor.id ? monitor : m
        );
        return {
          ...prev,
          status: { ...prev.status, monitors: updatedMonitors },
          lastUpdate: new Date().toISOString(),
        };
      });
    });

    socket.on("reconnect_attempt", () => {
      reconnectAttemptsRef.current += 1;
    });

    socket.on("reconnect_failed", () => {
      setData((prev) => ({
        ...prev,
        error: "Unable to reconnect to monitoring service",
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const requestRefresh = useCallback(() => {
    socketRef.current?.emit("requestStatus");
  }, []);

  const subscribeToMonitor = useCallback((id: string) => {
    socketRef.current?.emit("subscribeMonitor", id);
  }, []);

  const unsubscribeFromMonitor = useCallback((id: string) => {
    socketRef.current?.emit("unsubscribeMonitor", id);
  }, []);

  return {
    ...data,
    requestRefresh,
    subscribeToMonitor,
    unsubscribeFromMonitor,
  };
}
