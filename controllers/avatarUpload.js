const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(!fs.existsSync('public')){
        fs.mkdir('public')
      }
      if(!fs.existsSync('public/image')){
          fs.mkdir('public/image')
      }
      cb(null, 'public/image')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + file.originalname
      cb(null, filename)
    }
  })
const upload = multer({ storage: storage })

module.exports = upload