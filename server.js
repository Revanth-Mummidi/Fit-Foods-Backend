import dotenv from "dotenv";
import express from "express";
import database from "./config/database.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import foodRouter from "./routes/foodRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import cors from "cors";

dotenv.config();
database();

const App = express();

App.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

App.use(express.json());
App.use(cookieParser());

App.get("/api", (req, res) => {
  res.send("Working...");
});

App.use("/api/users", userRouter);
App.use("/api/foods", foodRouter);
App.use("/api/categories", categoriesRouter);


App.get("/api/all-allergies", (req, res) => {
  return res
    .status(200)
    .json([
      "Peanuts",
      "Tree nuts (such as almonds, cashews, walnuts)",
      "Milk",
      "Eggs",
      "Soy",
      "Wheat",
      "Fish",
      "Shellfish (such as shrimp, crab, lobster)",
      "Sesame seeds",
      "Sulfites",
      "Mustard",
      "Corn",
      "Gluten",
      "Lactose",
      "Shellfish",
      "Chocolate",
      "Soybeans",
      "Pollen-food syndrome (oral allergy syndrome)",
      "Citrus fruits",
      "Meat",
      "Garlic",
      "Onions",
      "Berries",
      "Tomatoes",
      "Bananas",
      "Apples",
      "Strawberries",
      "Grapes",
      "Avocado",
      "Mangoes",
      "Kiwi",
      "Pineapple",
      "Papaya",
      "Melons",
      "Coconut",
      "Cinnamon",
      "Spices",
      "Artificial food coloring",
      "Monosodium glutamate (MSG)",
      "Artificial sweeteners (such as aspartame, saccharin)",
      "High-fructose corn syrup",
      "Sulfur dioxide",
      "Benzoic acid",
      "Tartrazine",
      "BHA/BHT",
      "Nitrates/Nitrites",
      "Polysorbate 80",
      "Trans fats",
      "Caffeine",
      "Alcohol",
      "Histamine (histamine intolerance)",
      "Salicylates",
      "FODMAPs (Fermentable Oligosaccharides, Disaccharides, Monosaccharides and Polyols)",
      "Glutamates",
    ]);
});
App.get("/api/all-health-issues", (req, res) => {
  return res
    .status(200)
    .json([
      "High blood pressure",
      "Diabetes",
      "Heart disease",
      "Obesity",
      "Asthma",
      "Arthritis",
      "Depression",
      "Anxiety",
      "Cancer",
      "Stroke",
      "Chronic obstructive pulmonary disease (COPD)",
      "Alzheimer's disease",
      "Parkinson's disease",
      "HIV/AIDS",
      "Hepatitis",
      "Influenza (flu)",
      "Malaria",
      "Tuberculosis (TB)",
      "Schizophrenia",
      "Bipolar disorder",
      "Epilepsy",
      "Multiple sclerosis (MS)",
      "Chronic fatigue syndrome (CFS)",
      "Fibromyalgia",
      "Autism spectrum disorder (ASD)",
      "Down syndrome",
      "Celiac disease",
      "Crohn's disease",
      "Ulcerative colitis",
      "Psoriasis",
      "Lupus",
      "Sickle cell disease",
    ]);
});

App.use((error, req, res, next) => {
  console.log(error, error.message);
  return res.status(400).json({ message: "internal server error" });
});

App.listen(8000, () => {
  console.log("Server is running at PORT", 8000);
});

App.get("/", (req, res) => {
  res.send("Hello");
});
