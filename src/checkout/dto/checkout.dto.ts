import { IsNotEmpty, isInt } from "class-validator";

export class checkoutSessionDto {
    @IsNotEmpty()
    priceIDs : string[]
    
    trialLength: Number
}