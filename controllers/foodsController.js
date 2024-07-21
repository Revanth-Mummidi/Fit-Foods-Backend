import FoodModel from "../models/FoodModel.js";
import UserModel from "../models/UserModel.js";

export const postFood = async (req, res, next) => {
  try {
    const data = req.body;
    const user = new FoodModel(data);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const getSuggestions = async (req, res, next) => {
  try {
    
    const foodsData = await FoodModel.find().populate("categories");
    const user = await UserModel.findById(req.user._id);
 
    if(!user)
    {
      return res.status(400).json({msg:"User not found"});
    }
    if (!foodsData) {
        return res.status(404).send({ error: 'Food item not found' });
    }
    const userHealthIssues = user.healthIssues || [];
      const userAllergies = user.allergies || [];
    const response=foodsData.map((foods,index)=>{
        const foodHealthIssues = foods.nonConsumableByHealthIssues || [];
        const foodAllergies = foods.nonConsumableByAllergies || [];

        const hasIssue = foodHealthIssues.some(issue => userHealthIssues.includes(issue));
        const hasAllergy = foodAllergies.some(allergy => userAllergies.includes(allergy));

        const consumable = !(hasIssue || hasAllergy);

        const result = {
            ...foods._doc,
            consumable,
        };
        // console.log(result);
        return result;

    })
    // console.log("RES",res);
     
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Category not found" });
  }
};

export const getFood = async (req, res, next) => {
  try {
    const foods = await FoodModel.findById(req.params.id).populate('categories'); 
    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ msg: "food not found" });
  }
};
export const updateFood = async (req, res, next) => {
  try {
    const data = req.body;
    const foods = await FoodModel.findByIdAndUpdate(req.params.id, {
      $set: {
        ...data,
      },
    });
    
    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ msg: "food not found" });
  }
};
export const getFoods = async (req, res, next) => {
    try {
      const { search = "" } = req.query;
      let regex = new RegExp(search, "i");

      const query = {
        $or: [
          { name: regex },
          { desc: regex },
          
        ],
      };
      
    
      const foods = await FoodModel.find(query).populate('categories');
      res.status(200).json(foods);
    } catch (error) {
      res.status(400).json({ msg: "unknown", error: error.message });
    }
  };
  