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
      name: "Puma Running Shoes",
      category: "Men",
      price: 4299,
      image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/380005/01/sv01/fnd/IND/fmt/png",
      description: "Lightweight and breathable running shoes for men."
    },
    {
      name: "Levi's Denim Jacket",
      category: "Men",
      price: 2999,
      image: "https://www.thevintagetwin.com/cdn/shop/products/39411_batch12_9926.jpg?v=1676329245&width=823",
      description: "Classic blue denim jacket for a rugged look."
    },
    {
      name: "Boat Bluetooth Headphones",
      category: "Men",
      price: 1499,
      image: "https://m.media-amazon.com/images/I/61KNJav3S9L._SX679_.jpg",
      description: "Wireless headphones with deep bass and 20h battery."
    },
    {
      name: "Raymond Formal Shirt",
      category: "Men",
      price: 1899,
      image: "https://myraymond.com/cdn/shop/files/RMSV12716-N7-1.jpg?v=1725603881",
      description: "Premium white shirt perfect for meetings and events."
    },
    {
      name: "Campus Casual Sneakers",
      category: "Men",
      price: 999,
      image: "https://www.rsole.in/cdn/shop/products/15_7ae1ee36-acf3-4950-bec5-56ee664a4d40_1024x1024@2x.jpg?v=1673967227",
      description: "Trendy black sneakers for everyday wear."
    },
    {
      name: "Peach Silk Saree",
      category: "Women",
      price: 2799,
      image: "https://www.raetrends.com/cdn/shop/files/RAE-Trends-Peach-Banarasi-Silk-Kanjivaram-Saree-1.jpg?v=1711339127&width=823",
      description: "Elegant peach silk saree with floral design."
    },
    {
      name: "Biba Anarkali Kurta Set",
      category: "Women",
      price: 3199,
      image: "https://images.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw2b220389/images/aw21/skd7670aw21ligrn_1.jpg?sw=502&sh=753",
      description: "Traditional anarkali set with dupatta and churidar."
    },
    {
      name: "Nike Sports Shoes",
      category: "Women",
      price: 1495,
      image: "https://5.imimg.com/data5/SELLER/Default/2021/9/CU/NF/GX/138056956/whatsapp-image-2021-09-16-at-1-23-23-pm-1-jpeg-1000x1000.jpeg",
      description: "High-impact support for active workouts and gym."
    },
    {
      name: "Vero Moda Midi Dress",
      category: "Women",
      price: 1799,
      image: "https://assets.ajio.com/medias/sys_master/root/20230628/fYkM/649bbeedeebac147fc1ec112/-473Wx593H-465935148-black-MODEL.jpg",
      description: "Chic floral printed midi dress for outings and brunch."
    },
    {
      name: "H&M Basic Tee Pack",
      category: "Women",
      price: 899,
      image: "https://image.hm.com/assets/hm/9d/c9/9dc9233f9a9364ff3eac5ef2078545cb492045e5.jpg?imwidth=768",
      description: "Pack of 2 soft cotton t-shirts for daily use."
    },
    {
      name: "Kids Unicorn Hoodie",
      category: "Kids",
      price: 1099,
      image: "https://m.media-amazon.com/images/I/71JuRFPEQtL._SX679_.jpg",
      description: "Cute unicorn printed hoodie for girls."
    },
    {
      name: "Kids Marvel Avengers Set",
      category: "Kids",
      price: 999,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/action-figure/v/a/f/3-marvel-avengers-super-hero-action-figure-toy-set-for-kids-original-imagqmzftefvfxkh.jpeg?q=70&crop=false",
      description: "Superhero tee & shorts set for boys."
    },
    {
      name: "Kids Dinosaur Pajamas",
      category: "Kids",
      price: 699,
      image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/1/1118581an6321_1.jpg?rnd=20200526195200&tr=w-512",
      description: "Comfy cotton nightwear with dino prints."
    },
    {
      name: "Frozen Elsa School Bag",
      category: "Kids",
      price: 899,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTAXfTz7EkgwSQFr7-gtF0SEncMm6ogSwyM6VlhLBN02LGUIG92F541gKm39wjmfz87LJ4ML-oYFgstzW1BiqfffKZQRR0KoK7-whsmrre-l6_v8jTCs6-HTg",
      description: "Stylish school bag with Elsa print and side bottle holder."
    },
    
    {
      name: "Men's Analog Watch - Titan",
      category: "Men",
      price: 2249,
      image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwf55a821f/images/Titan/Catalog/90177TM02_1.jpg?sw=600&sh=600",
      description: "Premium leather strap watch with classic dial."
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
