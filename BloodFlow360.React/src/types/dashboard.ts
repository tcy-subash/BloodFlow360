export interface DashboardStat {
    title:string;
    value:number;
    color:string;
    icon:string;
    percentageChange:number;
}

export interface BloodChart{
    label:string;
    units:number;
}

export interface BloodGroup{
    bloodGroup:string;
    units:number;
    percentage:number;
    color:string;
}

export interface Activity{
    id:number;
    title:string;
    description:string;
    activityType:string;
    createdAt:string;
}

export interface Emergency{
    id:number;
    hospitalName:string;
    bloodGroup:string;
    unitsRequired:number;
    priority:string;
    requestedAt:string;
}

export interface HospitalStatus{
    id:number;
    hospitalName:string;
    activeRequests:number;
    bloodUnitsReceived:number;
    isOnline:boolean;
}

export interface Inventory{
    bloodGroup:string;
    availableUnits:number;
    reservedUnits:number;
    expiringSoon:number;
    status:string;
}

export interface DashboardResponse{
    stats:DashboardStat[];
    bloodChart:BloodChart[];
    bloodGroups:BloodGroup[];
    activities:Activity[];
    emergencies:Emergency[];
    hospitals:HospitalStatus[];
    inventory:Inventory[];
}