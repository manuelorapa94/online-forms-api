import express from "express";
const router = express.Router();

import OnlineFormsCtrl from "../controllers/online-forms.controller";

router.get("/v1/all", OnlineFormsCtrl.displayAllFormsSent);
router.get("/v1/notapproved", OnlineFormsCtrl.getOnlineFormsByStatusFalse);
router.get("/v1/approved", OnlineFormsCtrl.getOnlineFormsByStatusTrue);
router.get("/v1/resident/:id([0-9a-fA-F]{24})", OnlineFormsCtrl.getOnlineFormsByResidentId);
router.get("/v1/:id([0-9a-fA-F]{24})", OnlineFormsCtrl.getOnlineFormsById);
router.get("/v1", OnlineFormsCtrl.getByPageSearch);

export default router;
