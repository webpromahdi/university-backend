import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findStudentID = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  ).lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

//year semesterCode 4digit
export const generateStudentID = async (payload: TAcademicSemester) => {
  const currentID = (await findStudentID()) || (0).toString();
  let incrementID = (Number(currentID) + 1).toString().padStart(4, '0');
  incrementID = `${payload.year}${payload.code}${incrementID}`;
  return incrementID;
};
