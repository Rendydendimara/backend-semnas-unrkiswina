import express from 'express';
import moment from 'moment';
import { Types } from 'mongoose';
import Makalah from '../../models/makalah';

const utilsRouter = express.Router();

utilsRouter.get('/set-paper-id', async (req, res, next) => {
  try {
    await Makalah.updateMany(
      {
        is_deleted: false,
        is_suspend: false,
        user: { $ne: null },
      },
      { kode_makalah: null }
    );
    const listMakalah: any = await Makalah.find({
      is_deleted: false,
      is_suspend: false,
    })
      .populate({
        path: 'user',
        select: '_id nama_lengkap',
      })
      .populate({
        path: 'category',
        select: '_id category_name',
      })
      .sort({ created_at: 1 });
    let countIT = 0;
    let countPTK = 0;
    for (const makalah of listMakalah) {
      if (makalah.category.category_name === 'Ilmu-ilmu Peternakan') {
        if (makalah.user !== null) {
          console.log('makalah', {
            id: makalah._id,
            judul: makalah.judul_makalah,
            category: makalah.category.category_name,
            pemakalah: makalah.user.nama_lengkap,
            created_at: moment(makalah.created_at).format('LLLL'),
            status_makalah: makalah.status_makalah,
          });
          countPTK++;
          console.log('makalah PTK ke-', countPTK);
          await Makalah.findOneAndUpdate(
            { _id: new Types.ObjectId(makalah._id) },
            { kode_makalah: `ptk-${countPTK}` }
          );
        }
      } else if (makalah.category.category_name === 'Teknik Informatika') {
        if (makalah.user !== null) {
          console.log('makalah', {
            id: makalah._id,
            judul: makalah.judul_makalah,
            category: makalah.category.category_name,
            pemakalah: makalah.user.nama_lengkap,
            created_at: moment(makalah.created_at).format('LLLL'),
            status_makalah: makalah.status_makalah,
          });
          countIT++;
          console.log('makalah IT ke-', countIT);
          await Makalah.findOneAndUpdate(
            { _id: new Types.ObjectId(makalah._id) },
            { kode_makalah: `tif-${countIT}` }
          );
        }
      }
    }
    return res.send({
      success: true,
      data: listMakalah,
      message: 'Success set makalah paper id',
    });
  } catch (err) {
    console.log('err', err);
  }
});

export default utilsRouter;
