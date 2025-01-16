// Section.js
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;       // e.g., initialCards
    this._renderer = renderer; // callback function that creates & returns DOM node
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  addItem(element) {
    // Prepend or append, your choice:
    this._container.prepend(element);
  }
}
