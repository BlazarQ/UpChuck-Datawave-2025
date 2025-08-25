import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================
// TYPES AND INTERFACES
// ============================

interface Debt {
  name: string;
  balance: number;
  monthlyPayment: number;
  monthlyInterestRate: number;
  deadlineInMonths: number;
}

type DebtTuple = [string, number, number, number, number];

interface Scenario {
  monthlyIncome: number;
  monthlyLivingExpense: number;
  monthlyLeisureExpense: number;
  emergencyFundStart: number;
  createEmergencyFund: boolean;
  currentSavings: number;
  debts: DebtTuple[];
  timeToAchieveGoal: number;
  goalAmount: number | null;
  savingsAllocation: number;
}

interface SimulationResult {
  totalMonths: number;
  goalAchievedAtMonth: number | null;
  timeframeMet: boolean;
}

interface ScenarioResults {
  finalSavings: number;
  goalAchieved: boolean | string;
  monthsRun: number;
}

// ============================
// FINANCIAL PLANNING SCENARIOS
// ============================

const scenarios: Record<string, Scenario> = {
  emergencyFundBuilder: {
    monthlyIncome: 35000,
    monthlyLivingExpense: 25000,
    monthlyLeisureExpense: 3000,
    emergencyFundStart: 0,
    createEmergencyFund: true,
    currentSavings: 0,
    debts: [],
    timeToAchieveGoal: 12,
    goalAmount: null,
    savingsAllocation: 1.0
  },
  
  debtAvalanche: {
    monthlyIncome: 60000,
    monthlyLivingExpense: 30000,
    monthlyLeisureExpense: 8000,
    emergencyFundStart: 0,
    createEmergencyFund: false,
    currentSavings: 5000,
    debts: [
      ["Credit Card 1", 45000, 8000, 2.5, 18],
      ["Credit Card 2", 25000, 4000, 2.0, 15],
      ["Personal Loan", 80000, 6000, 1.8, 24]
    ],
    timeToAchieveGoal: 36,
    goalAmount: null,
    savingsAllocation: 0.2
  },
  
  houseDownPayment: {
    monthlyIncome: 75000,
    monthlyLivingExpense: 35000,
    monthlyLeisureExpense: 10000,
    emergencyFundStart: 50000,
    createEmergencyFund: true,
    currentSavings: 20000,
    debts: [
      ["Car Loan", 180000, 8000, 0.8, 30]
    ],
    timeToAchieveGoal: 48,
    goalAmount: 500000,
    savingsAllocation: 0.8
  },
  
  retirementCatchUp: {
    monthlyIncome: 120000,
    monthlyLivingExpense: 50000,
    monthlyLeisureExpense: 20000,
    emergencyFundStart: 200000,
    createEmergencyFund: true,
    currentSavings: 150000,
    debts: [
      ["Mortgage", 2000000, 25000, 0.4, 180]
    ],
    timeToAchieveGoal: 120,
    goalAmount: 2000000,
    savingsAllocation: 0.6
  },
  
  fireMovement: {
    monthlyIncome: 90000,
    monthlyLivingExpense: 20000,
    monthlyLeisureExpense: 5000,
    emergencyFundStart: 100000,
    createEmergencyFund: true,
    currentSavings: 80000,
    debts: [],
    timeToAchieveGoal: 180,
    goalAmount: 5000000,
    savingsAllocation: 0.9
  },
  
  // ============================
  // ADD YOUR CUSTOM SCENARIOS BELOW
  // ============================
  
  myCustomScenario: {
    monthlyIncome: 20000,
    monthlyLivingExpense: 10000,
    monthlyLeisureExpense: 2000,
    emergencyFundStart: 1000,
    createEmergencyFund: true,
    currentSavings: 1000,
    debts: [
      // [name, balance, monthlyPayment, monthlyInterestRate(%), deadlineInMonths]
      // Add your debts here, or leave empty array [] for no debts
    ],
    timeToAchieveGoal: 0,
    goalAmount: 20000, // Set to null for time-based planning, or specify amount
    savingsAllocation: 0.5
  }
};

// ============================
// SCENARIO LOADER FUNCTION
// ============================

function loadScenario(scenarioName: string): boolean {
  const scenario = scenarios[scenarioName];
  if (!scenario) {
    console.error(`Scenario '${scenarioName}' not found!`);
    return false;
  }
  
  // Apply all variables from scenario
  monthlyIncome = scenario.monthlyIncome;
  monthlyLivingExpense = scenario.monthlyLivingExpense;
  monthlyLeisureExpense = scenario.monthlyLeisureExpense;
  emergencyFundStart = scenario.emergencyFundStart;
  createEmergencyFund = scenario.createEmergencyFund;
  currentSavings = scenario.currentSavings;
  debts = scenario.debts.map(d => [...d] as DebtTuple); // Deep copy debts array
  timeToAchieveGoal = scenario.timeToAchieveGoal;
  goalAmount = scenario.goalAmount;
  savingsAllocation = scenario.savingsAllocation;
  
  console.log(`✅ Loaded scenario: ${scenarioName}`);
  return true;
}

// ============================
// USER INPUT VARIABLES
// ============================

// 🔥 CHOOSE YOUR SCENARIO HERE - Just change the scenario name!
const selectedScenario: string = "myCustomScenario"; // Change this to any scenario name

// Default values (will be overridden by scenario)
let monthlyIncome: number = 0;
let monthlyLivingExpense: number = 0;
let monthlyLeisureExpense: number = 0;
let emergencyFundStart: number = 0;
let createEmergencyFund: boolean = false;
let currentSavings: number = 0;
let debts: DebtTuple[] = [];
let timeToAchieveGoal: number = 0;
let goalAmount: number | null = null;
let savingsAllocation: number = 0;

// Load the selected scenario
loadScenario(selectedScenario);

// ============================
// CONSTANTS
// ============================
const inflationRate: number = 0.03;
let exceededTimeframe: boolean = false;

// Emergency Fund Target (dynamic, increases with inflation)
let emergencyFundTarget: number = createEmergencyFund ? monthlyLivingExpense * 4.5 : 0;

// ============================
// TRACKING ARRAYS (main run)
// ============================
let savingsHistory: number[] = [];
let extraSavingsHistory: number[] = [];
let cumulativeExtraHistory: number[] = []; // New: Track cumulative extra savings
let expenseTotalHistory: number[] = [];
let debtHistory: number[] = [];
let emergencyFundHistory: number[] = [];

// ============================
// TRACKING ARRAYS (optimized run)
// ============================
let savingsHistoryOptimized: number[] = [];
let extraSavingsHistoryOptimized: number[] = [];
let cumulativeExtraHistoryOptimized: number[] = []; // New: Track cumulative extra savings
let expenseTotalHistoryOptimized: number[] = [];
let debtHistoryOptimized: number[] = [];
let emergencyFundHistoryOptimized: number[] = [];

// ============================
// HELPER FUNCTIONS
// ============================

// Apply inflation yearly to living + leisure
function applyInflation(month: number, living: number, leisure: number): [number, number] {
  if (month > 0 && month % 12 === 0) {
    living *= (1 + inflationRate);
    leisure *= (1 + inflationRate);
  }
  return [living, leisure];
}

// Process debts month by month
function processDebts(debts: DebtTuple[]): [DebtTuple[], number] {
  let remainingDebts: DebtTuple[] = debts.map(d => [...d] as DebtTuple); // deep copy
  let totalDebtLeft: number = 0;
  remainingDebts.forEach(d => {
    let balance: number = d[1];
    let monthlyPayment: number = d[2];
    let monthlyInterest: number = d[3] / 100;

    balance += balance * monthlyInterest;
    balance -= monthlyPayment;
    if (balance < 0) balance = 0;
    d[1] = balance;
    totalDebtLeft += balance;
  });
  return [remainingDebts, totalDebtLeft];
}

// Core simulation function
function runSimulation(allocation: number, recordOptimized: boolean = false): SimulationResult {
  let savings: number = currentSavings;
  let ef: number = emergencyFundStart;
  let month: number = 0;
  let debtsCopy: DebtTuple[] = debts.map(d => [...d] as DebtTuple);
  let goalAchievedAtMonth: number | null = null;
  let cumulativeExtra: number = 0; // Track cumulative extra savings

  // Reset inflation-sensitive variables
  let living: number = monthlyLivingExpense;
  let leisure: number = monthlyLeisureExpense;
  let efTarget: number = emergencyFundTarget;

  // Handle edge cases
  const hasGoalAmount: boolean = goalAmount !== null && goalAmount !== undefined && goalAmount > 0;
  const hasTimeframe: boolean = timeToAchieveGoal > 0;
  
  // If no timeframe and no goal, default to 12 months
  let maxMonths: number = hasTimeframe ? timeToAchieveGoal : 12;

  // ============================
  // INITIAL ALLOCATION OF CURRENT SAVINGS TO PRIORITIES
  // ============================
  // Use existing savings to pay off debts first, then emergency fund
  if (savings > 0 && month === 0) {
    let remainingSavings: number = savings;
    savings = 0; // Reset savings, we'll reallocate
    
    // Pay off debts with existing savings
    debtsCopy.forEach(debt => {
      if (remainingSavings > 0 && debt[1] > 0) {
        let payoff: number = Math.min(remainingSavings, debt[1]);
        debt[1] -= payoff;
        remainingSavings -= payoff;
        if (!recordOptimized) {
          console.log(`💳 Used ₱${payoff.toLocaleString()} from current savings to pay off ${debt[0]}`);
        }
      }
    });
    
    // Use remaining for emergency fund
    if (remainingSavings > 0 && createEmergencyFund && ef < efTarget) {
      let toEF: number = Math.min(remainingSavings, efTarget - ef);
      ef += toEF;
      remainingSavings -= toEF;
      if (!recordOptimized) {
        console.log(`🛡️ Used ₱${toEF.toLocaleString()} from current savings for emergency fund`);
      }
    }
    
    // Whatever's left goes back to goal savings
    savings = remainingSavings;
    if (savings > 0 && !recordOptimized) {
      console.log(`💰 Remaining ₱${savings.toLocaleString()} allocated to goal savings`);
    }
  }
  
  // Main simulation loop
  while (true) {
    // Apply inflation
    [living, leisure] = applyInflation(month, living, leisure);
    if (createEmergencyFund) efTarget = living * 4.5;

    // Expenses
    let expenseTotal: number = living + leisure;

    // Income - expenses = possible savings
    let available: number = monthlyIncome - expenseTotal;
    if (available < 0) available = 0;

    // Step 1: Pay debts (PRIORITY 1)
    let totalDebt: number;
    [debtsCopy, totalDebt] = processDebts(debtsCopy);

    // Step 2: Emergency Fund (PRIORITY 2 - only after debts are cleared)
    if (totalDebt === 0 && createEmergencyFund && ef < efTarget) {
      let toFund: number = Math.min(available, efTarget - ef);
      ef += toFund;
      available -= toFund;
    }

    // Step 3: Goal Savings & Extra (only after debts and emergency fund are handled)
    let extra: number = 0;
    if (totalDebt === 0 && (!createEmergencyFund || ef >= efTarget)) {
      // All priorities cleared - now we can allocate based on savings allocation
      let toSave: number = available * allocation;
      savings += toSave;
      extra = available * (1 - allocation); // This is true "extra" available for other uses
      cumulativeExtra += extra; // Add to cumulative extra
    }
    // If priorities aren't cleared, extra remains 0 (all money goes to priorities)

    // Record history
    if (!recordOptimized) {
      savingsHistory.push(savings);
      extraSavingsHistory.push(extra);
      cumulativeExtraHistory.push(cumulativeExtra);
      expenseTotalHistory.push(expenseTotal);
      debtHistory.push(totalDebt);
      emergencyFundHistory.push(ef);
    } else {
      savingsHistoryOptimized.push(savings);
      extraSavingsHistoryOptimized.push(extra);
      cumulativeExtraHistoryOptimized.push(cumulativeExtra);
      expenseTotalHistoryOptimized.push(expenseTotal);
      debtHistoryOptimized.push(totalDebt);
      emergencyFundHistoryOptimized.push(ef);
    }

    month++;

    // Check if goal is achieved for the first time
    if (hasGoalAmount && goalAmount !== null && savings >= goalAmount && goalAchievedAtMonth === null) {
      goalAchievedAtMonth = month;
      if (!recordOptimized) {
        console.log(`🎯 Goal of ${goalAmount.toLocaleString()} achieved at month ${month}!`);
      }
    }

    // Determine stopping conditions
    let shouldStop: boolean = false;
    
    if (hasGoalAmount && hasTimeframe) {
      // Both goal and timeframe exist
      if (goalAchievedAtMonth && month >= Math.max(maxMonths, goalAchievedAtMonth)) {
        shouldStop = true; // Run until at least timeframe OR goal achievement, whichever is later
      } else if (!goalAchievedAtMonth && month >= 600) { // Safety net: max 50 years
        shouldStop = true;
        if (!recordOptimized) exceededTimeframe = true;
      }
    } else if (hasGoalAmount && !hasTimeframe) {
      // Only goal exists, no timeframe
      if (goalAchievedAtMonth || month >= 600) { // Run until goal or safety net
        shouldStop = true;
      }
    } else if (!hasGoalAmount && hasTimeframe) {
      // Only timeframe exists, no goal
      if (month >= maxMonths) {
        shouldStop = true;
      }
    } else {
      // Neither goal nor timeframe (both zero/null)
      if (month >= 12) { // Default to 1 year
        shouldStop = true;
      }
    }

    if (shouldStop) break;

    // Additional safety: Stop if all debts paid, emergency fund full, and no meaningful progress
    if (totalDebt === 0 && (!createEmergencyFund || ef >= efTarget) && available <= 0 && month > maxMonths) {
      break;
    }
  }

  // Set exceeded timeframe flag
  if (!recordOptimized && hasGoalAmount && hasTimeframe) {
    if (!goalAchievedAtMonth && month >= timeToAchieveGoal) {
      exceededTimeframe = true;
    } else if (goalAchievedAtMonth && goalAchievedAtMonth > timeToAchieveGoal) {
      exceededTimeframe = true;
    }
  }

  return { 
    totalMonths: month, 
    goalAchievedAtMonth: goalAchievedAtMonth,
    timeframeMet: hasTimeframe ? month >= timeToAchieveGoal : true
  };
}

// ============================
// MAIN SIMULATION
// ============================

let optimizedAllocation: number | null = null;

// Run base simulation with chosen allocation
let simulationResult: SimulationResult = runSimulation(savingsAllocation);

// Handle Case 2: Goal achieved early - create optimized run that stretches to timeframe
if (goalAmount !== null && goalAmount !== undefined && goalAmount > 0 && timeToAchieveGoal > 0) {
  if (simulationResult.goalAchievedAtMonth && simulationResult.goalAchievedAtMonth < timeToAchieveGoal) {
    // Goal achieved early - calculate optimal allocation to stretch over full timeframe
    console.log(`\n🎯 Goal achieved early at month ${simulationResult.goalAchievedAtMonth}`);
    console.log(`📊 Creating optimized run to stretch savings over full ${timeToAchieveGoal} month timeframe...`);
    
    // Calculate the minimum allocation needed to achieve goal exactly at timeframe
    let availablePerMonth: number = monthlyIncome - (monthlyLivingExpense + monthlyLeisureExpense);
    let neededAllocation: number = (goalAmount - currentSavings) / (timeToAchieveGoal * availablePerMonth);
    
    // Ensure allocation is within valid bounds
    if (neededAllocation > 1) neededAllocation = 1;
    if (neededAllocation < 0) neededAllocation = 0;
    if (neededAllocation < savingsAllocation) { // Only optimize if we can reduce allocation
      optimizedAllocation = neededAllocation;
      console.log(`💡 Optimized allocation: ${(optimizedAllocation * 100).toFixed(1)}% (vs original ${(savingsAllocation * 100).toFixed(1)}%)`);
      runSimulation(neededAllocation, true);
    }
  } else if (!simulationResult.goalAchievedAtMonth && simulationResult.totalMonths > timeToAchieveGoal) {
    // Goal not achieved within timeframe - suggest higher allocation
    console.log(`\n⚠️ Goal not achieved within ${timeToAchieveGoal} months`);
    console.log(`📊 Creating optimized run with higher allocation...`);
    
    let availablePerMonth: number = monthlyIncome - (monthlyLivingExpense + monthlyLeisureExpense);
    let neededAllocation: number = (goalAmount - currentSavings) / (timeToAchieveGoal * availablePerMonth);
    
    if (neededAllocation > 1) neededAllocation = 1;
    if (neededAllocation > savingsAllocation) {
 // Only optimize if we need higher allocation
      optimizedAllocation = neededAllocation;
      console.log(`💡 Suggested allocation: ${(optimizedAllocation * 100).toFixed(1)}% (vs original ${(savingsAllocation * 100).toFixed(1)}%)`);
      runSimulation(neededAllocation, true);
    }
  }
}

// ============================
// RESULT
// ============================
console.log(`=== SCENARIO: ${selectedScenario.toUpperCase()} ===`);

// Determine scenario type for better output
const hasGoalAmount: boolean = goalAmount !== null && goalAmount !== undefined && goalAmount > 0;
const hasTimeframe: boolean = timeToAchieveGoal > 0;

console.log("📊 MAIN RUN RESULTS:");
console.log("Months simulated:", simulationResult.totalMonths);

if (hasGoalAmount && goalAmount !== null) {
  console.log("Goal Amount:", (goalAmount as number).toLocaleString());
  console.log("Final Savings:", savingsHistory[savingsHistory.length - 1].toLocaleString());
  console.log("Goal Achieved:", savingsHistory[savingsHistory.length - 1] >= goalAmount);
  
  if (simulationResult.goalAchievedAtMonth) {
    console.log("🎯 Goal achieved at month:", simulationResult.goalAchievedAtMonth);
  } else {
    console.log("❌ Goal not achieved within simulation period");
  }
}

if (hasTimeframe) {
  console.log("Target Timeframe:", timeToAchieveGoal, "months");
  console.log("Timeframe Met:", simulationResult.timeframeMet);
  
  if (hasGoalAmount) {
    if (exceededTimeframe) {
      console.log("⚠️ Timeline exceeded target timeframe");
    } else if (simulationResult.goalAchievedAtMonth && simulationResult.goalAchievedAtMonth <= timeToAchieveGoal) {
      console.log("✅ Goal achieved within timeframe");
    }
  }
} else {
  console.log("No specific timeframe - simulation ran until goal achievement or default period");
}

// ============================
// TIMEFRAME-ONLY DATA DISPLAY
// ============================
if (hasTimeframe && simulationResult.totalMonths > timeToAchieveGoal) {
  console.log("\n📅 DATA UP TO SPECIFIED TIMEFRAME ONLY:");
  console.log(`Showing data for months 1-${timeToAchieveGoal} (target timeframe):`);
  
  // Extract data up to timeframe
  const timeframeSavings: number[] = savingsHistory.slice(0, timeToAchieveGoal);
  const timeframeExtra: number[] = extraSavingsHistory.slice(0, timeToAchieveGoal);
  const timeframeCumulativeExtra: number[] = cumulativeExtraHistory.slice(0, timeToAchieveGoal);
  const timeframeExpenses: number[] = expenseTotalHistory.slice(0, timeToAchieveGoal);
  const timeframeDebt: number[] = debtHistory.slice(0, timeToAchieveGoal);
  const timeframeEmergencyFund: number[] = emergencyFundHistory.slice(0, timeToAchieveGoal);
  
  console.log("Savings at timeframe end:", timeframeSavings[timeframeSavings.length - 1].toLocaleString());
  console.log("Cumulative extra at timeframe end:", timeframeCumulativeExtra[timeframeCumulativeExtra.length - 1].toLocaleString());
  console.log("Debt remaining at timeframe end:", timeframeDebt[timeframeDebt.length - 1].toLocaleString());
  console.log("Emergency fund at timeframe end:", timeframeEmergencyFund[timeframeEmergencyFund.length - 1].toLocaleString());
  
  if (hasGoalAmount && goalAmount !== null) {
    const goalProgress: string = (timeframeSavings[timeframeSavings.length - 1] / goalAmount * 100).toFixed(1);
    console.log(`Goal progress at timeframe: ${goalProgress}%`);
    
    if (timeframeSavings[timeframeSavings.length - 1] < goalAmount) {
      const shortfall: number = goalAmount - timeframeSavings[timeframeSavings.length - 1];
      console.log(`Shortfall: ₱${shortfall.toLocaleString()}`);
    }
  }
  
  console.log("\n📈 TIMEFRAME-ONLY DETAILED HISTORY:");
  console.log("Savings History (to timeframe):", timeframeSavings);
  console.log("Monthly Extra History (to timeframe):", timeframeExtra);
  console.log("Cumulative Extra History (to timeframe):", timeframeCumulativeExtra);
  console.log("Expense Total History (to timeframe):", timeframeExpenses);
  console.log("Debt History (to timeframe):", timeframeDebt);
  console.log("Emergency Fund History (to timeframe):", timeframeEmergencyFund);
}

console.log("\n📈 MAIN RUN - COMPLETE DETAILED HISTORY:");
console.log("Savings History:", savingsHistory);
console.log("Monthly Extra Savings History:", extraSavingsHistory);
console.log("Cumulative Extra Savings History:", cumulativeExtraHistory);
console.log("Expense Total History:", expenseTotalHistory);
console.log("Debt History:", debtHistory);
console.log("Emergency Fund History:", emergencyFundHistory);

if (savingsHistoryOptimized.length > 0 && optimizedAllocation !== null) {
  console.log("\n=== OPTIMIZED RUN - STRETCHED TO TIMEFRAME ===");
  console.log("Purpose: Shows how to achieve the same goal over the full timeframe");
  console.log("Optimized Allocation:", `${(optimizedAllocation * 100).toFixed(1)}%`);
  console.log("Months simulated:", savingsHistoryOptimized.length);
  console.log("Final Savings:", savingsHistoryOptimized[savingsHistoryOptimized.length - 1].toLocaleString());
  console.log("Final Cumulative Extra:", cumulativeExtraHistoryOptimized[cumulativeExtraHistoryOptimized.length - 1].toLocaleString());
  
  console.log("\n📈 OPTIMIZED RUN - DETAILED HISTORY:");
  console.log("Savings History:", savingsHistoryOptimized);
  console.log("Monthly Extra Savings History:", extraSavingsHistoryOptimized);
  console.log("Cumulative Extra Savings History:", cumulativeExtraHistoryOptimized);
  console.log("Expense Total History:", expenseTotalHistoryOptimized);
  console.log("Debt History:", debtHistoryOptimized);
  console.log("Emergency Fund History:", emergencyFundHistoryOptimized);
  
  // Calculate total extra from optimized approach
  let totalExtraFromOptimized: number = cumulativeExtraHistoryOptimized[cumulativeExtraHistoryOptimized.length - 1];
  if (totalExtraFromOptimized > 0) {
    console.log(`💰 Total extra money available from lower allocation: ₱${totalExtraFromOptimized.toLocaleString()}`);
  }
}

// ============================
// BONUS: RUN MULTIPLE SCENARIOS
// ============================

// Uncomment this section to run all scenarios at once for comparison
function runAllScenarios(): void {
  const scenarioNames: string[] = Object.keys(scenarios);
  const results: Record<string, ScenarioResults> = {};
  
  scenarioNames.forEach(scenarioName => {
    console.log(`\n🔄 Running ${scenarioName}...`);
    
    // Reset arrays
    savingsHistory = [];
    extraSavingsHistory = [];
    expenseTotalHistory = [];
    debtHistory = [];
    emergencyFundHistory = [];
    
    // Load scenario and run
    if (loadScenario(scenarioName)) {
      emergencyFundTarget = createEmergencyFund ? monthlyLivingExpense * 4.5 : 0;
      runSimulation(savingsAllocation);
      
      results[scenarioName] = {
        finalSavings: savingsHistory[savingsHistory.length - 1],
        goalAchieved: goalAmount ? savingsHistory[savingsHistory.length - 1] >= goalAmount : 'N/A',
        monthsRun: savingsHistory.length
      };
    }
  });
  
  console.log("\n=== ALL SCENARIOS SUMMARY ===");
  console.table(results);
}


