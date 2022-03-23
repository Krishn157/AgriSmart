import asyncHandler from "express-async-handler";
import Contract from "../models/contractModel.js";

// @desc Create new contract
// @route POST /api/contracts
// @acccess Private/Contractor
const addContract = asyncHandler(async (req, res) => {
  const { farmerId, landId, contractAmt } = req.body;

  const contract = new Contract({
    contractorId: req.user._id,
    farmerId,
    landId,
    contractAmt,
  });

  const createdContract = await contract.save();

  res.status(201).json(createdContract);
});

// @desc Get contract by ID
// @route GET /api/contracts/:id
// @acccess Private
const getContractById = asyncHandler(async (req, res) => {
  const contract = await Contract.findById(req.params.id)
    .populate("farmerId", "name email")
    .populate("contractorId", "name email")
    .populate("landId");
  if (contract) {
    res.json(contract);
  } else {
    res.status(404);
    throw new Error("Contract not found");
  }
});

// @desc Get logged in contractor contracts
// @route GET /api/contracts/contractor
// @acccess Private/contractor
const getContractorContracts = asyncHandler(async (req, res) => {
  const contracts = await Contract.find({ contractorId: req.user._id })
    .populate("farmerId", "name email")
    .populate("contractorId", "name email")
    .populate("landId");
  res.json(contracts);
});

// @desc Get logged in contractor contracts
// @route GET /api/contracts/farmer
// @acccess Private/farmer
const getFarmerContracts = asyncHandler(async (req, res) => {
  const contracts = await Contract.find({ farmerId: req.user._id })
    .populate("farmerId", "name email")
    .populate("contractorId", "name email")
    .populate("landId");
  res.json(contracts);
});

// @desc Get Contract of a land
// @route GET /api/contracts/lands/:id
// @acccess Private/farmer
const getLandContract = asyncHandler(async (req, res) => {
  const contract = await Contract.findOne({ landId: req.params.id })
    .populate("farmerId", "name email")
    .populate("contractorId", "name email")
    .populate("landId");
  res.json(contract);
});

export {
  addContract,
  getContractById,
  getContractorContracts,
  getFarmerContracts,
  getLandContract,
};
