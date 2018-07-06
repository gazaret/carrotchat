export default class StorageService {
  constructor($window) {
    this.$window = $window;
  }

  /**
   * Сохранение в хранилище
   * @param {string} key ключ
   * @param {any} value значение
   */
  set(key, value) {
    this.$window.localStorage.setItem(key, value);
  }

  /**
   * Получение из хранилища
   * @param {string} key ключ
   * @param {any} defaultValue значение по умолчанию
   */
  get(key, defaultValue) {
    return this.$window.localStorage.getItem(key) || defaultValue;
  }

  /**
   * Сохранение объекта в хранилище
   * @param {string} key ключ
   * @param {object} value значение
   */
  setObject(key, value) {
    this.set(key, JSON.stringify(value));
  }

  /**
   * Получение объекта из хранилища
   * @param {*} key ключ
   * @param {*} defaultValue значение по умолчанию
   */
  getObject(key, defaultValue = '{}') {
    return JSON.parse(this.get(key, defaultValue));
  }

  /**
   * Удаление элемента из хранилища
   * @param {string} key ключ
   */
  remove(key) {
    this.$window.localStorage.removeItem(key);
  }

  /**
   * Очищение хранилища
   */
  clear() {
    this.$window.localStorage.clear();
  }
}