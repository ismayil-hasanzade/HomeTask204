function setStorage(key: string, value: any) {
  if (key != "string") {
    throw new Error("Value string deyil");
  }
  if (typeof value != "string") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
}

function getStorage(key: string) {
  let item = localStorage.getItem(key);
  if (item?.startsWith("[") || item?.startsWith("{") || item == "undefined") {
    return JSON.parse(item);
  }
  if (item == "true") {
    return true;
  }
  if (item == "false") {
    return false;
  }

  return item;
}

function removeStorage(key: string) {
  localStorage.removeItem(key);
}
function clearAll() {
  localStorage.clear();
}
