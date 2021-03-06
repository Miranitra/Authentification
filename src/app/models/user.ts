import { infoUser } from './infoUser'

export class User{
    constructor(
        public mail: string,
        public pwd: string,
        public infoUser? : infoUser,
        public token?: string,
        public _id?: string
    ){}
}