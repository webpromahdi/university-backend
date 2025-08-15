import config from '../../config';
import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import { TUser } from './user.interface';
import { Student } from '../student/student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentID } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  //find academic semister info
  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemeter,
  );

  if (!academicSemester) {
    throw new Error('Academic Semester not found');
  }

  //set manually generated id
  userData.id = await generateStudentID(academicSemester);
  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    payload.id = newUser.id; // emdedding
    payload.user = newUser._id; // reference id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
