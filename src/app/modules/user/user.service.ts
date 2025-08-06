import config from '../../config';
import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import { TUser } from './user.interface';
import { Student } from '../student/student.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // set student role
  const userData: Partial<TUser> = {};
  //   if (await student.isUserExits(studentData.id)) {
  //     throw new Error('User Already created');
  //   }

  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  //set manually generated id
  userData.id = '2030102006';
  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    studentData.id = newUser.id; // emdedding
    studentData.user = newUser._id; // reference id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
