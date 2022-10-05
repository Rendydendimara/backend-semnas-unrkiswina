import KategoriMakalah from '../../models/kategoriMakalah';

export const createKategoriMakalahSeeds = async () => {
  try {
    const listKategori = ['Ilmu-ilmu Peternakan', 'Teknik Informatika'];
    for (const kategori of listKategori) {
      await KategoriMakalah.create({
        category_name: kategori,
        created_at: new Date(),
      });
    }
    console.log('success run seend kategori makalah');
  } catch (err) {
    console.log('err', err);
  }
};
