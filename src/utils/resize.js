export default {
  lt: function({ imsX, imsY, nmsX, nmsY, x, y, width, height, ratio }) {
    let disX = nmsX - imsX;
    let disY = ratio ? Math.floor(disX * ratio) : nmsY - imsY;

    x += disX;
    y += disY;
    width -= disX;
    height -= disY;

    if (width < 0) {
      x += width;
      width = Math.abs(width);
    }

    if (height < 0) {
      y += height;
      height = Math.abs(height);
    }

    return {
      x,
      y,
      width,
      height
    };
  },
  ct: function({ imsX, imsY, nmsX, nmsY, x, y, width, height, ratio }) {
    let disY = nmsY - imsY;
    let disX = ratio ? Math.floor(disY / ratio) : 0;

    x += Math.floor(disX / 2);
    width -= disX;

    y += nmsY - imsY;
    height -= nmsY - imsY;

    if (height < 0) {
      y += height;
      height = Math.abs(height);
    }
    return {
      x,
      y,
      width,
      height
    };
  },
  rt: function({ imsX, imsY, nmsX, nmsY, x, y, width, height, ratio }) {
    let disX = nmsX - imsX;
    let disY = ratio ? Math.floor(-disX * ratio) : nmsY - imsY;

    width += disX;
    y += disY;
    height -= disY;

    if (width < 0) {
      x += width;
      width = Math.abs(width);
    }

    if (height < 0) {
      y += height;
      height = Math.abs(height);
    }

    return {
      x,
      y,
      width,
      height
    };
  },
  lm: function({ imsX, imsY, nmsX, nmsY, x, y, width, height, ratio }) {
    let disX = nmsX - imsX;
    let disY = ratio ? Math.floor(disX * ratio) : 0;

    x += disX;
    width -= disX;

    y += Math.floor(disY / 2);
    height -= disY;

    if (width < 0) {
      x += width;
      width = Math.abs(width);
    }

    if (height < 0) {
      y += height;
      height = Math.abs(height);
    }
    return {
      x,
      y,
      width,
      height
    };
  },
  rm: function({ imsX, imsY, nmsX, nmsY, x, y, width, height, ratio }) {
    let disX = nmsX - imsX;
    let disY = ratio ? Math.floor(-disX * ratio) : 0;

    width += disX;

    y += Math.floor(disY / 2);
    height -= disY;

    if (width < 0) {
      x += width;
      width = Math.abs(width);
    }

    if (height < 0) {
      y += height;
      height = Math.abs(height);
    }
    return {
      x,
      y,
      width,
      height
    };
  },
  lb: function({ imsX, imsY, nmsX, nmsY, x, y, width, height, ratio }) {
    let disX = nmsX - imsX;
    let disY = ratio ? Math.floor(-disX * ratio) : nmsY - imsY;

    height += disY;
    x += disX;
    width -= disX;

    if (width < 0) {
      x += width;
      width = Math.abs(width);
    }

    if (height < 0) {
      y += height;
      height = Math.abs(height);
    }

    return {
      x,
      y,
      width,
      height
    };
  },
  cb: function({ imsX, imsY, nmsX, nmsY, x, y, width, height, ratio }) {
    let disY = nmsY - imsY;
    let disX = ratio ? Math.floor(-disY / ratio) : 0;

    height += disY;
    x += Math.floor(disX / 2);
    width -= disX;

    if (height < 0) {
      y += height;
      height = Math.abs(height);
    }
    return {
      x,
      y,
      width,
      height
    };
  },
  // 右下resize
  rb: function({ imsX, imsY, nmsX, nmsY, x, y, width, height, ratio }) {
    let disX = nmsX - imsX;
    let disY = ratio ? Math.floor(disX * ratio) : nmsY - imsY;

    width += disX;
    height += disY;

    if (width < 0) {
      x += width;
      width = Math.abs(width);
    }

    if (height < 0) {
      y += height;
      height = Math.abs(height);
    }

    return {
      x,
      y,
      width,
      height
    };
  }
};
