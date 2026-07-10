import { useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useQueryClient } from "@tanstack/react-query";

export function useSignalR() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
    const hubUrl = baseUrl.includes("/api")
      ? baseUrl.replace("/api", "/hubs/stock")
      : "http://localhost:5185/hubs/stock";

    console.log("Connecting to SignalR hub:", hubUrl);

    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .configureLogging(LogLevel.Warning)
      .withAutomaticReconnect()
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("SignalR Connection established!");
      } catch (err) {
        console.error("SignalR Connection failed: ", err);
        // Retry connection in 5 seconds
        setTimeout(startConnection, 5000);
      }
    };

    connection.on("UpdateStock", () => {
      console.log("SignalR Broadcast: UpdateStock received. Invalidating cache...");
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      // Invalidate donor, request, and stock tables as well so they refresh live
      queryClient.invalidateQueries({ queryKey: ["donors"] });
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    });

    connection.on("UpdateDashboard", () => {
      console.log("SignalR Broadcast: UpdateDashboard received. Invalidating cache...");
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    });

    startConnection();

    return () => {
      connection.stop().then(() => console.log("SignalR Connection stopped."));
    };
  }, [queryClient]);
}
