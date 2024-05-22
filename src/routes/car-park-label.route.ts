import express from "express";
const router = express.Router();

import CarParkLabelCtrl from "../controllers/car-park-label.controller";

router.post("/v1", CarParkLabelCtrl.createCarParkLabel);
router.put("/v1/status/:id([0-9a-fA-F]{24})", CarParkLabelCtrl.updateCarParkLabelStatus);
router.get("/v1/all", CarParkLabelCtrl.getAllCarParkLabel);
router.get("/v1/:id([0-9a-fA-F]{24})", CarParkLabelCtrl.getCarParkLabelById);

export default router;
