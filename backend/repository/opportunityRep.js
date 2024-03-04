const Opportunity = require('../models/opportunityModel');
const { logger } = require('../logger');

const getAllOpportunities = async () => {
  const opportunities = await Opportunity.find();
  logger.info(opportunities.length ? `Fetched ${opportunities.length} opportunities.` : 'No opportunities found.');
  return opportunities;
};

const getItemByName = async (name) => {
  const item = await Item.findOne({ item_name: name });
  logger.info(`looking for item: ${name}`)
  if (item) {
    logger.info(`item found: ${name}`);
  } else {
    logger.info(`item could not be found: ${name}`);
  }
  return item;
};

const createItem = async (itemData) => {
  const newItem = new Supply(itemData);
  await newItem.save();
  if (newItem) {
    logger.info(`Item created: ${newItem.item_name}`);
  }
  else {
    logger.info('Item could not be created');
  }
  return newitem;
};

const updateItem = async (name, itemData) => {
  const updatedItem = await Item.findOneAndUpdate({ item_name: name }, itemData, { new: true, runValidators: true });
  if (updatedItem) {
    logger.info(`Item updated: ${name}`);
  }
  else {
    logger.info('Item could not be updated');
  }
  return updatedItem;
};

const deleteItem = async (name) => {
  const deletedItem = await Item.findOneAndDelete({ item_name: name });
  if (deletedItem) {
    logger.info(`Item deleted: ${name}`);
  }
  else {
    logger.info('Item could not be deleted');
  }
  return deletedItem;
};

module.exports = {
  getAllOpportunities,
  getItemByName,
  createItem,
  updateItem,
  deleteItem
};