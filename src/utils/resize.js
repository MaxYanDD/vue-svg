export default {
  lt: function({ imsX, imsY, nmsX, nmsY, x, y, width, height }) {
    x += nmsX - imsX;
    y += nmsY - imsY;
    width -= nmsX - imsX;
    height -= nmsY - imsY;

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
  ct: function({ imsX, imsY, nmsX, nmsY, x, y, width, height }) {
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
  rt: function({ imsX, imsY, nmsX, nmsY, x, y, width, height }) {
    width += nmsX - imsX;
    y += nmsY - imsY;
    height-=nmsY - imsY

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
  lm: function({ imsX, imsY, nmsX, nmsY, x, y, width, height }) {
    x += nmsX - imsX;
    width -= nmsX - imsX;

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
  rm: function({ imsX, imsY, nmsX, nmsY, x, y, width, height }) {
    width += nmsX - imsX;

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
  lb: function({ imsX, imsY, nmsX, nmsY, x, y, width, height }) {
    height += nmsY - imsY;
    x+=nmsX - imsX
    width -= nmsX - imsX;
    
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
  cb: function({ imsX, imsY, nmsX, nmsY, x, y, width, height }) {
    height += nmsY - imsY;

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
  rb: function({ imsX, imsY, nmsX, nmsY, x, y, width, height }) {
    width += nmsX - imsX;
    height += nmsY - imsY;

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
