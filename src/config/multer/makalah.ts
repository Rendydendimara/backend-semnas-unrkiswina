import multer from 'multer';

const pdfFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype.includes('pdf') |
    file.mimetype.includes(
      'vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) |
    file.mimetype.includes('msword')
  ) {
    cb(null, true);
  } else {
    if (file.fieldname === 'makalah_word') {
      cb('Harap unggah file type docs/docsx.', false);
    } else if (file.fieldname === 'makalah_pdf') {
      cb('Harap unggah file type pdf', false);
    } else {
      cb('Harap unggah file type yang benar', false);
    }
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/makalah');
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString();
    const newFileName = `${timestamp}-${file.originalname
      .split(' ')
      .join('_')}`;
    cb(null, newFileName);
  },
});

const uploadPdf = multer({
  storage: storage,
  limits: {
    fileSize: 22099999, //  20.099999 MB
  },
  fileFilter: pdfFilter,
});

export default uploadPdf;
