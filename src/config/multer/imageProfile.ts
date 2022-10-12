import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/userprofile');
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString();
    const newFileName = `${timestamp}-${file.originalname
      .split(' ')
      .join('_')}`;
    cb(null, newFileName);
  },
});

const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, //  10.000 MB
  },
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length']);
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      (file.mimetype === 'image/jpeg' && fileSize < 10000000)
    ) {
      // file berupa gambar
      cb(null, true);
    } else {
      if (
        !(
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg'
        )
      ) {
        cb(null, false);
        return cb(new Error('File Harus Berformat .jpg, .png, .jpeg'));
      } else if (fileSize > 10000000) {
        cb(null, false);
        return cb(new Error('Ukuran file tidak boleh lebih dari 10mb'));
      } else {
        cb(null, false);
        return cb(new Error('File error'));
      }
    }
  },
});

export default uploadImage;
