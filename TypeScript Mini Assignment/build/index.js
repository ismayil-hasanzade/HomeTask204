"use strict";
function setStorage(key, value) {
    if (key != "string") {
        throw new Error("Value string deyil");
    }
    if (typeof value != "string") {
        localStorage.setItem(key, JSON.stringify(value));
    }
    else {
        localStorage.setItem(key, value);
    }
}
function getStorage(key) {
    let item = localStorage.getItem(key);
    if ((item === null || item === void 0 ? void 0 : item.startsWith("[")) || (item === null || item === void 0 ? void 0 : item.startsWith("{")) || item == "undefined") {
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
function removeStorage(key) {
    localStorage.removeItem(key);
}
function clearAll() {
    localStorage.clear();
}
