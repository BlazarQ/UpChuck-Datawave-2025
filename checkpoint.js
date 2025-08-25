// filepath: c:\Users\Asus\Desktop\Programming\BPI WAIS\server.js
import express from "express";
import cors from "cors";
import PocketBase from "pocketbase";
import { GoogleGenerativeAI } from "@google/generative-ai";

const pb = new PocketBase("http://127.0.0.1:8090");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to BPI WAIS API</h1>");
});

// Basic route
app.get("/api", (req, res) => {
  res.json({ message: "BPI WAIS API" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//ctrl f to here: "2) Concrete algorithm (from input → single or combo recommendation)"

//STEP 1: COLLECT DATA
// Main API endpoint for financial advice
app.post("/api/analyze", async (req, res) => {
  try {
    const {
      age,
      employment_status,
      monthly_income,
      other_income,
      monthly_expenses,
      variable_expenses,
      current_savings,
      current_debt,
      goal,
      goal_amount,
      goal_time_horizon,
      emergency_fund,
      monthly_debt_allotment,
      risk_appetite,
    } = req.body;

    // Calculate derived metrics
    const emergency_fund_is_sufficient = emergency_fund >= 3 * monthly_expenses;
    const net_income =
      monthly_income + other_income - (monthly_expenses + variable_expenses);
    const debt_load_ratio = monthly_debt_allotment / net_income;
    const emergency_fund_months = emergency_fund / monthly_expenses;

    // Get filtered products
    const savingsResults = await filterSavingsAccounts(
      current_savings,
      net_income
    );
    const timeDepositResults = await filterTimeDeposit(
      current_savings,
      net_income,
      risk_appetite,
      goal_time_horizon
    );
    const treasuryResults = await filterRetailTreasuryBonds(
      current_savings,
      net_income,
      risk_appetite
    );
    const creditCardResults = await filterCreditCards(monthly_income);

    // Get AI insights
    const aiResponse = await askFinancialAdvice({
      userProfile: {
        age,
        employment_status,
        monthly_income,
        other_income,
        monthly_expenses,
        current_savings,
        current_debt,
        goal,
        goal_amount,
        goal_time_horizon,
        risk_appetite,
      },
      metrics: {
        net_income,
        debt_load_ratio,
        emergency_fund_months,
      },
      filteredProducts: {
        savings: savingsResults,
        timeDeposits: timeDepositResults,
        treasuryBonds: treasuryResults,
        creditCards: creditCardResults,
      },
    });

    // Send combined response
    res.json({
      metrics: {
        emergency_fund_is_sufficient,
        net_income,
        debt_load_ratio,
        emergency_fund_months,
      },
      filtered_products: {
        savings: savingsResults,
        timeDeposits: timeDepositResults,
        treasuryBonds: treasuryResults,
        creditCards: creditCardResults,
      },
      ai_insights: aiResponse,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: "Failed to analyze financial data" });
  }
});

async function filterSavingsAccounts(current_savings, net_income) {
  // Step 1: Get all savings accounts
  const allAccounts = await pb.collection("savings_accounts").getFullList();

  // Step 2: Filter accounts where initial_deposit is affordable
  const affordableAccounts = allAccounts.filter(
    (acc) =>
      acc.initial_deposit <= current_savings ||
      acc.initial_deposit <= net_income
  );

  // Step 3: Split into two groups based on daily_balance_for_interest
  const canIncurInterest = [];
  const cannotIncurInterest = [];

  //To know which accounts can incur interest, we check if the user can maintain
  // the daily balance for interest with their current savings.
  affordableAccounts.forEach((acc) => {
    if (acc.daily_balance_for_interest <= current_savings) {
      canIncurInterest.push(acc);
    } else {
      cannotIncurInterest.push(acc);
    }
  });

  return {
    canIncurInterest,
    cannotIncurInterest,
  };
}

//TESTING
(async () => {
  const { canIncurInterest, cannotIncurInterest } = await filterSavingsAccounts(
    current_savings,
    net_income
  );

  console.log(
    "✅ Can Maintain Daily Balance and Incur Interest:",
    canIncurInterest
  );
  console.log(
    "❌ Cannot Maintain Daily Balance and Will Not Incur Interest:",
    cannotIncurInterest
  );
})();

// Checking: allow if user is business owner/freelancer or high transaction (proxy: many payees, reimbursements, or explicit goal).
//am not sure if this is even applicable since it's just for putting your money in a bank and more liquid than savings accounts

// Time Deposit: allow only if emergency_fund_months ≥ target (e.g., 3–6) AND net_income ≥ 0 AND min_initial_deposit ≤ (current_savings - emergency_buffer).

async function filterTimeDeposit(
  current_savings,
  net_income,
  risk_appetite,
  goal_time_horizon
) {
  const goal_time_horizon_days = goal_time_horizon * 31;
  const amount = (net_income + current_savings) * risk_appetite;

  // Step 1: Get all accounts
  const allAccounts = await pb
    .collection("auto_renew_time_deposits")
    .getFullList();

  // Step 2: Filter accounts where daily_balance_for_interest is affordable
  const affordableAccounts = allAccounts.filter(
    (acc) => Number(acc.daily_balance_for_interest) <= amount
  );
  // Step 3: Match best term based on goal_time_horizon_days
  const canIncurInterest = [];
  let bestMatch = null; // Will store the last valid match

  affordableAccounts.forEach((acc) => {
    const terms = [35, 63, 91, 182, 365]; // available tenors
    const validTerms = terms.filter((t) => t <= goal_time_horizon_days);
    let validAccount = acc;
    if (validTerms.length > 0) {
      const chosenTerm = Math.max(...validTerms); // pick the closest lower tenor
      const rateKey = `${chosenTerm}_days`; // match your record format
      const chosenRate = Number(acc[rateKey]);
      bestMatch = acc; // Update with the latest match
    }
  });

  return {
    canIncurInterest: bestMatch ? [bestMatch] : [], // Return array with single item or empty array
  };
}

const testTimeDeposit = async () => {
  try {
    console.log("\n=== Time Deposit Test Debug ===");
    console.log("Input Parameters:");
    console.log("Current Savings:", current_savings);
    console.log("Net Income:", net_income);
    console.log("Risk Appetite:", risk_appetite);
    console.log("Goal Time Horizon (months):", goal_time_horizon);

    const amount = (net_income + current_savings) * risk_appetite;
    console.log("\nCalculated Values:");
    console.log("Available Amount:", amount);
    console.log("Time Horizon (days):", goal_time_horizon * 31);

    const { canIncurInterest } = await filterTimeDeposit(
      current_savings,
      net_income,
      risk_appetite,
      goal_time_horizon
    );

    console.log("\nResults:");
    console.log("Accounts that match criteria:");
    console.log(JSON.stringify(canIncurInterest, null, 2));
  } catch (error) {
    console.error("Error testing time deposits:", error);
  }
};

testTimeDeposit();

// Investment/Treasury accounts: allow if horizon ∈ {medium,long} AND risk_bucket ≠ conservative (or pick conservative variants).
async function filterRetailTreasuryBonds(
  current_savings,
  net_income,
  risk_appetite
) {
  const amount = (net_income + current_savings) * risk_appetite;
  let bestMatch = null;

  // Step 1: Get all accounts
  const allAccounts = await pb
    .collection("retail_treasury_bonds")
    .getFullList();

  const canIncurInterest = [];

  //Allow treasury bonds if amount >= initial_deposit and risk_appetite is moderate
  allAccounts.forEach((acc) => {
    if (amount >= Number(acc.initial_deposit) && risk_appetite >= 0.25) {
      bestMatch = acc;
    }
  });

  return {
    canIncurInterest: bestMatch ? [bestMatch] : [], // Return array with single item or empty array
  };
}

const testRetailTreasuryBonds = async () => {
  try {
    console.log("\n=== Retail Treasury Bonds Test Debug ===");
    console.log("Input Parameters:");
    console.log("Current Savings:", current_savings);
    console.log("Net Income:", net_income);
    console.log("Risk Appetite:", risk_appetite);

    const amount = (net_income + current_savings) * risk_appetite;
    console.log("\nCalculated Values:");
    console.log("Available Amount:", amount);

    const { canIncurInterest } = await filterRetailTreasuryBonds(
      current_savings,
      net_income,
      risk_appetite
    );

    console.log("\nResults:");
    console.log("Accounts that match criteria:");
    console.log(JSON.stringify(canIncurInterest, null, 2));
  } catch (error) {
    console.error("Error testing retail treasury bonds:", error);
  }
};
testRetailTreasuryBonds();

// Credit Cards: allow only if net_income ≥ product.min_income, debt_load_ratio ≤ threshold (e.g., 30–40%), and no revolving high-interest debt (or plan includes payoff).
async function filterCreditCards(monthly_income) {
  // Step 1: Get all accounts
  const allAccounts = await pb.collection("credit_cards").getFullList();

  const canIncurInterest = [];

  allAccounts.forEach((acc) => {
    if (monthly_income * 12 >= Number(acc.min_annual_income)) {
      canIncurInterest.push(acc);
    }
  });

  return {
    canIncurInterest, // Return array with single item or empty array
  };
}

const testCreditCards = async () => {
  try {
    console.log("\n=== Credit Cards Test Debug ===");
    console.log("Input Parameters:");
    console.log("Monthly Income:", monthly_income);
    console.log("Annual Income:", monthly_income * 12);
    console.log("Debt Load Ratio:", debt_load_ratio);

    const { canIncurInterest } = await filterCreditCards(monthly_income);

    console.log("\nResults:");
    console.log("Credit Cards that match criteria:");
    console.log(JSON.stringify(canIncurInterest, null, 2));
  } catch (error) {
    console.error("Error testing credit cards:", error);
  }
};
testCreditCards();

//LLM LAYER
// Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyBvrfhpiyZ7PNEDumzo5JDN1zPc8Ph6dGE");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function parseFinancialAdvice(llmResponse) {
  try {
    console.log("\n=== Raw LLM Response ===");
    console.log(llmResponse);

    // Try to extract JSON objects using a more robust regex
    const jsonRegex = /\{(?:[^{}]|{[^{}]*})*\}/g;
    const jsonStrings = llmResponse.match(jsonRegex);

    if (!jsonStrings || jsonStrings.length < 2) {
      throw new Error("Invalid LLM response format");
    }

    const insights = JSON.parse(jsonStrings[0]);
    const recommendations = JSON.parse(jsonStrings[1]);

    return {
      insights: insights.insights,
      recommended_products: recommendations.recommended_products,
    };
  } catch (error) {
    console.error("Error parsing financial advice:", error);
    throw error;
  }
}

// Add a new route for LLM queries
async function askFinancialAdvice() {
  try {
    const savingsResults = await filterSavingsAccounts(
      current_savings,
      net_income
    );
    const timeDepositResults = await filterTimeDeposit(
      current_savings,
      net_income,
      risk_appetite,
      goal_time_horizon
    );
    const treasuryResults = await filterRetailTreasuryBonds(
      current_savings,
      net_income,
      risk_appetite
    );
    const creditCardResults = await filterCreditCards(monthly_income);

    // Create context from our data
    const context = `
      User Profile:
      - Age: ${age}
      - Employment: ${employment_status}
      - Monthly Income: ${monthly_income}
      - Other Income: ${other_income}
      - Monthly Expenses: ${monthly_expenses}
      - Current Savings: ${current_savings}
      - Current Debt: ${current_debt}
      - Goal: ${goal}
      - Goal Amount: ${goal_amount}
      - Time Horizon: ${goal_time_horizon} months
      - Risk Appetite: ${risk_appetite}
      
      Financial Metrics:
      - Net Income: ${net_income}
      - Debt Load Ratio: ${debt_load_ratio}
      - Emergency Fund: ${emergency_fund}
    Recommended Products Based on Financial Profile:

      Savings Accounts:
      - Accounts that can earn interest: ${JSON.stringify(
        savingsResults.canIncurInterest,
        null,
        2
      )}
      - Accounts without immediate interest: ${JSON.stringify(
        savingsResults.cannotIncurInterest,
        null,
        2
      )}

      Time Deposits:
      - Recommended options: ${JSON.stringify(
        timeDepositResults.canIncurInterest,
        null,
        2
      )}

      Retail Treasury Bonds:
      - Available options: ${JSON.stringify(
        treasuryResults.canIncurInterest,
        null,
        2
      )}

      Credit Cards:
      - Eligible cards: ${JSON.stringify(
        creditCardResults.canIncurInterest,
        null,
        2
      )}
    `;

    const prompt = `
      You are a BPI financial advisor assistant. Return ONLY two JSON objects in this exact format with no other text:

      {
        "insights": {
          "emergency_fund_warning": "string or null",
          "overall_recommendation": "string"
        }
      }

      {
        "recommended_products": [
          {
            "product_name": "string",
            "reason": "string"
          }
        ]
      }    
      You are a BPI financial advisor assistant. Use this context about the client:
      ${context}
      
      You are a financial advisor assistant for BPI. You must ONLY recommend from the products explicitly listed in the provided context. Do not invent, rename, or modify any product. If no product fits, explain that honestly.

Your job:
1. If the client’s emergency fund is less than 3–6 months of their expenses, clearly warn them in plain language that this is risky and should be their first priority before considering longer-term or locked products.
2. Recommend the top 1–3 products from the provided eligible lists that best help the client reach their goal. If no products are suitable, return an empty list and explain why.
3. Always check the final recommended products against the provided product lists before answering. If something does not match exactly, do not include it.
4. Avoid sounding overly certain. If there are trade-offs or limits to the recommendation, briefly mention them in plain language (e.g., “This works well if you can keep the money untouched, but it won’t help if you need quick access”).
5. Provide short, digestible explanations that clearly connect the advice to the client’s numbers (savings, income, expenses, time horizon, risk appetite). Show *why* the recommendation fits, not just *what* it is.

Return your answer in exactly two JSON objects, nothing else:

**First JSON** → insights
- emergency_fund_warning/ (string; include warning if insufficient, else empty)
- overall_recommendation (string; high-level summary with caveats if needed)

**Second JSON** → recommended_products
Array of objects, each with:
- product_name (must exactly match a product from the eligible lists given in context)
- reason (simple explanation why it fits, with a brief caveat if relevant)

Never mention or recommend products that are not in the provided context. If you are unsure, exclude it.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log("\n=== Parsed Response ===");
    return await parseFinancialAdvice(response.text());
  } catch (error) {
    console.error("LLM Error:", error);
  }
}

askFinancialAdvice();
