import express from "express";

import { UtilsController } from "../controllers/utils.controller";

const router = express.Router();

router.get("/format-date", UtilsController.formatDate);
router.get("/get-address-data", UtilsController.getAddressData);
router.post("/save-req-res", UtilsController.saveReqRes);

export default router;
