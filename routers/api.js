const express = require("express")
const router = express.Router()

const fs = require('fs')
const path = require('path')

const User = require('../mongoose/schema/user')


// :
router.post('/upload', async (req, res) => {
  if (!req.headers.name || !req.headers.password) {
      return res.json({ title: "Error", icon: "error", discription: "Missing name or password header" })
  }

  const userdata = await User.findOne({ name: req.headers.name });
  if (!userdata || userdata.password !== req.headers.password) {
      return res.json({ title: "Error", icon: "error", discription: "Invalid Credentials" })
  }

  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
  }

  Object.values(req.files).forEach(file => {
      // Get the MIME type of the file
      const mimeType = file.mimetype;

      // Determine the folder based on the MIME type
      let folder;
      if (mimeType.startsWith('image/')) {
          folder = 'images';
      } else if (mimeType.startsWith('text/')) {
          folder = 'text';
      } else {
          folder = 'other';
      }

      // Create the folder if it doesn't exist in the root directory of the project
      const folderPath = path.join('files', req.headers.name, folder);
      if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
      }

      // Move the file to the appropriate folder
      const filePath = path.join(folderPath, file.name);
      file.mv(filePath, (err) => {
          if (err) {
              return res.status(500).send(err);
          }
          console.log('File uploaded:', filePath);
      });
  });

  res.json({ title: "Success", icon: "success", discription: "Files uploaded successfully" });
})

router.post("/login", async (req, res) => {
    const userdata = await User.findOne({ name: req.body.name });
    if (!userdata) {
      res.json({
        title: "No user",
        discription: "No user with that password and name",
        icon: "error",
      });
    } else {
      if (req.body.password == userdata.password) {
        req.session.role = userdata.role;
        req.session.username = userdata.name;
        req.session.not_listd = userdata.password;
  
        res.json({
          title: "Success",
          discription: "Logged in",
          icon: "success",
        });
      } else {
        res.json({
          title: "Incorrect Credentials",
          discription: "Invalid credentials",
          icon: "error",
        });
      }
    }
  });
  

module.exports = router