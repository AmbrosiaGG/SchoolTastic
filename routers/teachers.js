const express = require("express")
const router = express.Router()

router.get("/exams", async (req, res) => {
    if (!req.session.username) {
      console.log(req.session.name)
      res.redirect('/login?description=Not%20Logged%20In&title=Error&Icon=error ')
    } else {
      if (req.session.role == "teacher") {
        res.render("../views/dashboard/teachers/exams.ejs", {
            title: process.env.title,
            req: req,
            res: res,
            // 6/24/2024 8:48AM | I should find a Better way to do this
            role: req.session.role,
            name: req.session.username,
            pass: req.session.not_listd,
          });
      } else {
       res.status(403).render('../views/dashboard/teachers/exams.ejs', {
        title: process.env.title,
        name: req.session.username,
        role: req.session.role,
        name: req.session.username,
        pass: req.session.not_listd,
       })
      }
    }
  });

module.exports = router