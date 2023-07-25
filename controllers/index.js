const {
  getListContacts,
  getContactByID,
  addNewContact,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("./contacts");

const {register, login, getCurrent, logout } = require('./users')

module.exports = {
  getListContacts,
  getContactByID,
  addNewContact,
  deleteContact,
  changeContact,
  updateStatusContact,
  register,
  login,
  getCurrent,
  logout, 
};
