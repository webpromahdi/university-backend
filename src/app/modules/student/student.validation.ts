import { z } from 'zod';

const bdPhoneRegex = /^(\+88)?01[3-9]\d{8}$/;
const imageUrlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/;
const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const nameValidationSchema = z.object({
  firstName: z.string().min(2).max(30),
  middleName: z.string().min(2).max(30).optional(),
  lastName: z.string().min(2).max(30),
});

const gurdianValidationSchema = z.object({
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

const localGurdianValidationSchema = z.object({
  name: z.string().min(3).max(50),
  foccupation: z.string().min(3).max(50),
  contactNo: z.string().regex(bdPhoneRegex, 'Invalid Bangladeshi phone number'),
  address: z.string().min(5).max(255),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(20),
    student: z.object({
      name: nameValidationSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z
        .string()
        .regex(birthDateRegex, 'Date must be in YYYY-MM-DD format')
        .optional(),
      email: z.string().email().max(100),
      contactNo: z
        .string()
        .regex(bdPhoneRegex, 'Invalid Bangladeshi phone number'),
      emergencyContactNo: z
        .string()
        .regex(bdPhoneRegex, 'Invalid Bangladeshi phone number'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string().min(5).max(255),
      permanentAddress: z.string().min(5).max(255),
      gurdian: gurdianValidationSchema,
      localGurdian: localGurdianValidationSchema,
      profileImg: z
        .string()
        .url()
        .regex(imageUrlRegex, 'Invalid image URL')
        .optional(),
      admissionSemeter: z.string(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
