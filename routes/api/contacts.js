const express = require('express');
const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');
const Joi = require('joi');

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'Not Found')
    }
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newContact = req.body;
    const { error } = addSchema.validate(newContact);
    if (error) {
      console.log(error)
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(newContact);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
     if (!result) {
      throw HttpError(404, 'Not Found')
    }
    res.status(200).json({message: "contact deleted"})
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = req.body;
    const { error } = addSchema.validate(updateContact);
    if (error) {
      console.log(error)
      throw HttpError(400, error.message)
    }
    const result = await contacts.updateContact(contactId, updateContact);
    if (!result) {
      throw HttpError(404, 'Not Found')
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
