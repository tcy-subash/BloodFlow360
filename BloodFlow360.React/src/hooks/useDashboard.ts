import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../services/DashboardService";

export const useDashboard=()=>{
    return useQuery({
        queryKey:["dashboard"],
        queryFn:getDashboard
    });
};