import axios from "axios";

export interface DataType {
  key: React.Key;
  ID: number;
  SerialNumber: string;
  SoftwareVersion: string;
  HardwareVersion: string;
  Status;
  Location: string;
}
export const data = async (): Promise<DataType[]> => {
  const response = await axios.get<DataType[]>("/dashboard/sitelist");
  const newData: DataType[] = response.data.map((item) => ({
    ...item,
    key: item.ID,
    value: item.Location,
    label: item.Location,
  }));
  return newData;
};
