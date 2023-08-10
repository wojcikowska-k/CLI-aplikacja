import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const result = parsedData.map((contact) => {
      return {
        Name: contact.name,
        Email: contact.email,
        Phone: contact.phone,
      };
    });

    console.table(result);
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);

    const found = parsedData.find((contact) => contact.id === contactId);
    if (found) {
      console.table(found);
    } else {
      console.log("Could not find contact with this id.");
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const found = parsedData.find((contact) => contact.id === contactId);
    const foundIndex = parsedData.indexOf(found);

    if (foundIndex !== -1) {
      parsedData.splice(foundIndex, 1);
      fs.writeFile(contactsPath, JSON.stringify(parsedData, null, 2));

      console.log("Success! The contact has been removed from the database.");
    } else {
      console.log("Could not find contact with this id.");
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    const found = parsedData.find(
      (contact) =>
        contact.name === name &&
        contact.email === email &&
        contact.phone === phone
    );
    const foundIndex = parsedData.indexOf(found);

    if (foundIndex !== -1) {
      console.log(
        "Contact with this name, email and phone is already in the database"
      );
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
      };
      parsedData.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(parsedData, null, 2));
      console.log("Success! Added a new contact to the database.");
    }
  } catch (err) {
    console.log(err.message);
  }
}

export { listContacts, getContactById, removeContact, addContact };
