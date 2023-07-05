import { Schema, Model, model, connect, Types } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const refType = Schema.Types.ObjectId;
export interface IUserRequest extends Request {
  user?: any;
}

interface CarInfo {
  make?: String;
  model?: String;
  color?: String;
}

interface DriverLicense {
  hasDriverLicense?: String;
  licenseNumber?: String;
  expirationDate?: Date;
  uploadedCopy?: String;
}

interface workAuthDetails {
  workAuth?: String;
  OPTReceipt?: String;
  visaTitle?: String;
  startDate?: Date;
  endDate?: Date;
}

interface Person {
  firstName?: String;
  lastName?: String;
  middleName?: String;
  phoneNumber?: String;
  email?: String;
  relationship?: String;
}

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  token?: string;
  // createdAt: Date;
  // updatedAt: Date;
  comparePassword(entredPassword: string): Promise<Boolean>;
  firstName?: String;
  lastName?: String;
  middleName?: String;
  preferredName?: String;
  profilePic?: String;
  SSN?: String;
  DOB?: Date;
  currentAddress?: String;
  cellPhone?: String;
  workPhone?: String;
  gender?: String;
  carInfo?: CarInfo;
  citizenOrPermResident?: String;
  workAuthDetails?: workAuthDetails;
  driverLicenseInfo?: DriverLicense;
  reference?: Person;
  emergencyContacts?: Person[];
  applicationStatus: String;

  applicationFeedback?: String;

  optReceipt?: Object,
  optEad?: Object,
  I983?: Object,
  I20?: Object



 
}

// export interface IUser {
//   firstName?: String;
//   lastName?: String;
//   middleName?: String;
//   preferredName?: String;
//   profilePic?: String;

//   SSN?: String;
//   DOB?: Date;
//   cellPhone?: String;
//   workPhone?: String;
//   gender?: String;
//   carInfo?: CarInfo;
//   citizenOrPermResident?: String;
//   workAuthDetails?: Object;
//   driverLicenseInfo?: Object;
//   reference?: Person;
//   emergencyContact?: Person[];
//   hr: Boolean;
// }

export const UserSchema = new Schema<IUser>(
  {
    firstName: String,
    lastName: String,
    middleName: String,
    preferredName: String,
    profilePic: String,
    name: String,
    email: String,
    password: String,
    SSN: String,
    DOB: Date,
    isAdmin: Boolean,
    currentAddress: String,
    cellPhone: String,
    workPhone: String,
    carInfo: {
      make: String,
      model: String,
      color: String,
    },
    citizenOrPermResident: String,
    workAuthDetails: {
      workAuth: String,
      OPTReceipt: String,
      visaTitle: String,
      startDate: Date,
      endDate: Date,
    },
    driverLicenseInfo: {
      hasDriverLicense: String,
      licenseNumber: String,
      expirationDate: String,
      uploadedCopy: String,
    },
    reference: {
      firstName: String,
      lastName: String,
      middleName: String,
      phone: String,
      email: String,
      relationship: String,
    },

    emergencyContacts: [
      {
        firstName: String,
        lastName: String,
        middleName: String,
        phone: String,
        email: String,
        relationship: String,
      },
    ],

    optReceipt: {
      document: String,
      status: String,
      errorMessage: String,
    },

    optEad: {
      document: String,
      status: String,
      errorMessage: String,
    },

    I983: {
      document: String,
      status: String,
      errorMessage: String,
    },

    I20: {
      document: String,
      status: String,
      errorMessage: String,
    },

  applicationFeedback: String,
  applicationStatus: String
}, {timestamps: true});


UserSchema.methods.comparePassword = function (entredPassword: string) {
  const user = this as IUser;
  return bcrypt.compareSync(entredPassword, user.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
