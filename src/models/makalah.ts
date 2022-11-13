import { model, Model, Schema } from 'mongoose';
import { STATUS_MAKALAH } from '../utils/makalah';
import { IMakalah } from '../interface/IMakalah';

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the
 * type of `company` field is not deterministic
 */
export type MakalahDocument = Document & IMakalah;

// For model
interface IMakalahModel extends Model<MakalahDocument> {}

// Create a Schema corresponding to the document interface.
const MakalahSchema: Schema<MakalahDocument> = new Schema({
  judul_makalah: {
    type: String,
    required: true,
  },
  file_pdf_makalah: {
    type: String,
    default: null,
  },
  status_makalah: {
    type: String,
    enum: [
      STATUS_MAKALAH.WAITING_CONFIRMATION,
      STATUS_MAKALAH.DONE,
      STATUS_MAKALAH.REJECT,
    ],
  },
  file_word_makalah: {
    type: String,
    default: null,
  },
  file_loa_makalah: {
    type: String,
    default: null,
  },
  keterangan: {
    type: String,
    default: null,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'KategoriMakalah',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  is_suspend: {
    type: Boolean,
    default: false,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
  updated_at: {
    type: Date,
    default: null,
  },
  last_date_send_loa: {
    type: Date,
    default: null,
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: null,
  },
  feedback: {
    type: String,
    default: null,
  },
  score: {
    type: Number,
    default: null,
  },
  file_reviwer_makalah: {
    type: String,
    default: null,
  },
  kode_makalah: {
    type: String,
    default: null,
  },
  metadata: [
    {
      type: String,
      default: null,
    },
  ],
  is_reviewed: {
    type: Boolean,
    default: false,
  },
  reviewed_at: {
    type: Date,
    default: null,
  },
});

const Makalah = model<MakalahDocument, IMakalahModel>('Makalah', MakalahSchema);
export default Makalah;
