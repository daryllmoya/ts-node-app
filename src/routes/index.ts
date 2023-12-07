import { format } from "date-fns";
import express from "express";

import utilsRoutes from "./utils.route";

import { testData } from "../constants/data.constants";
import {
  actuatorEndpointMsg,
  rootEndpointMsg,
} from "../constants/messages.constants";
import { parseAddressData } from "../utils/common.utils";

const router = express.Router();

// Root endpoint
router.get("/", (req, res) => {
  res.status(200).json({
    message: rootEndpointMsg,
  });
});

// Actuator endpoint
router.get("/actuator", (req, res) => {
  res.status(200).json({ status: actuatorEndpointMsg });
});

// Use the routes from individual files
router.use("/utils", utilsRoutes);

export default router;
