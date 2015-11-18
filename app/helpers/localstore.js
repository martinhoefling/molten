const LocalStorage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    get(key) {
        try {
            return JSON.parse(localStorage[key]);
        } catch (exc) {
            console.log(`Error loading local store key ${key} `, exc);
            return null;
        }
    },

    clear() {
        localStorage.clear();
    }
};

export default LocalStorage;
