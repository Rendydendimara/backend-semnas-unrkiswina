import { model, Model, Schema } from 'mongoose';
import { IKategoriMakalah } from '../interface/IKategoriMakalah';

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the
 * type of `company` field is not deterministic
 */
export type KategoriMakalahDocument = Document & IKategoriMakalah;

// For model
interface IKategoriMakalahModel extends Model<KategoriMakalahDocument> {}

// Create a Schema corresponding to the document interface.
const KategoriMakalahSchema: Schema<KategoriMakalahDocument> = new Schema({
  category_name: {
    type: String,
    required: true,
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

const KategoriMakalah = model<KategoriMakalahDocument, IKategoriMakalahModel>(
  'KategoriMakalah',
  KategoriMakalahSchema
);
export default KategoriMakalah;
