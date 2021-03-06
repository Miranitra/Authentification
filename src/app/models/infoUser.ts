export class infoUser{
    constructor(
        public nom: string,
        public prenom?: string,
        public date_naissance?: Date,
        public avatar?: string
    ){}
}