import { BaseRepository } from "./base/repository"

export class UserRepository extends BaseRepository {

    constructor() {
        super([
            {
                username: "wissem",
                password: "123456",
                avatar: 'https://scontent.ftun8-1.fna.fbcdn.net/v/t1.0-9/78960847_2795370673848425_3042570307253567488_n.jpg?_nc_cat=101&_nc_oc=AQmOJqv8tss533wIA77DJmavVYCiEWawuuqIZwgt9JeDy6R1-JU3DfJtl3rKRpovd6k&_nc_ht=scontent.ftun8-1.fna&oh=b7723fe75d15ea65f36fc39beb5b8027&oe=5EA42F5E'
            },
            {
                username: "oussama",
                password: "azerty"
            }
        ])
    }
}