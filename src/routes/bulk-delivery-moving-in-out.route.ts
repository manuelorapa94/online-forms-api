import express from "express";
const router = express.Router();

import BDMioCtrl from "../controllers/bulk-delivery-moving-in-out.controller";

router.post("/v1", BDMioCtrl.createBulkDeliveryMovingInOut);
router.put("/v1/status/:id([0-9a-fA-F]{24})", BDMioCtrl.updateBulkDeliveryMovingInOutStatus);
router.get("/v1/all", BDMioCtrl.getAllBulkDeliveryMovingInOut);
router.get("/v1/:id([0-9a-fA-F]{24})", BDMioCtrl.getBulkDeliveryMovingInOutById);

export default router;