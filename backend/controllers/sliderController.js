const Slider = require('../models/Slider');

exports.getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.json({ data: sliders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
