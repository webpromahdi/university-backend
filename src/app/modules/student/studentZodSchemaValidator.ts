import { z } from 'zod';

const bdPhoneRegex = /^(\+88)?01[3-9]\d{8}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const imageUrlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/;

// UserName Schema
const nameSchema = z.object({
  firstName: z.string().min(2).max(30),
  middleName: z.string().min(2).max(30).optional(),
  lastName: z.string().min(2).max(30),
});

// Gurdian Schema
const gurdianSchema = z.object({
  fatherName: z.string().min(3).max(50),
  fatherOccupation: z.string().min(3).max(50),
  fatherContactNo: z
    .string()
    .regex(bdPhoneRegex, 'Invalid Bangladeshi phone number'),
  motherName: z.string().min(3).max(50),
  motherOccupation: z.string().min(3).max(50),
  motherContactNo: z
    .string()
    .regex(bdPhoneRegex, 'Invalid Bangladeshi phone number'),
});

// Local Gurdian Schema
const localGurdianSchema = z.object({
  name: z.string().min(3).max(50),
  foccupation: z.string().min(3).max(50),
  contactNo: z.string().regex(bdPhoneRegex, 'Invalid Bangladeshi phone number'),
  address: z.string().min(5).max(255),
});

// Main Student Schema
export const studentZodSchema = z.object({
  id: z.string().min(3).max(20),
  password: z.string().min(6).max(20),
  name: nameSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string().regex(dateRegex, 'Date must be in YYYY-MM-DD format'),
  email: z.string().email().max(100),
  contactNo: z.string().regex(bdPhoneRegex, 'Invalid Bangladeshi phone number'),
  emergencyContactNo: z
    .string()
    .regex(bdPhoneRegex, 'Invalid Bangladeshi phone number'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string().min(5).max(255),
  permanentAddress: z.string().min(5).max(255),
  gurdian: gurdianSchema,
  localGurdian: localGurdianSchema,
  profileImg: z
    .string()
    .url()
    .regex(imageUrlRegex, 'Invalid image URL')
    .optional(),
  isactive: z.enum(['active', 'block']),
  isDeleted: z.boolean().default(false),
});
