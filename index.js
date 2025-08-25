import express from "express";
import cors from "cors";
import PocketBase from "pocketbase";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Export the Express app and main functions
export const app = express();

// Export the filter functions
export const filters = {
  filterSavingsAccounts,
  filterTimeDeposit,
  filterRetailTreasuryBonds,
  filterCreditCards,
};

// Export the AI analysis functions
export const ai = {
  askFinancialAdvice,
  parseFinancialAdvice,
};

// Load environment variables
dotenv.config();

const pb = new PocketBase("http://127.0.0.1:8090");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini with environment variable
const genAI = new GoogleGenerativeAI(AIzaSyBvrfhpiyZ7PNEDumzo5JDN1zPc8Ph6dGE);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.get("/", (req, res) => {
  res.send("<h1>Welcome to BPI WAIS API</h1>");
});

app.get("/api", (req, res) => {
  res.json({ message: "BPI WAIS API" });
});

// Main API endpoint for financial advice
app.post("/api/analyze", async (req, res) => {
  try {
    const {
      age,
      employment_status,
      monthly_income,
      other_income = 0,
      monthly_expenses,
      variable_expenses = 0,
      current_savings,
      current_debt = 0,
      goal,
      goal_amount = 0,
      goal_time_horizon = 12,
      emergency_fund = 0,
      monthly_debt_allotment = 0,
      risk_appetite,
    } = req.body;

    // Calculate derived metrics
    const emergency_fund_is_sufficient = emergency_fund >= 3 * monthly_expenses;
    const net_income =
      monthly_income + other_income - (monthly_expenses + variable_expenses);
    const debt_load_ratio =
      net_income > 0 ? monthly_debt_allotment / net_income : 0;
    const emergency_fund_months =
      monthly_expenses > 0 ? emergency_fund / monthly_expenses : 0;

    // Get filtered products
    const [
      savingsResults,
      timeDepositResults,
      treasuryResults,
      creditCardResults,
    ] = await Promise.all([
      filterSavingsAccounts(current_savings, net_income),
      filterTimeDeposit(
        current_savings,
        net_income,
        risk_appetite,
        goal_time_horizon
      ),
      filterRetailTreasuryBonds(current_savings, net_income, risk_appetite),
      filterCreditCards(monthly_income),
    ]);

    // Get AI insights
    const userProfile = {
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
    };

    const metrics = {
      net_income,
      debt_load_ratio,
      emergency_fund_months,
      emergency_fund_is_sufficient,
    };

    const filteredProducts = {
      savings: savingsResults,
      timeDeposits: timeDepositResults,
      treasuryBonds: treasuryResults,
      creditCards: creditCardResults,
    };

    const aiResponse = await askFinancialAdvice(
      userProfile,
      metrics,
      filteredProducts
    );

    // Send combined response
    res.json(aiResponse);
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      error: "Failed to analyze financial data",
      message: error.message,
    });
  }
});

// Improved filter functions
async function filterSavingsAccounts(current_savings, net_income) {
  try {
    const allAccounts = await pb.collection("savings_accounts").getFullList();

    const affordableAccounts = allAccounts.filter(
      (acc) =>
        acc.initial_deposit <= current_savings ||
        acc.initial_deposit <= net_income
    );

    const canIncurInterest = [];
    const cannotIncurInterest = [];

    affordableAccounts.forEach((acc) => {
      if (acc.daily_balance_for_interest <= current_savings) {
        canIncurInterest.push(acc);
      } else {
        cannotIncurInterest.push(acc);
      }
    });

    return { canIncurInterest, cannotIncurInterest };
  } catch (error) {
    console.error("Error filtering savings accounts:", error);
    return { canIncurInterest: [], cannotIncurInterest: [] };
  }
}

async function filterTimeDeposit(
  current_savings,
  net_income,
  risk_appetite,
  goal_time_horizon
) {
  try {
    const goal_time_horizon_days = goal_time_horizon * 31;
    const amount = (net_income + current_savings) * risk_appetite;

    const allAccounts = await pb
      .collection("auto_renew_time_deposits")
      .getFullList();

    const affordableAccounts = allAccounts.filter(
      (acc) => Number(acc.daily_balance_for_interest) <= amount
    );

    let bestMatch = null;
    let bestRate = 0;

    affordableAccounts.forEach((acc) => {
      const terms = [35, 63, 91, 182, 365];
      const validTerms = terms.filter((t) => t <= goal_time_horizon_days);

      if (validTerms.length > 0) {
        const chosenTerm = Math.max(...validTerms);
        const rateKey = `${chosenTerm}_days`;
        const chosenRate = Number(acc[rateKey]) || 0;

        if (chosenRate > bestRate) {
          bestMatch = {
            ...acc,
            chosen_term: chosenTerm,
            chosen_rate: chosenRate,
          };
          bestRate = chosenRate;
        }
      }
    });

    return { canIncurInterest: bestMatch ? [bestMatch] : [] };
  } catch (error) {
    console.error("Error filtering time deposits:", error);
    return { canIncurInterest: [] };
  }
}

async function filterRetailTreasuryBonds(
  current_savings,
  net_income,
  risk_appetite
) {
  try {
    const amount = (net_income + current_savings) * risk_appetite;
    const allAccounts = await pb
      .collection("retail_treasury_bonds")
      .getFullList();

    const eligibleBonds = allAccounts.filter(
      (acc) => amount >= Number(acc.initial_deposit) && risk_appetite >= 0.25
    );

    return { canIncurInterest: eligibleBonds };
  } catch (error) {
    console.error("Error filtering treasury bonds:", error);
    return { canIncurInterest: [] };
  }
}

async function filterCreditCards(monthly_income) {
  try {
    const allAccounts = await pb.collection("credit_cards").getFullList();
    const annual_income = monthly_income * 12;

    const eligibleCards = allAccounts.filter(
      (acc) => annual_income >= Number(acc.min_annual_income)
    );

    return { canIncurInterest: eligibleCards };
  } catch (error) {
    console.error("Error filtering credit cards:", error);
    return { canIncurInterest: [] };
  }
}

// LLM Integration
async function parseFinancialAdvice(llmResponse) {
  try {
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
    // Return fallback response
    return {
      insights: {
        emergency_fund_warning: "Unable to generate insights at this time",
        overall_recommendation: "Please consult with a financial advisor",
      },
      recommended_products: [],
    };
  }
}

async function askFinancialAdvice(userProfile) {
  try {
    const context = `
      User Profile:
      - Age: ${userProfile.age}
      - Employment: ${userProfile.employment_status}
      - Monthly Income: ${userProfile.monthly_income}
      - Other Income: ${userProfile.other_income}
      - Monthly Expenses: ${userProfile.monthly_expenses}
      - Current Savings: ${userProfile.current_savings}
      - Current Debt: ${userProfile.current_debt}
      - Goal: ${userProfile.goal}
      - Goal Amount: ${userProfile.goal_amount}
      - Time Horizon: ${userProfile.goal_time_horizon} months
      - Risk Appetite: ${userProfile.risk_appetite}
      
      Financial Metrics:
      - Net Income: ${userProfile.net_income}
      - Debt Load Ratio: ${userProfile.debt_load_ratio}
      - Emergency Fund: ${userProfile.emergency_fund}
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

      Use this context: ${context}

      Your job:
        1. If the client’s emergency fund is less than 3–6 months of their expenses, clearly warn them in plain language that this is risky and should be their first priority before considering longer-term or locked products.
        2. Recommend the top 1–3 products from the provided eligible lists that best help the client reach their goal. If no products are suitable, return an empty list and explain why.
        3. Always check the final recommended products against the provided product lists before answering. If something does not match exactly, do not include it.
        4. Avoid sounding overly certain. If there are trade-offs or limits to the recommendation, briefly mention them in plain language (e.g., “This works well if you can keep the money untouched, but it won’t help if you need quick access”).
        5. Provide short, digestible explanations that clearly connect the advice to the client’s numbers (savings, income, expenses, time horizon, risk appetite). Show *why* the recommendation fits, not just *what* it is.

    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return await parseFinancialAdvice(response.text());
  } catch (error) {
    console.error("LLM Error:", error);
    return {
      insights: {
        emergency_fund_warning: "Unable to analyze emergency fund status",
        overall_recommendation:
          "Technical error occurred. Please try again or consult a financial advisor.",
      },
      recommended_products: [],
    };
  }
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: "connected", // You could add actual DB health check here
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BPI WAIS Server running on port ${PORT}`);
  console.log(`📍 API endpoints:`);
  console.log(`   POST /api/analyze - Financial analysis`);
  console.log(`   GET  /api/health  - Health check`);
});
