import { Entity } from "./entity"

class UserCard extends Entity {
  id: string
  phone: string
  email: string
  firstname: string
  lastname: string
  profession: string
  gender: GenderEnum
  maritalStatus: MaritalStatusEnum
  dateOfBirth: Date
  visibility: VisibilityEnum
  livingAddressCity: string
  nativeAddressCity: string
  koththiram: KoththiramEnum
  verificationStatus: VerificationStatusEnum

  constructor(
    id: string,
    phone: string,
    email: string,
    firstname: string,
    lastname: string,
    profession: string,
    gender: GenderEnum,
    maritalStatus: MaritalStatusEnum,
    dateOfBirth: Date,
    visibility: VisibilityEnum,
    livingAddressCity: string,
    nativeAddressCity: string,
    koththiram: KoththiramEnum,
    verificationStatus: VerificationStatusEnum,
    createdOn: Date,
    updatedOn: Date
  ) {

    super(createdOn, updatedOn)

    this.id = id
    this.phone = phone
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.profession = profession
    this.gender = gender
    this.maritalStatus = maritalStatus
    this.dateOfBirth = dateOfBirth
    this.visibility = visibility
    this.livingAddressCity = livingAddressCity
    this.nativeAddressCity = nativeAddressCity
    this.koththiram = koththiram
    this.verificationStatus = verificationStatus
    
  }
  
}

export default UserCard
