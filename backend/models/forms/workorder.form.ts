import { IsEmail, IsNumber, IsString, isNumber } from "class-validator";
export class workorderform {
  @IsString()
  ordersummary?: string;

  @IsNumber()
  ID?: number;

  @IsString()
  DatePicker?: string;
}
