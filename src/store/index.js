const local = require("./local");
const spaces = require("./spaces");

const getStore = (store = "local") => {
  if (store === "local") {
    return local;
  } else if (store === "spaces") {
    return spaces;
  }
};

const add = (stream, store) => {
  const module = getStore(store);
  return module.add(stream);
};

const remove = (id, store) => {
  const module = getStore(store);
  return module.remove(id);
};

const list = (store) => {
  const module = getStore(store);
  return module.list();
};

module.exports = {
  add,
  remove,
  list,
};
