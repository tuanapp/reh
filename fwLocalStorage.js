// let audioContext;
function init() {
    
}
init();

function saveStringList(list, key, overwrite = false) {
    if (!Array.isArray(list)) throw new TypeError('List must be an array.');
    if (localStorage.getItem(key) && !overwrite) return;
    localStorage.setItem(key, JSON.stringify(list));
  }
  
  function getStringList(key) {
    const storedList = localStorage.getItem(key);
    if (!storedList) return [];
    return JSON.parse(storedList);
  }
  
  function doesStringListExist(key) {
    return localStorage.getItem(key) !== null;
  }
  
  function deleteStringList(key) {
    localStorage.removeItem(key);
  }
  