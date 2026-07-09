import api from "../api/axios";
import type { DashboardResponse } from "../types/dashboard";

export const getDashboard=async()=>{
    const {data}=await api.get<DashboardResponse>("/Dashboard");
    return data;
};