import { IsNotEmpty } from "class-validator";
import { PricingObject } from "../types/types";



export class CreateProductDto {
    @IsNotEmpty()
    storeId : string

    @IsNotEmpty()
    pricesArray : Array<PricingObject>

    @IsNotEmpty()
    name: string
    
    @IsNotEmpty()
    description: string


}