// EMI Calculator
// Formula: EMI = [P x R x (1+R)^N] / [(1+R)^N – 1]
const calculateEMI = (req, res) => {
  try {
    const { principal, rate, tenure } = req.body;

    if (!principal || !rate || !tenure) {
      return res.status(400).json({ message: "Please provide principal, rate, and tenure" });
    }

    const monthlyRate = rate / (12 * 100); // annual % → monthly decimal
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);

    res.json({ emi: emi.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Affordability Calculator
// Example: 30% of monthly income → affordable EMI
const calculateAffordability = (req, res) => {
  try {
    const { income } = req.body;
    if (!income) return res.status(400).json({ message: "Please provide income" });

    const affordableEMI = income * 0.3;
    res.json({ affordableEMI: affordableEMI.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eligibility Calculator
// Example: Based on income & existing EMIs
const calculateEligibility = (req, res) => {
  try {
    const { income, existingEMI, tenure, rate } = req.body;

    if (!income || !tenure || !rate) {
      return res.status(400).json({ message: "Please provide income, tenure, and rate" });
    }

    const availableIncome = income * 0.5 - (existingEMI || 0);
    const monthlyRate = rate / (12 * 100);

    const eligibility =
      availableIncome *
      ((Math.pow(1 + monthlyRate, tenure) - 1) /
        (monthlyRate * Math.pow(1 + monthlyRate, tenure)));

    res.json({ eligibility: eligibility.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Price Calculator
// Example: Reverse EMI → how much loan amount for given EMI
const calculatePrice = (req, res) => {
  try {
    const { emi, tenure, rate } = req.body;

    if (!emi || !tenure || !rate) {
      return res.status(400).json({ message: "Please provide emi, tenure, and rate" });
    }

    const monthlyRate = rate / (12 * 100);
    const loan =
      emi *
      ((Math.pow(1 + monthlyRate, tenure) - 1) /
        (monthlyRate * Math.pow(1 + monthlyRate, tenure)));

    res.json({ loanAmount: loan.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  calculateEMI,
  calculateAffordability,
  calculateEligibility,
  calculatePrice,
};
