// Salary calculation utilities for document generation

/**
 * Get Professional Tax based on month and CTC
 * @param {string} monthStr - "YYYY-MM" format
 * @param {number} totalSalary - monthly total salary
 * @returns {number} - PT amount
 */

export const getProfessionalTax = (monthStr, totalSalary) => {
  if (!monthStr) return 0;

  const [, monthNum] = monthStr.split("-");
  const month = Number(monthNum);

  // Salary slabs (Monthly – Maharashtra style)
  if (totalSalary <= 7500) return 0;
  if (totalSalary <= 10000) return 175;

  // February extra PT
  if (month === 2) return 300;

  return 200;
};


/**
 * Generate Salary Structure EXACTLY like attached image
 * @param {number} ctc - Annual CTC
 */
export const generateAnnexureSalaryStructure = (ctc) => {
  const annual = Number(ctc || 0);
  const monthly = annual / 12;

  // 🔹 Percentages tuned to match image-like breakup
  const structure = [
    { label: "Basic", percent: 0.444 },
    { label: "House Rent Allowance", percent: 0.18 },
    { label: "Dearness Allowance", percent: 0.12 },
    { label: "Special Allowance", percent: 0.114 },
    { label: "Food Allowance", percent: 0.06 },
    { label: "Misc. Allowance", percent: 0.082 },
  ];

  const rows = structure.map((item) => {
    const annualAmount = Math.round(annual * item.percent);
    return {
      label: item.label,
      monthly: Math.round(annualAmount / 12),
      annual: annualAmount,
    };
  });

  const totalMonthly = rows.reduce((s, r) => s + r.monthly, 0);
  const totalAnnual = rows.reduce((s, r) => s + r.annual, 0);

  rows.push({
    type: "total",
    label: "Total Monthly Gross Salary",
    monthly: totalMonthly,
    annual: totalAnnual,
  });

  return rows;
};

/**
 * Calculate salary breakdown based on CTC
 * @param {number} ctc - Cost to Company (annual amount)
 * @returns {object} - Salary breakdown with all components
 */
  export const calculateSalaryBreakdown = (ctc) => {
  const annual = parseFloat(ctc) || 350000; // Default to 3.5 LPA
  const monthly = annual / 12;

  // Standard salary breakdown percentages
  const basicPercentage = 0.4; // 40% of CTC
  const hraPercentage = 0.2; // 20% of CTC
  const conveyancePercentage = 0.05; // 5% of CTC
  const medicalPercentage = 0.05; // 5% of CTC
  const specialAllowancePercentage = 0.3; // 30% of CTC

  // Calculate components
  const basicSalary = annual * basicPercentage;
  const hra = annual * hraPercentage;
  const conveyanceAllowance = annual * conveyancePercentage;
  const medicalAllowance = annual * medicalPercentage;
  const specialAllowance = annual * specialAllowancePercentage;

  // Calculate deductions (typically 12% of basic for PF)
  const pf = basicSalary * 0.12;
  const professionalTax = 2400; // Annual professional tax
  const incomeTax = 0; // Assuming no income tax for 3.5 LPA

  const totalEarnings =
    basicSalary +
    hra +
    conveyanceAllowance +
    medicalAllowance +
    specialAllowance;
  const totalDeductions = pf + professionalTax + incomeTax;
  const netSalary = totalEarnings - totalDeductions;

  return {
    annual: {
      ctc: annual,
      basicSalary: Math.round(basicSalary),
      hra: Math.round(hra),
      conveyanceAllowance: Math.round(conveyanceAllowance),
      medicalAllowance: Math.round(medicalAllowance),
      specialAllowance: Math.round(specialAllowance),
      totalEarnings: Math.round(totalEarnings),
      pf: Math.round(pf),
      professionalTax: Math.round(professionalTax),
      incomeTax: Math.round(incomeTax),
      totalDeductions: Math.round(totalDeductions),
      netSalary: Math.round(netSalary),
    },
    monthly: {
      ctc: Math.round(monthly),
      basicSalary: Math.round(basicSalary / 12),
      hra: Math.round(hra / 12),
      conveyanceAllowance: Math.round(conveyanceAllowance / 12),
      medicalAllowance: Math.round(medicalAllowance / 12),
      specialAllowance: Math.round(specialAllowance / 12),
      totalEarnings: Math.round(totalEarnings / 12),
      pf: Math.round(pf / 12),
      professionalTax: Math.round(professionalTax / 12),
      incomeTax: Math.round(incomeTax / 12),
      totalDeductions: Math.round(totalDeductions / 12),
      netSalary: Math.round(netSalary / 12),
    },
  };
};

/**
 * Generate Increment Letter Salary Structure (Grouped – HR Format)
 * @param {number} ctc
 */
export const generateIncrementSalaryStructure = (ctc) => {
  const breakdown = calculateSalaryBreakdown(ctc);

  // 🔹 Derived values (business rules – adjustable)
  const bouquetMonthly = Math.round(breakdown.monthly.specialAllowance * 0.4);
  const bouquetAnnual = bouquetMonthly * 12;

  const cityMonthly = Math.round(breakdown.monthly.specialAllowance * 0.3);
  const cityAnnual = cityMonthly * 12;

  const gratuityMonthly = Math.round(
    (breakdown.annual.basicSalary * 0.05) / 12
  );
  const gratuityAnnual = gratuityMonthly * 12;

  const superannuationMonthly = Math.round(
    (breakdown.annual.basicSalary * 0.175) / 12
  );
  const superannuationAnnual = superannuationMonthly * 12;

  const performanceMonthly = Math.round(
    breakdown.monthly.specialAllowance * 0.2
  );
  const performanceAnnual = performanceMonthly * 12;

  const bonusMonthly = Math.round(breakdown.monthly.specialAllowance * 0.1);
  const bonusAnnual = bonusMonthly * 12;

  return [
    {
      type: "row",
      label: "Basic",
      monthly: breakdown.monthly.basicSalary,
      annual: breakdown.annual.basicSalary,
    },
    {
      type: "row",
      label: "Bouquet Of Benefits",
      monthly: bouquetMonthly,
      annual: bouquetAnnual,
    },
    {
      type: "row",
      label: "City Allowance",
      monthly: cityMonthly,
      annual: cityAnnual,
    },

    { type: "section", label: "Retirals" },
    {
      type: "row",
      label: "Gratuity",
      monthly: gratuityMonthly,
      annual: gratuityAnnual,
    },
    {
      type: "row",
      label: "Superannuation Fund",
      monthly: superannuationMonthly,
      annual: superannuationAnnual,
    },

    { type: "section", label: "Performance Pay" },
    {
      type: "row",
      label: "Monthly Performance Pay",
      monthly: performanceMonthly,
      annual: performanceAnnual,
    },
    {
      type: "row",
      label: "Performance Bonus",
      monthly: bonusMonthly,
      annual: bonusAnnual,
    },

    {
      type: "total",
      label: "Total Salary",
      monthly: breakdown.monthly.totalEarnings,
      annual: breakdown.annual.ctc,
    },
  ];
};

/**
 * Generate salary components array specifically for offer letter tables
 * @param {number} ctc - Cost to Company (annual amount)
 * @returns {array} - Array of salary components with monthly and annual values
 */
export const generateOfferLetterComponents = (ctc) => {
  return generateSalaryComponents(ctc);
};

/**
 * Generate salary components array for offer letter tables
 * @param {number} ctc - Cost to Company (annual amount)
 * @returns {array} - Array of salary components with monthly and annual values
 */
export const generateSalaryComponents = (ctc) => {
  const breakdown = calculateSalaryBreakdown(ctc);

  return [
    {
      name: "Basic Salary",
      monthly: breakdown.monthly.basicSalary,
      annual: breakdown.annual.basicSalary,
    },
    {
      name: "House Rent Allowance (HRA)",
      monthly: breakdown.monthly.hra,
      annual: breakdown.annual.hra,
    },
    {
      name: "Conveyance Allowance",
      monthly: breakdown.monthly.conveyanceAllowance,
      annual: breakdown.annual.conveyanceAllowance,
    },
    {
      name: "Food Allowance",
      monthly: breakdown.monthly.medicalAllowance,
      annual: breakdown.annual.medicalAllowance,
    },
    {
      name: "Special Allowance",
      monthly: breakdown.monthly.specialAllowance,
      annual: breakdown.annual.specialAllowance,
    },
  ];
};

/**
 * Calculate increment amount and new salary
 * @param {number} currentCTC - Current CTC
 * @param {number} incrementPercentage - Increment percentage
 * @returns {object} - Increment details
 */
export const calculateIncrement = (currentCTC, incrementPercentage) => {
  const current = parseFloat(currentCTC) || 350000;
  const percentage = parseFloat(incrementPercentage) || 10;

  const incrementAmount = (current * percentage) / 100;
  const newCTC = current + incrementAmount;

  const currentBreakdown = calculateSalaryBreakdown(current);
  const newBreakdown = calculateSalaryBreakdown(newCTC);

  return {
    currentCTC: current,
    incrementPercentage: percentage,
    incrementAmount: Math.round(incrementAmount),
    newCTC: Math.round(newCTC),
    currentMonthly: currentBreakdown.monthly.ctc,
    newMonthly: newBreakdown.monthly.ctc,
    monthlyIncrement: newBreakdown.monthly.ctc - currentBreakdown.monthly.ctc,
  };
};

/**
 * Format currency in Indian format
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string
 */

export const formatCurrency = (amount, decimals = 2) => {
  if (amount == null || isNaN(amount)) {
    return Number(0).toFixed(decimals);
  }

  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
};
/**
 * Convert number to words (Indian format)
 * @param {number} amount - Amount to convert
 * @returns {string} - Amount in words
 */
export const numberToWords = (amount) => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const convertHundreds = (num) => {
    let result = "";
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }
    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    } else if (num >= 10) {
      result += teens[num - 10] + " ";
      num = 0;
    }
    if (num > 0) {
      result += ones[num] + " ";
    }
    return result;
  };

  if (amount === 0) return "Zero Rupees Only";

  let result = "";
  let crores = Math.floor(amount / 10000000);
  amount %= 10000000;
  let lakhs = Math.floor(amount / 100000);
  amount %= 100000;
  let thousands = Math.floor(amount / 1000);
  amount %= 1000;
  let hundreds = amount;

  if (crores > 0) {
    result += convertHundreds(crores) + "Crore ";
  }
  if (lakhs > 0) {
    result += convertHundreds(lakhs) + "Lakh ";
  }
  if (thousands > 0) {
    result += convertHundreds(thousands) + "Thousand ";
  }
  if (hundreds > 0) {
    result += convertHundreds(hundreds);
  }

  return result.trim() + " Rupees Only";
};
