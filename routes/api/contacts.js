const express = require("express");
const contactsService = require("../../models/contacts");
const { validation } = require("../../middlewares");
const controller = require("../../controllers/contacts-controller");
const schema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
});

router.get("/", controller.getContactsAll);

router.get("/:contactId", controller.getContactById);

router.post("/", validation(schema.schemaAddContact), controller.addContact);

router.delete("/:contactId", controller.removeContact);

router.put(
  "/:contactId",
  validation(schema.schemaUpdateContact),
  controller.updateContact
);

module.exports = router;
