const express = require("express");
const {
  calculateEMI,
  calculateAffordability,
  calculateEligibility,
  calculatePrice,
} = require("../controllers/calculatorController");

const router = express.Router();

router.post("/emi", calculateEMI);
router.post("/affordability", calculateAffordability);
router.post("/eligibility", calculateEligibility);
router.post("/price", calculatePrice);

module.exports = router;
