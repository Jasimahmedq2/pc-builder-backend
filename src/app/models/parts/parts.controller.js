const Parts = require("./parts.model");

const _ = require("lodash");

exports.getAllParts = async (req, res) => {
  try {
    const result = await Parts.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "here was an error" });
  }
};

exports.getSingleParts = async (req, res) => {
  try {
    const result = await Parts.findOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "here was an error" });
  }
};

exports.filterableParts = async (req, res) => {
  try {
    const category = req.query.category?.toLowerCase();

    const query = category
      ? { category: { $regex: new RegExp(category, "i") } }
      : {};

    const products = await Parts.find(query);

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ error: "Error fetching products" });
  }
};

exports.randomPartsProduct = async (req, res) => {
  try {
    const categories = await Parts.distinct("category");

    const shuffledCategories = _.shuffle(categories);

    const selectedCategories = shuffledCategories.slice(0, 6);

    const randomData = [];
    for (const category of selectedCategories) {
      const randomDocument = await Parts.aggregate([
        { $match: { category } },
        { $sample: { size: 1 } },
      ]);

      randomData.push(randomDocument[0]);
    }

    res.json(randomData);
  } catch (err) {
    console.error("Error fetching random categories:", err.message);
    res.status(500).json({ error: "Error fetching random categories" });
  }
};
