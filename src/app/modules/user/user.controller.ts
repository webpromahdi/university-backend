import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    //const zodParseData = studentZodSchema.parse(studentData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createStudent,
};
