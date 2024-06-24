const express = require("express");
const router = express.Router();

const user = require('../mongoose/schema/user')


router.get("/", async (req, res) => {
  if (!req.session.username) {
    console.log(req.session.name)
    res.redirect('/login?description=Not%20Logged%20In&title=Error&Icon=error ')
  } 
      res.render("../views/dashboard/index.ejs", {
        title: process.env.title,
        req: req,
        res: res,
        // 6/24/2024 8:48AM | I should find a Better way to do this
        role: req.session.role,
        name: req.session.username,
        pass: req.session.not_listd,
      });
});

module.exports = router;
