import { model, Model, Schema } from 'mongoose';
import { IPembayaranMakalah } from '../interface/IPembayaranMakalah';

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the
 * type of `company` field is not deterministic
 */
export type PembayaranMakalahDocument = Document & IPembayaranMakalah;

// For model
interface IPembayaranMakalahModel extends Model<PembayaranMakalahDocument> {}

// Create a Schema corresponding to the document interface.
const PembayaranMakalahSchema: Schema<PembayaranMakalahDocument> = new Schema({
  status: {
    type: String,
    required: true,
  },
  category_harga_makalah: {
    type: String,
    default: null,
  },
  peruntukan: {
    type: String,
    default: null,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  makalah: {
    type: Schema.Types.ObjectId,
    ref: 'Makalah',
    required: true,
  },
  keterangan: {
    type: String,
    default: null,
  },
  harga: {
    type: String,
    default: null,
  },
  bank_pengirim: {
    type: String,
    default: null,
  },
  jumlah_transfer: {
    type: String,
    default: null,
  },
  bukti_transfer: {
    type: String,
    default: null,
  },
  tanggal_konfirmasi_pembayaran: {
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

const PembayaranMakalah = model<
  PembayaranMakalahDocument,
  IPembayaranMakalahModel
>('PembayaranMakalah', PembayaranMakalahSchema);
export default PembayaranMakalah;
