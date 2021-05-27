var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  var Height = req.query.Height / 100;
  var Weight = req.query.Weight;
  var result = "";
  var img = "";
  var bmi = Weight / (Height * Height);

  if (bmi < 18.5) {
    result = "저체중";
    img = "/images/bmi/bar1.PNG";
  } else if (bmi >= 18.5 && bmi <= 25) {
    result = "정상";
    img = "/images/bmi/bar2.PNG";
  } else if (bmi > 25 && bmi <= 30) {
    result = "과체중";
    img = "/images/bmi/bar3.PNG";
  } else if (bmi > 30 && bmi <= 40) {
    result = "비만";
    img = "/images/bmi/bar4.PNG";
  } else {
    result = "과체중";
    img = "/images/bmi/bar5.PNG";
  }

  if (isNaN(bmi)) {
    bmi = 0;
    result = "-";
    img = "/images/bmi/bar.PNG";
  }

  res.render("bmi", {
    title: "Bmi",
    bmi: bmi.toFixed(2),
    result: result,
    img: img,
    userid: req.session.userid,
  });
});

module.exports = router;
