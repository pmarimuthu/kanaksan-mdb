import { Entity } from './entity'

class UserBean extends Entity {
    id: string
    phone: string
    email: string

    constructor(id: string, phone: string, email: string, createdOn: Date, updatedOn: Date) {
        super(createdOn, updatedOn)
        this.id = id
        this.phone = phone
        this.email = email
    }
    
}

export default UserBean
