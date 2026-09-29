import Contact from "../models/Contact.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

// POST /api/contact  (public)
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email, and message are required");
  }

  const contact = await Contact.create({ name, email, subject, message });
  res.status(201).json({ message: "Message received", id: contact._id });
});

// GET /api/contact  (admin)
export const getContacts = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.unread === "true") filter.isRead = false;
  if (req.query.archived === "true") filter.isArchived = true;

  const contacts = await Contact.find(filter).sort({ createdAt: -1 });
  res.json(contacts);
});

// PATCH /api/contact/:id/read  (admin)
export const markRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  if (!contact) {
    res.status(404);
    throw new Error("Message not found");
  }
  res.json(contact);
});

// DELETE /api/contact/:id  (admin)
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Message not found");
  }
  res.json({ message: "Message deleted" });
});