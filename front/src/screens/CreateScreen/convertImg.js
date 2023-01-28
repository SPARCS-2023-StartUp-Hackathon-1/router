import heic2any from "heic2any";

const convertImg = async (image) => {
  try {
    if (!image) return null;
    if (/^image\/heic$/i.test(image.type)) {
      image = await heic2any({ blob: image, toType: "image/jpg" });
    }
    return image;
  } catch (e) {
    // FIXME
    return null;
  }
};

export default convertImg;
