module.exports = class FieldSize {
  constructor(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  height() {
    return this.height;
  }

  width() {
    return this.width;
  }

  depth() {
    return this.depth;
  }

  isWithinField(h, x, y) {
    return h >= 0 && h <= this.depth && (x >= 0 && x <= this.width && y >= 0 && y <= this.height);
  }
}