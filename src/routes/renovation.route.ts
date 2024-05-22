import express from "express";
const router = express.Router();

import RenovationCtrl from "../controllers/renovation.controller";

router.post("/v1", RenovationCtrl.createRenovation);
router.get("/v1/all", RenovationCtrl.getAllRenovation);
router.get("/v1/:id([0-9a-fA-F]{24})", RenovationCtrl.getRenovationById);
router.put("/v1/status/:id([0-9a-fA-F]{24})", RenovationCtrl.updateRenovationStatus);

export default router;
