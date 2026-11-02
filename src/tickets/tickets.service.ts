import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketsService {

private readonly tickets = [
    {id : 1 , subject : "tumi "},
    {id : 2 , subject : "ami "},
]
findAll() {
    return this.tickets
}

}
