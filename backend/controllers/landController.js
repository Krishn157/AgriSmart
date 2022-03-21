import asyncHandler from "express-async-handler";
import Bid from "../models/bidModel.js";
import Land from "../models/landModel.js";

// @desc Fetch all lands
// @route GET /api/lands
// @acccess Private/Contractor
const getAllLands = asyncHandler(async (req, res) => {
  const ids = await Bid.find({ contractorId: req.user._id }).select("landId");
  const landIds = ids.map((bid) => bid.landId);

  // .map((bid) => bid.landId)
  // .toArray();
  // console.log(ids);
  // console.log(landIds);
  // const lands = await Land.find({}).populate("user", "id name");
  const lands = await Land.find({ _id: { $not: { $in: landIds } } }).populate(
    "user",
    "id name"
  );
  res.json(lands);
});

// @desc Get logged in user lands
// @route GET /api/lands/mylands
// @acccess Private
const getMyLands = asyncHandler(async (req, res) => {
  const lands = await Land.find({ user: req.user._id });
  res.json(lands);
});

// @desc Fetch single land
// @route GET /api/lands/:id
// @acccess Public
const getLandById = asyncHandler(async (req, res) => {
  const land = await Land.findById(req.params.id);
  if (land) {
    res.json(land);
  } else {
    res.status(404);
    throw new Error("Land Not Found !");
  }
});

// @desc    Delete a land
// @route   DELETE /api/lands/:id
// @access  Private/Farmer
const deleteLand = asyncHandler(async (req, res) => {
  const land = await Land.findById(req.params.id);

  if (!land) return res.status(400).json({ msg: "Land not found" });
  if (land.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "User not authorized" });
  }
  await land.remove();
  res.json({ msg: "Land removed" });
});

// @desc    Update a land
// @route   PUT /api/lands/:id
// @access  Private/Farmer
const updateLand = asyncHandler(async (req, res) => {
  const {
    area,
    state,
    district,
    crop,
    season,
    image,
    minBidAmt,
    estProd,
    capitalReturn,
  } = req.body;

  const land = await Land.findById(req.params.id);

  if (land) {
    land.area = area;
    land.state = state;
    land.district = district;
    land.crop = crop;
    land.season = season;
    land.image = image;
    land.minBidAmt = minBidAmt;
    land.estProd = estProd;
    land.capitalReturn = capitalReturn;
    const updatedLand = await land.save();
    res.json(updatedLand);
  } else {
    res.status(404);
    throw new Error("Land not found");
  }
});

// @desc    Create a land
// @route   POST /api/lands
// @access  Private/Farmer
const createLand = asyncHandler(async (req, res) => {
  const land = new Land({
    user: req.user._id,
    area: 0,
    state: "Sample state",
    district: "Sample district",
    crop: "Sample crop",
    season: "Sample season",
    image: "/images/sample.jpg",
    minBidAmt: 0,
    estProd: 0,
    capitalReturn: 0,
  });

  const createdLand = await land.save();
  res.status(201).json(createdLand);
});

export {
  createLand,
  getAllLands,
  getMyLands,
  deleteLand,
  updateLand,
  getLandById,
};