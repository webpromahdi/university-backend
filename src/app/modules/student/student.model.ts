import { model, Schema } from 'mongoose';
import {
  StudentMethods,
  StudentModel,
  TGurdian,
  TLocalGurdian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const gurdianSchema = new Schema<TGurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^(\+88)?01[3-9]\d{8}$/.test(v),
      message: (props) =>
        `${props.value} is not a valid Bangladeshi phone number!`,
    },
  },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^(\+88)?01[3-9]\d{8}$/.test(v),
      message: (props) =>
        `${props.value} is not a valid Bangladeshi phone number!`,
    },
  },
});

const localGurdianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: true },
  foccupation: { type: String, required: true },
  contactNo: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^(\+88)?01[3-9]\d{8}$/.test(v),
      message: (props) =>
        `${props.value} is not a valid Bangladeshi phone number!`,
    },
  },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    unique: true,
    ref: 'User',
  },
  name: userNameSchema,
  gender: { type: String, enum: ['male', 'female'], required: true },
  dateOfBirth: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v), // e.g., YYYY-MM-DD
      message: (props) =>
        `${props.value} is not a valid date format (YYYY-MM-DD)!`,
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  contactNo: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^(\+88)?01[3-9]\d{8}$/.test(v),
      message: (props) =>
        `${props.value} is not a valid Bangladeshi phone number!`,
    },
  },
  emergencyContactNo: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^(\+88)?01[3-9]\d{8}$/.test(v),
      message: (props) =>
        `${props.value} is not a valid Bangladeshi phone number!`,
    },
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  gurdian: gurdianSchema,
  localGurdian: localGurdianSchema,
  profileImg: {
    type: String,
    validate: {
      validator: (v: string) =>
        !v || /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(v),
      message: (props) => `${props.value} is not a valid image URL!`,
    },
  },
  admissionSemeter: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },
  isDeleted: { type: Boolean, default: false },
});

//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.methods.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
