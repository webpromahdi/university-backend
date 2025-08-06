import Joi from 'joi';

const bangladeshPhoneRegex = /^(\+88)?01[3-9]\d{8}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const imageUrlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/;

const userNameJoiSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).trim().required(),
  middleName: Joi.string().min(2).max(30).trim().optional(),
  lastName: Joi.string().min(2).max(30).trim().required(),
});

const gurdianJoiSchema = Joi.object({
  fatherName: Joi.string().min(3).max(50).required(),
  fatherOccupation: Joi.string().min(3).max(50).required(),
  fatherContactNo: Joi.string()
    .pattern(bangladeshPhoneRegex)
    .required()
    .messages({
      'string.pattern.base':
        'Father contact number is not a valid Bangladeshi phone number!',
    }),
  motherName: Joi.string().min(3).max(50).required(),
  motherOccupation: Joi.string().min(3).max(50).required(),
  motherContactNo: Joi.string()
    .pattern(bangladeshPhoneRegex)
    .required()
    .messages({
      'string.pattern.base':
        'Mother contact number is not a valid Bangladeshi phone number!',
    }),
});

const localGurdianJoiSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  foccupation: Joi.string().min(3).max(50).required(),
  contactNo: Joi.string().pattern(bangladeshPhoneRegex).required().messages({
    'string.pattern.base':
      'Local guardian contact number is not a valid Bangladeshi phone number!',
  }),
  address: Joi.string().min(5).max(255).required(),
});

export const studentJoiSchema = Joi.object({
  id: Joi.string().alphanum().min(3).max(20).required(),
  name: userNameJoiSchema.required(),
  gender: Joi.string().valid('male', 'female').required(),
  dateOfBirth: Joi.string().pattern(dateRegex).required().messages({
    'string.pattern.base': 'Date of birth must be in YYYY-MM-DD format!',
  }),
  email: Joi.string().email().max(100).required(),
  contactNo: Joi.string().pattern(bangladeshPhoneRegex).required().messages({
    'string.pattern.base':
      'Contact number is not a valid Bangladeshi phone number!',
  }),
  emergencyContactNo: Joi.string()
    .pattern(bangladeshPhoneRegex)
    .required()
    .messages({
      'string.pattern.base':
        'Emergency contact number is not a valid Bangladeshi phone number!',
    }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  presentAddress: Joi.string().min(5).max(255).required(),
  permanentAddress: Joi.string().min(5).max(255).required(),
  gurdian: gurdianJoiSchema.required(),
  localGurdian: localGurdianJoiSchema.required(),
  profileImg: Joi.string().uri().pattern(imageUrlRegex).optional().messages({
    'string.pattern.base':
      'Profile image must be a valid image URL ending with jpg/jpeg/png/webp/gif!',
  }),
  isactive: Joi.string().valid('active', 'block').required(),
});
