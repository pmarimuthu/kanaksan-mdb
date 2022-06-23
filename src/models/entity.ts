export class Entity {
    createdOn: Date
    updatedOn: Date

    constructor(createdOn: Date, updatedOn: Date) {
        this.createdOn = createdOn
        this.updatedOn = updatedOn
    }

    get toString() {
        return " Created On: " + this.createdOn +
            " Updated On: " + this.updatedOn
    }

}
