import sharp from "sharp";

export const compressImage = async (buffer, size) => {
  const image = await sharp(buffer)
    .resize(size, null)
    .webp({ quality: 80 })
    .toBuffer();
  const uint8Array = new Uint8Array(image);
  return uint8Array 
}