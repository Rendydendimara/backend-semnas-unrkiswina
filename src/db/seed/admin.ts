import { IUser } from '../../interface/IUser';
import User from '../../models/user';
import { hashingPassword } from '../../service/password';

export const createAdminSeeds = async () => {
  try {
    const adminPayload: IUser | any = {
      nama_lengkap: 'Rendy Dendimara',
      email: 'rendyadmin@gmail.com',
      gender: 'L',
      is_verify: true,
      password: 'R3ndypassword123',
      no_telfon: '082217971133',
      type_user: 'admin',
      token: '',
      pekerjaan: 'Mahasiwa',
    };
    const hashPass: any = await hashingPassword(adminPayload.password);
    adminPayload.password = hashPass;
    await User.create(adminPayload);
    console.log('success create admin');
  } catch (err) {
    console.log('err', err);
  }
};
