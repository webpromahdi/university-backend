import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

//pre middleware
UserSchema.pre('save', async function (next) {
  //console.log(this, 'pre hook: wee will save data');
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycript_saltRounds),
  );
  next();
});

//post middleware
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  //console.log(this, 'post hook: wee will save data');
  next();
});

export const User = model<TUser>('User', UserSchema);
