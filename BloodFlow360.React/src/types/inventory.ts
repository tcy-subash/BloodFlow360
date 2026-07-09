export interface BloodInventory {
  id: string;
  bloodBankId: string;
  bloodBankName: string;
  bloodGroupId: string;
  bloodGroupName: string;
  unitsAvailable: number;
  unitsReserved: number;
  minimumStockLevel: number;
  maximumStockLevel: number;
  isActive: boolean;
}

export interface CreateBloodInventory {
  bloodBankId: string;
  bloodGroupId: string;
  unitsAvailable: number;
  unitsReserved: number;
  minimumStockLevel: number;
  maximumStockLevel: number;
}

export interface UpdateBloodInventory {
  unitsAvailable: number;
  unitsReserved: number;
  minimumStockLevel: number;
  maximumStockLevel: number;
  isActive: boolean;
}

export interface AdjustStockRequest {
  units: number;
  remarks: string;
}

export interface AdjustmentRequest {
  bloodInventoryId: string;
  newStock: number;
  remarks: string;
}

