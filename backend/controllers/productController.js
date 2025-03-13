import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to  add product
async function addProduct(req, res) {
  // to add the product we will create a middleware by using MULTER so that if we send any file as formData so that file will be parse using MULTER
  try {
    // first we will get all the product details from req.body
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // we need to get the products images which we will get from req.files
    // console.log(req);
    // const image1 = req.files.image1 && req.files.image1[0];
    // const image2 = req.files.image2 && req.files.image2[0];
    // const image3 = req.files.image3 && req.files.image3[0];
    // const image4 = req.files.image4 && req.files.image4[0];

    const image1 = req.files?.image1?.[0] || undefined;
    const image2 = req.files?.image2?.[0] || undefined;
    const image3 = req.files?.image3?.[0] || undefined;
    const image4 = req.files?.image4?.[0] || undefined;

    // const image1 = req.files.image1[0];
    // const image2 = req.files.image2[0];
    // const image3 = req.files.image3[0];
    // const image4 = req.files.image4[0];
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    // we need to store this images in cloudinary and then will get url for all the images which we can store in database

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });

        return result.secure_url;
      })
    );

    // console.log(name, description, price, category, subCategory, sizes, bestseller);
    // console.log(imageUrl);

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imageUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// Function to  list/get product
async function listProduct(req, res) {
  try {
    // create products variable where will store the productsData
    const products = await productModel.find({});
    // find method returns an ARRAY
    console.log(Array.isArray(products));

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}

// Function to remove product
async function removeProduct(req, res) {}

// Function to single product info
async function singleProduct(req, res) {}

export { addProduct, listProduct, removeProduct, singleProduct };
