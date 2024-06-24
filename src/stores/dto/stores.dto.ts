import { IsNotEmpty } from "class-validator";


export class createStoresDto {
    @IsNotEmpty()
    name: string

    
    @IsNotEmpty()
    currency: string
}