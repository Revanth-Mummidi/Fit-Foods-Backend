import CategoriesModel from "../models/CategoryModel.js";
import FoodModel from "../models/FoodModel.js";
import UserModel from "../models/UserModel.js";

export const postCategory = async (req, res, next) => {
  try {
    const data = req.body;
    const Category = new CategoriesModel(data);
    await Category.save();
    res.status(200).json(Category);
  } catch (error) {
    console.log(error)
    res.status(400).json({ msg: error });
  }
};

export const getCategory = async (req, res, next) => {
  try {
    
    const foodData = await FoodModel.find().populate("categories");
    const user = await UserModel.findById(req.user._id);
    // console.log("FOOD DAta",foodData[0]);
    const foodsData=foodData.filter((item,index)=>{
      if((item.categories[0]._id)==req.params.id)
      {
        return item;
      }
    })
    // console.log(foodsData);
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



export const deleteCategory = async (req, res, next) => {
  try {
    const Category = await CategoriesModel.findByIdAndDelete(req.params.id);
    res.status(200).json(Category);
  } catch (error) {
    res.status(400).json({ msg: "Category not found" });
  }
};
export const updateCategory = async (req, res, next) => {
  try {
    const data = req.body;
    const Category = await CategoriesModel.findByIdAndUpdate(req.params.id, {
      $set: {
        ...data,
      },
    });
    res.status(200).json(Category);
  } catch (error) {
    res.status(400).json({ msg: "Category not found" });
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const Category = await CategoriesModel.find();
    res.status(200).json(Category);
  } catch (error) {
    res.status(400).json({ msg: "unkown" });
  }
};
