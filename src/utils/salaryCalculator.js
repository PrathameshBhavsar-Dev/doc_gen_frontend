/**
 * Computes the full salary breakdown (actual + earned components,
 * deductions, net pay) from raw employee data.
 *
 * @param {Object} data - must include salary, workdays, paiddays
 * @param {Object} [config] - optional overrides for percentages/fixed amounts
 */
export const calculateSalaryBreakdown = (data = {}, config = {}) => {
  const {
    hraPct = 0.18,
    daPct = 0.12,
    specialPct = 0.16,
    foodPct = 0.06,
    pfAllowance = 3750,
    pf = 3750,
    pt = 200,
    others = 2000,
  } = config;

  const totalDays = Number(data.workdays || 0);
  const paidDays = Number(data.paiddays || 0);
  const gross = Math.round(Number(data.salary || 0) / 12);

  const hra = Math.round(gross * hraPct);
  const da = Math.round(gross * daPct);
  const special = Math.round(gross * specialPct);
  const food = Math.round(gross * foodPct);
  const basic = Math.round(gross - (hra + da + special + food + pfAllowance));

  const totalActual = basic + hra + da + special + food + pfAllowance;

  const earnedTotal =
    totalDays > 0 ? Math.round((Number(data.salary || 0) / 12 / totalDays) * paidDays) : 0;

  const earnedPfAllowance = pfAllowance;
  const earnedWithoutPf = earnedTotal - earnedPfAllowance;
  const denom = gross - pfAllowance;

  const earnedBasic = Math.round(basic * (earnedWithoutPf / denom));
  const earnedHra = Math.round(hra * (earnedWithoutPf / denom));
  const earnedDa = Math.round(da * (earnedWithoutPf / denom));
  const earnedSpecial = Math.round(special * (earnedWithoutPf / denom));
  const earnedFood = earnedWithoutPf - (earnedBasic + earnedHra + earnedDa + earnedSpecial);

  const totalEarned = earnedBasic + earnedHra + earnedDa + earnedSpecial + earnedFood + earnedPfAllowance;

  const totalDeductions = pf + pt + others;
  const netPay = totalEarned - totalDeductions;

  return {
    totalDays, paidDays, gross,
    actual: { basic, hra, da, special, food, pfAllowance, total: totalActual },
    earned: { basic: earnedBasic, hra: earnedHra, da: earnedDa, special: earnedSpecial, food: earnedFood, pfAllowance: earnedPfAllowance, total: totalEarned },
    deductions: { pf, pt, others, total: totalDeductions },
    netPay,
  };
};