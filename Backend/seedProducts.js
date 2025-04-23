const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {

  console.log("Connected to MongoDB");

  const products = [
    {
      name: "Nike Air Max",
      category: "Men",
      price: 4999,
      image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/q/s/m/-original-imah46k9d3wgdz26.jpeg?q=90&crop=false",
      description: "Comfortable sports shoes for men."
    },
    {
      name: "Zara Heels",
      category: "Women",
      price: 2499,
      image: "https://assetscdn1.paytm.com/images/catalog/product/F/FO/FOOFLAT-N-HEELSFLAT69822D5E10BF4/1564587160454_0..jpg?imwidth=320&impolicy=hq",
      description: "Elegant high heels for women."
    },
    {
      name: "Kids T-shirt",
      category: "Kids",
      price: 899,
      image: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/22009020/2024/3/19/28c4c50d-c962-4fc7-b7b8-1338d988ca961710827077560-YK-Disney-Boys-Mickey-Mouse-Printed-Holi-T-shirt-53117108270-1.jpg",
      description: "Colorful and comfy tee for kids."
    },
    {
        name: "Kids Cartoon T-shirt",
        category: "Kids",
        price: 899,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTESpPe9gYjwpImWkY0Yr_evJATV1pjGfY3-A&s",
        description: "Colorful and comfy tee for kids."
      }, {
        name: "Kids  T-shirt",
        category: "Kids",
        price: 899,
        image: "https://i.ebayimg.com/images/g/aNEAAOSw-QtfgSjF/s-l400.jpg",
        description: "Colorful and comfy tee for kids."
      }, {
        name: "shirt",
        category: "Kids",
        price: 790,
        image: "https://cuteandcool.co.in/cdn/shop/files/dino-car-tee-357557.jpg?v=1715238763",
        description: "Colorful and comfy tee for kids."
      },
      {
        name: "shirt",
        category: "Kids",
        price: 348,
        image: "https://assets.ajio.com/medias/sys_master/root/20240604/O6qR/665f001c05ac7d77bb9bc2bb/-473Wx593H-700041966-multi-MODEL.jpg",
        description: "Colorful and comfy tee for kids."
      },
      {
        name: "Kids  T-shirt",
        category: "Kids",
        price: 970,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXLwf6hoqkIs0t-UPTICaAvwm08qY_Ozq1w&s",
        description: "Colorful and comfy tee for kids."
      },
      {
        name: "Kids Cartoon T-shirt",
        category: "Kids",
        price: 230,
        image: "https://store.swarajyamag.com/cdn/shop/files/Little_Krishna_-_Kids_T-shirt_green.png?v=1739361968",
        description: "Colorful and comfy tee for kids."
      },
      {
        name: "T-shirt",
        category: "Kids",
        price: 200,
        image: "https://www.motherchoice.in/cdn/shop/files/5mc15.png?v=1721105488",
        description: "Colorful and comfy tee for kids."
      },
      {
        name: "30-day-Gromming-Kit",
        category: "Men",
        price: 1978,
        image: "https://www.themancompany.com/cdn/shop/files/30-day-groomingkit-Primary-Images.jpg?v=1686808318",
        description: "Keep your A-game on throughout the festive season! Our 30-Day Grooming Kit has everything that you need to make a statement for all your celebrations.."
      },
      {
        name: "SandStone ComfortCraft Trousers",
        category: "Men",
        price: 1997,
        image: "https://www.panamerica.studio/cdn/shop/files/0A0A8670.jpg?v=1721279665&width=533",
        description: "hese trousers offer a perfect blend of comfort and sophistication."
      },
      {
        name: "men black slim fit hooded casual shirt",
        category: "Men",
        price: 499,
        image: "https://img0.junaroad.com/uiproducts/15651705/zoom_0-1715923646.jpg",
        description: "Be a head turner by wearing this casual shirt from Geum and grab it in black colour.."
      },
      {
        name: "men regular fit floral printed short sleeves casual shirt",
        category: "Men",
        price: 999,
        image: "https://img0.junaroad.com/uiproducts/21577192/zoom_0-1728905820.jpg",
        description: "Bored of the conventional shirt look? Well, these casual shirts in graceful neck designs and short sleeves will give you a whole new dimension!."
      },
      {
        name: "men printed short sleeve casual shirt",
        category: "Men",
        price: 499,
        image: "https://img0.junaroad.com/uiproducts/21578662/zoom_0-1728976363.jpg",
        description: "Showcase this top in wonderful prints and wear it for different occasions.."
      },
     
      {
        name: "Maharani Bandhani Green Saree",
        category: "Women",
        price: 2499,
        image: "https://www.urbanwardrobe.in/cdn/shop/products/1_134bbef8-db2c-44df-a676-22d261cc87a7.jpg?v=1678845100&width=713",
        description: " This stylish bandhani green printed georgette saree comes with a blouse piece."
      },
      {
        name: "Kanjivaram Jacquard ",
        category: "Women",
        price: 2499,
        image: "https://m.media-amazon.com/images/I/51p3ueMs3eL._SX522_.jpg",
        description: "Fabric: Soft Silk, Blouse Fabric : Soft Silk. Work: Jacquard Woven Stylish Sari, Zari Woven.."
      },
      {
        name: " PARTY WEAR",
        category: "Women",
        price: 2499,
        image: "https://thelibas.com/wp-content/uploads/2022/06/17255.jpg",
        description: "Showcase this Dress in wonderful prints and wear it for different occasions."
      },
      {
        name: "Ethrnic Wears",
        category: "Women",
        price: 2996,
        image: "https://www.lavanyathelabel.com/cdn/shop/files/1_eb7dccc7-cb9a-4a54-a36e-9fbb32da21ed_1200x.jpg?v=1740035363",
        description: "Best Fabric Qualuty for women."
      },
      {
        name: "Western Wear",
        category: "Women",
        price: 759,
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTwQyTa-z41mb_hW5Z48AkLW2zDpxW1ygDiW-onLtHCNpT4t_RL5jsdDLVIw-rKLao2XwNMxaptIeGD6_EFUg_c18bi86YD2Pmz4buDNYW8vTi-w8EA3nftZw",
        description: "Elegant Qualityfor women."
      },
    

  ];

  await Product.deleteMany(); // Optional: clear existing products
  await Product.insertMany(products);

  console.log("Sample products inserted!");
  process.exit();
}).catch(err => {
  console.error("MongoDB connection failed:", err);
  process.exit(1);
});
