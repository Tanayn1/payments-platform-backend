import { IsNotEmpty } from "class-validator";


export class WebhookDto {
    @IsNotEmpty()
    webhookUrl : string

    @IsNotEmpty()
    events: Array<string>

    @IsNotEmpty()
    storeId: string
}