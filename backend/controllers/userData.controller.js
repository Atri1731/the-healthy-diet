const UserData = require("../models/userData.model");

const getUserData = async (req, res) => {
  try {
    let userData = await UserData.findOne({
      user: req.user.userId,
    }).lean();

    if (!userData) {
      userData = {
        cartItems: [],
        favorites: [],
      };
    }

    return res.status(200).json({
      success: true,
      data: {
        cartItems: userData.cartItems || [],
        favorites: userData.favorites || [],
      },
    });
  } catch (error) {
    console.error("Get user data error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not load your saved shopping data",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({
        success: false,
        message: "cartItems must be an array",
      });
    }

    const userData = await UserData.findOneAndUpdate(
      { user: req.user.userId },
      {
        $set: { cartItems },
        $setOnInsert: { favorites: [] },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Cart saved successfully",
      cartItems: userData.cartItems,
    });
  } catch (error) {
    console.error("Update cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not save your cart",
    });
  }
};

const updateFavorites = async (req, res) => {
  try {
    const { favorites } = req.body;

    if (!Array.isArray(favorites)) {
      return res.status(400).json({
        success: false,
        message: "favorites must be an array",
      });
    }

    const userData = await UserData.findOneAndUpdate(
      { user: req.user.userId },
      {
        $set: { favorites },
        $setOnInsert: { cartItems: [] },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Favorites saved successfully",
      favorites: userData.favorites,
    });
  } catch (error) {
    console.error("Update favorites error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not save your favorites",
    });
  }
};

module.exports = {
  getUserData,
  updateCart,
  updateFavorites,
};