import { IsNotEmpty, isInt } from "class-validator";

export class checkoutSessionDto {
    @IsNotEmpty()
    priceIDs : string[]
    
    trialLength: Number
}


export class PaymentFormDto {
    @IsNotEmpty()
    storeId: string

    @IsNotEmpty()
    trialLength: number

    @IsNotEmpty()
    collectBilling: boolean

    @IsNotEmpty()
    collectPhoneNumber: boolean

    @IsNotEmpty()
    priceIds: Array<any>

    @IsNotEmpty()
    ProductIds: Array<any>

    @IsNotEmpty()
    successUrl: string

    @IsNotEmpty()
    cancelUrl: string

  

}