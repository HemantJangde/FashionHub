import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
const DEFAULT_IMAGE = "https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0=";


// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock } = req.body;

    if (!name || !price || !countInStock) {
      return res.status(400).json({ message: "Name, price, and stock are required" });
    }

    // Upload to Cloudinary if file exists
    const imageUrl = req.file
      ? (await uploadToCloudinary(req.file.buffer)).secure_url
      : DEFAULT_IMAGE;

    const product = await Product.create({
      name,
      description: description || "",
      price: Number(price),
      category: category || "General",
      countInStock: Number(countInStock),
      image: imageUrl,
      user: req.user?._id || null,
    });

    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// export const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, countInStock } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Image is required" });
//     }

//     // upload to cloudinary using stream
//     const streamUpload = () => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "products" },
//           (error, result) => {
//             if (result) resolve(result);
//             else reject(error);
//           }
//         );
//         streamifier.createReadStream(req.file.buffer).pipe(stream);
//       });
//     };

//     const result = await streamUpload();

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       countInStock,
//       image: result.secure_url,
//     });

//     res.status(201).json(product);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// ✅ GET ALL PRODUCTS
// export const getProducts = async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// };

// ✅ GET SINGLE PRODUCT
// export const getProductById = async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product) {
//     res.json(product);
//   } else {
//     res.status(404).json({ message: "Product not found" });
//   }
// };

// ✅ UPDATE PRODUCT (ADMIN)
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, countInStock } = req.body;
    // console.log(req.file.buffer);
    

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

     if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      product.image = result.secure_url;
    }


    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE PRODUCT (ADMIN)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
