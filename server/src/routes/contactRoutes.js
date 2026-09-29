import express from "express";
import {
  submitContact,
  getContacts,
  markRead,
  deleteContact,
} from "../controllers/contactController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(submitContact).get(protect, getContacts);
router.patch("/:id/read", protect, markRead);
router.delete("/:id", protect, deleteContact);

export default router;