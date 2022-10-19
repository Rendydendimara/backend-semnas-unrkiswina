import bcrypt from 'bcrypt';
import { model, Model, Schema } from 'mongoose';
import { IUser } from '../interface/IUser';

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the
 * type of `company` field is not deterministic
 */
export type UserDocument = Document & IUser;

// For model
interface IUserModel extends Model<UserDocument> {
  findByUsername: (username: string) => Promise<UserDocument>;
  findByEmail: (email: string) => Promise<UserDocument>;
}

// Create a Schema corresponding to the document interface.
const UserSchema: Schema<UserDocument> = new Schema({
  nama_lengkap: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  pekerjaan: {
    type: String,
  },
  no_telfon: {
    type: String,
  },
  profile_image: {
    type: String,
    default: null,
  },
  type_user: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  otp_reset_password: {
    type: String,
    default: null,
  },
  create_token_verify_at: {
    type: Date,
    default: null,
  },
  create_otp_reset_password_at: {
    type: Date,
    default: null,
  },
  is_suspend: {
    type: Boolean,
    default: false,
  },
  is_verify: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
  },
  token_verify: {
    type: String,
    default: null,
  },
  verify_at: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  deleted_at: {
    type: Date,
    default: null,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

// Methods
UserSchema.methods.isValidPassword = async function (
  this: UserDocument,
  password: string
): Promise<boolean> {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

// Hide password field
UserSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['password'];
    return ret;
  },
});

const User = model<UserDocument, IUserModel>('User', UserSchema);
export default User;
