import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterName,
  Months,
} from './academicSemester.constant';

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]], {
      required_error: 'Semester name is required',
    }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: 'Semester code is required',
    }),
    year: z.string({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a valid date',
    }),
    startMonth: z.enum([...Months] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...Months] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

export const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]]).optional(),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});

export const academicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
