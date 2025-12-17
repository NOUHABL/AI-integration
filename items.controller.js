const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/items.json");

const readItems = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

const writeItems = (items) => {
  fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));
};

exports.getAllItems = (req, res) => {
  const items = readItems();
  res.json(items);
};

exports.getItemById = (req, res) => {
  const items = readItems();
  const item = items.find(i => i.id == req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
};

exports.createItem = (req, res) => {
  const items = readItems();

  const newItem = {
    id: Date.now(),
    ...req.body
  };

  items.push(newItem);
  writeItems(items);

  res.status(201).json(newItem);
};

exports.updateItem = (req, res) => {
  const items = readItems();
  const index = items.findIndex(i => i.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  items[index] = { ...items[index], ...req.body };
  writeItems(items);

  res.json(items[index]);
};

exports.deleteItem = (req, res) => {
  const items = readItems();
  const filteredItems = items.filter(i => i.id != req.params.id);

  writeItems(filteredItems);

  res.json({ message: "Item deleted" });
};

