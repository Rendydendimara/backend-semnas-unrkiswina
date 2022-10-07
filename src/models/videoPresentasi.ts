import { model, Model, Schema } from 'mongoose';
import { STATUS_VIDEO_PRESENTASI } from '../utils/videoPresentasi';
import { IVideoPresentasi } from '../interface/IVideoPresentasi';

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the
 * type of `company` field is not deterministic
 */
export type VideoPresentasiDocument = Document & IVideoPresentasi;

// For model
interface IVideoPresentasiModel extends Model<VideoPresentasiDocument> {}

// Create a Schema corresponding to the document interface.
const VideoPresentasiSchema: Schema<VideoPresentasiDocument> = new Schema({
  status: {
    type: String,
    enum: [
      STATUS_VIDEO_PRESENTASI.WAITING_CONFIRMATION,
      STATUS_VIDEO_PRESENTASI.DONE,
      STATUS_VIDEO_PRESENTASI.REJECT,
    ],
  },
  keterangan: {
    type: String,
    default: null,
  },
  link_video: {
    type: String,
    default: null,
  },
  makalah: {
    type: Schema.Types.ObjectId,
    ref: 'Makalah',
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
});

const VideoPresentasi = model<VideoPresentasiDocument, IVideoPresentasiModel>(
  'VideoPresentasi',
  VideoPresentasiSchema
);
export default VideoPresentasi;
