/**
 * seed/menuData.js
 * Complete menu data extracted from the frontend data/index.js.
 * Used by seed/index.js to populate the MenuItem collection.
 *
 * Maps frontend fields to the MenuItem schema:
 *   cat  → category
 *   desc → description
 *   best → bestSeller
 */

const menuData = [
  // ── COMBOS ──────────────────────────────────────────────────
  { name:'Mini Craving Combo',      category:'combos',       price:79,  rating:4.9, description:'Cold Coffee + 2 Garlic Bread',                    emoji:'🎁', bestSeller:true  },
  { name:'Classic Coffee Break',    category:'combos',       price:89,  rating:4.8, description:'Cappuccino + Veg Sandwich',                        emoji:'☕', bestSeller:false },
  { name:'Student Saver',           category:'combos',       price:99,  rating:5.0, description:'Veg Burger + Small Fries',                         emoji:'🍔', bestSeller:true  },
  { name:'Veg Patty Wrap Combo',    category:'combos',       price:99,  rating:4.8, description:'Veg Patty Wrap + Coke',                            emoji:'🌯', bestSeller:false },
  { name:'Veg Burger Meal',         category:'combos',       price:109, rating:4.8, description:'Veg Burger + Coke',                                emoji:'🍔', bestSeller:false },
  { name:'Fries Lover',             category:'combos',       price:119, rating:4.7, description:'Peri Peri Fries + Coke',                           emoji:'🍟', bestSeller:false },

  // ── BURGERS ─────────────────────────────────────────────────
  { name:'Classic Veg',             category:'burgers',      price:69,  rating:4.7, description:'Classic veg patty with fresh veggies & sauce',     emoji:'🍔', bestSeller:false },
  { name:'Premium Veg',             category:'burgers',      price:89,  rating:4.8, description:'Premium veg patty, extra toppings & house sauce',   emoji:'🍔', bestSeller:false },
  { name:'Classic Paneer Patty',    category:'burgers',      price:99,  rating:4.8, description:'Crispy paneer patty, fresh lettuce, house sauce',   emoji:'🍔', bestSeller:false },
  { name:'Special Nachos Burger',   category:'burgers',      price:110, rating:4.8, description:'Crunchy nachos layered inside with paneer patty',   emoji:'🍔', bestSeller:false },
  { name:'Double Paneer Blast',     category:'burgers',      price:119, rating:4.9, description:'Double paneer patty, cheese, jalapeños, sauce',     emoji:'🍔', bestSeller:true  },
  { name:'Makhni Paneer Patty',     category:'burgers',      price:119, rating:4.9, description:'Rich makhni-flavoured paneer patty burger',         emoji:'🍔', bestSeller:true  },
  { name:'Double Patty Burger',     category:'burgers',      price:129, rating:4.9, description:'Two juicy patties, cheese, pickles, special sauce', emoji:'🍔', bestSeller:false },
  { name:'Cheese Bomb',             category:'burgers',      price:139, rating:4.9, description:'Oozing cheese-filled patty, toasted bun',           emoji:'🍔', bestSeller:false },
  { name:'Jalapeno Cheese',         category:'burgers',      price:139, rating:4.8, description:'Spicy jalapeños, cheese, tangy sauce',              emoji:'🍔', bestSeller:false },
  { name:'BlockBuster',             category:'burgers',      price:169, rating:5.0, description:'Our biggest burger — loaded with everything!',      emoji:'🍔', bestSeller:true  },

  // ── PASTA ───────────────────────────────────────────────────
  { name:'White Sauce Pasta',       category:'pasta',        price:159, rating:5.0, description:'Creamy béchamel, garlic & herbs — guest favourite', emoji:'🍝', bestSeller:true  },
  { name:'Red Sauce Pasta',         category:'pasta',        price:159, rating:4.8, description:'Classic tangy tomato arrabbiata sauce',              emoji:'🍝', bestSeller:false },
  { name:'Pink Sauce Pasta',        category:'pasta',        price:169, rating:4.9, description:'Creamy pink sauce — blend of red & white',          emoji:'🍝', bestSeller:true  },
  { name:'Jalapeno Sauce Pasta',    category:'pasta',        price:169, rating:4.8, description:'Spicy jalapeño-infused creamy sauce',                emoji:'🍝', bestSeller:false },
  { name:'Makhni Sauce Pasta',      category:'pasta',        price:169, rating:4.8, description:'Rich Indian makhni twist on classic pasta',          emoji:'🍝', bestSeller:false },

  // ── WRAPS ───────────────────────────────────────────────────
  { name:'Veg Patty Wrap',          category:'wraps',        price:110, rating:4.7, description:'Crispy veg patty, fresh veggies, house sauce',       emoji:'🌯', bestSeller:false },
  { name:'Premium Patty Wrap',      category:'wraps',        price:119, rating:4.8, description:'Premium patty, cheese, lettuce, tomato',             emoji:'🌯', bestSeller:false },
  { name:'Paneer Patty Wrap',       category:'wraps',        price:129, rating:4.8, description:'Crispy paneer patty wrapped with fresh veggies',     emoji:'🌯', bestSeller:false },
  { name:'Peri Peri Paneer Patty',  category:'wraps',        price:139, rating:4.9, description:'Spicy peri peri paneer patty wrap',                  emoji:'🌯', bestSeller:false },
  { name:'Paneer Wrap',             category:'wraps',        price:149, rating:4.8, description:'Soft paneer, onions, peppers, mint chutney',         emoji:'🌯', bestSeller:false },
  { name:'Exotic Veggies Wrap',     category:'wraps',        price:159, rating:4.8, description:'Grilled exotic vegetables, cheese & house spread',   emoji:'🌯', bestSeller:false },

  // ── HOT DOG ─────────────────────────────────────────────────
  { name:'Veg Hotdog',              category:'hotdog',       price:89,  rating:4.7, description:'Classic veg hotdog with mustard & ketchup',          emoji:'🌭', bestSeller:false },
  { name:'Special Patty Hotdog',    category:'hotdog',       price:99,  rating:4.8, description:'Loaded special patty hotdog with toppings',          emoji:'🌭', bestSeller:false },
  { name:'Paneer Patty Hotdog',     category:'hotdog',       price:110, rating:4.8, description:'Crispy paneer patty in a toasted hotdog bun',        emoji:'🌭', bestSeller:false },

  // ── INDO-CHINESE ────────────────────────────────────────────
  { name:'Homestyle Chilli Potato', category:'indo-chinese', price:139, rating:4.8, description:'Crispy potatoes in homestyle chilli sauce',           emoji:'🥡', bestSeller:false },
  { name:'Honey Chilli Potato',     category:'indo-chinese', price:139, rating:4.9, description:'Sweet & spicy honey chilli glazed potatoes',          emoji:'🥡', bestSeller:true  },
  { name:'Chilli Cauliflower',      category:'indo-chinese', price:169, rating:4.8, description:'Crispy cauliflower in chilli sauce',                  emoji:'🥡', bestSeller:false },
  { name:'Chilli Paneer (Dry)',     category:'indo-chinese', price:179, rating:4.9, description:'Crispy paneer tossed in spicy chilli sauce',          emoji:'🥡', bestSeller:false },
  { name:'Chilli Paneer (Gravy)',   category:'indo-chinese', price:189, rating:4.9, description:'Paneer in rich gravy chilli sauce',                   emoji:'🥡', bestSeller:false },
  { name:'Peri Peri Paneer Tikka',  category:'indo-chinese', price:199, rating:4.9, description:'Paneer tikka with fiery peri peri marinade',          emoji:'🥡', bestSeller:true  },
  { name:'Cheese Paneer Tikka',     category:'indo-chinese', price:199, rating:4.9, description:'Cheesy paneer tikka, perfectly grilled',              emoji:'🥡', bestSeller:false },

  // ── SANDWICHES ──────────────────────────────────────────────
  { name:'Butter Toast',            category:'sandwiches',   price:49,  rating:4.5, description:'Classic buttered toast, crisp & warm',               emoji:'🥪', bestSeller:false },
  { name:'Classic Veg Sandwich',    category:'sandwiches',   price:99,  rating:4.7, description:'Fresh veggies, cheese & house spread',               emoji:'🥪', bestSeller:false },
  { name:'Corn Sandwich',           category:'sandwiches',   price:110, rating:4.8, description:'Sweet corn with cheese & herbs, grilled',            emoji:'🥪', bestSeller:false },
  { name:'Paneer Sandwich',         category:'sandwiches',   price:139, rating:4.8, description:'Soft paneer, mint chutney, grilled to perfection',   emoji:'🥪', bestSeller:false },
  { name:'Mushroom & Cheese',       category:'sandwiches',   price:149, rating:4.9, description:'Sautéed mushrooms, melted cheese, grilled bread',    emoji:'🥪', bestSeller:true  },
  { name:'Special Veg with Exotic Veggies', category:'sandwiches', price:159, rating:4.9, description:'Exotic grilled veggies with cheese & spread',  emoji:'🥪', bestSeller:false },

  // ── GARLIC BREAD ────────────────────────────────────────────
  { name:'Plain Garlic Bread',      category:'garlic-bread', price:89,  rating:4.7, description:'Classic buttery garlic bread, crispy baked',         emoji:'🧄', bestSeller:false },
  { name:'Cheese Garlic Bread',     category:'garlic-bread', price:129, rating:4.9, description:'Loaded with melted cheese, garlic butter',           emoji:'🧄', bestSeller:true  },
  { name:'Paneer, Corn & Cheese',   category:'garlic-bread', price:139, rating:4.9, description:'Paneer, sweet corn & cheese on garlic bread',        emoji:'🧄', bestSeller:true  },
  { name:'Mushroom & Cheese',       category:'garlic-bread', price:139, rating:4.9, description:'Sautéed mushrooms & melted cheese on garlic bread',  emoji:'🧄', bestSeller:false },

  // ── MAGGI ───────────────────────────────────────────────────
  { name:'Masala Maggi',            category:'maggi',        price:69,  rating:4.7, description:'Classic spiced masala Maggi noodles',                emoji:'🍜', bestSeller:false },
  { name:'Veggies Loaded Maggi',    category:'maggi',        price:79,  rating:4.8, description:'Maggi loaded with fresh veggies',                    emoji:'🍜', bestSeller:false },
  { name:'Cheese Loaded Maggi',     category:'maggi',        price:99,  rating:4.9, description:'Gooey cheese melted over classic Maggi',             emoji:'🍜', bestSeller:true  },
  { name:'Paneer Masala Maggi',     category:'maggi',        price:99,  rating:4.9, description:'Paneer cubes in spiced masala Maggi',                emoji:'🍜', bestSeller:false },
  { name:'Veg Loaded Maggi',        category:'maggi',        price:110, rating:4.8, description:'Fully loaded veggie Maggi bowl',                     emoji:'🍜', bestSeller:false },

  // ── FRIES ───────────────────────────────────────────────────
  { name:'Classic Sea Salt Fries',  category:'fries',        price:89,  rating:4.7, description:'Golden crispy fries with sea salt',                  emoji:'🍟', bestSeller:false },
  { name:'Peri Peri Fries',         category:'fries',        price:129, rating:4.9, description:'Crispy fries dusted with peri peri spice',           emoji:'🍟', bestSeller:true  },
  { name:'Pizza Fries',             category:'fries',        price:139, rating:4.8, description:'Fries topped with pizza sauce & cheese',             emoji:'🍟', bestSeller:false },
  { name:'Cheese Loaded Fries',     category:'fries',        price:139, rating:4.9, description:'Fries drowned in melted cheese sauce',               emoji:'🍟', bestSeller:true  },
  { name:'Jalapeno Cheese Loaded',  category:'fries',        price:139, rating:4.8, description:'Spicy jalapeños & cheese on crispy fries',           emoji:'🍟', bestSeller:false },
  { name:'Extra Cheese Loaded',     category:'fries',        price:149, rating:4.9, description:'Extra extra cheese over golden fries',               emoji:'🍟', bestSeller:false },
  { name:'Monster Fries',           category:'fries',        price:179, rating:4.9, description:'Massive portion — fully loaded monster fries',       emoji:'🍟', bestSeller:false },
  { name:'Premium Crisper',         category:'fries',        price:199, rating:5.0, description:'Premium thick-cut extra crispy fries',               emoji:'🍟', bestSeller:false },

  // ── SNACKS ──────────────────────────────────────────────────
  { name:'Baby Spring Roll',        category:'snacks',       price:139, rating:4.8, description:'Crispy mini spring rolls with dipping sauce',        emoji:'🧆', bestSeller:false },
  { name:'Cheese Corn Triangle',    category:'snacks',       price:149, rating:4.9, description:'Crispy triangles filled with cheese & corn',         emoji:'🧆', bestSeller:true  },
  { name:'Onion Rings',             category:'snacks',       price:149, rating:4.8, description:'Golden battered onion rings',                        emoji:'🧆', bestSeller:false },
  { name:'Veggie Finger',           category:'snacks',       price:149, rating:4.8, description:'Crispy vegetable fingers with dip',                  emoji:'🧆', bestSeller:false },
  { name:'Pizza Pocket',            category:'snacks',       price:179, rating:4.8, description:'Stuffed pizza pocket, crispy & cheesy',              emoji:'🧆', bestSeller:false },

  // ── NACHOS ──────────────────────────────────────────────────
  { name:'Nachos with Dip',         category:'nachos',       price:99,  rating:4.7, description:'Crunchy nachos served with house dip',               emoji:'🫔', bestSeller:false },
  { name:'Cheese Nachos',           category:'nachos',       price:139, rating:4.9, description:'Nachos smothered in warm cheese sauce',              emoji:'🫔', bestSeller:true  },
  { name:'Fries v/s Nachos',        category:'nachos',       price:149, rating:4.8, description:'Best of both worlds — fries & nachos platter',       emoji:'🫔', bestSeller:false },

  // ── PROTEIN CORNER ──────────────────────────────────────────
  { name:'Spinach Paneer Wrap',     category:'protein',      price:149, rating:4.8, description:'Protein-rich spinach & paneer whole wheat wrap',     emoji:'💪', bestSeller:false },
  { name:'Whole Wheat Paneer Wrap', category:'protein',      price:149, rating:4.8, description:'Healthy whole wheat wrap with paneer filling',       emoji:'💪', bestSeller:false },
  { name:'Black Bean Paneer Wrap',  category:'protein',      price:159, rating:4.9, description:'Power-packed black bean & paneer protein wrap',      emoji:'💪', bestSeller:false },
  { name:'Paneer Salad',            category:'protein',      price:189, rating:4.9, description:'Fresh paneer salad with veggies & dressing',         emoji:'💪', bestSeller:false },
  { name:'Classic Vanilla Shake',   category:'protein',      price:179, rating:4.8, description:'Protein-rich classic vanilla flavour shake',         emoji:'🥛', bestSeller:false },
  { name:'Brownie Blast Shake',     category:'protein',      price:179, rating:4.9, description:'Brownie flavoured protein shake',                    emoji:'🥛', bestSeller:false },
  { name:'Oreo Crunch Shake',       category:'protein',      price:179, rating:4.9, description:'Oreo flavoured protein shake',                       emoji:'🥛', bestSeller:false },
  { name:'KitKat Crumble Shake',    category:'protein',      price:179, rating:4.9, description:'KitKat flavoured protein shake',                     emoji:'🥛', bestSeller:false },
  { name:'Rich Chocolate Shake',    category:'protein',      price:179, rating:4.9, description:'Rich chocolate protein shake',                       emoji:'🥛', bestSeller:false },

  // ── FRAPPE ──────────────────────────────────────────────────
  { name:'Cold Coffee',             category:'frappe',       price:119, rating:4.8, description:'Classic chilled cold coffee frappe',                 emoji:'🧋', bestSeller:false },
  { name:'Choco Frappe',            category:'frappe',       price:139, rating:4.9, description:'Rich chocolate blended frappe',                      emoji:'🧋', bestSeller:true  },
  { name:'Hazelnut Frappe',         category:'frappe',       price:139, rating:4.9, description:'Smooth hazelnut frappe with whipped cream',          emoji:'🧋', bestSeller:true  },
  { name:'Tiramisu Frappe',         category:'frappe',       price:139, rating:4.9, description:'Italian-inspired tiramisu flavoured frappe',         emoji:'🧋', bestSeller:false },
  { name:'Cheesecake Cassata',      category:'frappe',       price:139, rating:4.9, description:'Indulgent cheesecake cassata frappe',                emoji:'🧋', bestSeller:false },
  { name:'Caramel Frappe',          category:'frappe',       price:139, rating:4.8, description:'Sweet caramel blended frappe',                       emoji:'🧋', bestSeller:false },
  { name:'Brownie Frappe',          category:'frappe',       price:139, rating:4.9, description:'Fudgy brownie flavoured frappe',                     emoji:'🧋', bestSeller:false },
  { name:'Roasted Hazelnut',        category:'frappe',       price:139, rating:4.8, description:'Deep roasted hazelnut frappe',                       emoji:'🧋', bestSeller:false },

  // ── ICED COFFEE ─────────────────────────────────────────────
  { name:'Classic Vanilla Iced',    category:'iced-coffee',  price:129, rating:4.8, description:'Chilled vanilla iced coffee',                        emoji:'☕', bestSeller:false },
  { name:'Hazelnut Iced Coffee',    category:'iced-coffee',  price:129, rating:4.8, description:'Smooth hazelnut iced coffee',                        emoji:'☕', bestSeller:false },
  { name:'Tiramisu Iced Coffee',    category:'iced-coffee',  price:129, rating:4.9, description:'Italian tiramisu style iced coffee',                 emoji:'☕', bestSeller:false },
  { name:'Cheesecake Cassata Iced', category:'iced-coffee',  price:129, rating:4.8, description:'Cheesecake cassata iced coffee',                     emoji:'☕', bestSeller:false },
  { name:'Caramel Iced Coffee',     category:'iced-coffee',  price:129, rating:4.8, description:'Sweet caramel iced coffee',                          emoji:'☕', bestSeller:false },
  { name:'Mocha Iced Coffee',       category:'iced-coffee',  price:129, rating:4.9, description:'Rich mocha iced coffee',                             emoji:'☕', bestSeller:true  },

  // ── HOT COFFEE ──────────────────────────────────────────────
  { name:'Cappuccino',              category:'hot-coffee',   price:79,  rating:4.7, description:'Classic frothy cappuccino',                          emoji:'☕', bestSeller:false },
  { name:'Hazelnut Latte',          category:'hot-coffee',   price:139, rating:4.8, description:'Smooth hazelnut latte',                              emoji:'☕', bestSeller:false },
  { name:'Caramel Latte',           category:'hot-coffee',   price:139, rating:4.9, description:'Sweet caramel latte',                                emoji:'☕', bestSeller:true  },
  { name:'Tiramisu Latte',          category:'hot-coffee',   price:139, rating:4.9, description:'Italian tiramisu latte',                             emoji:'☕', bestSeller:false },
  { name:'Vanilla Latte',           category:'hot-coffee',   price:139, rating:4.8, description:'Creamy classic vanilla latte',                       emoji:'☕', bestSeller:false },

  // ── THICK SHAKES ────────────────────────────────────────────
  { name:'Vanilla Shake',           category:'thick-shakes', price:99,  rating:4.7, description:'Classic thick vanilla milkshake',                    emoji:'🥤', bestSeller:false },
  { name:'Chocolate Shake',         category:'thick-shakes', price:119, rating:4.8, description:'Rich thick chocolate milkshake',                     emoji:'🥤', bestSeller:false },
  { name:'Strawberry Shake',        category:'thick-shakes', price:119, rating:4.8, description:'Fresh strawberry thick shake',                       emoji:'🥤', bestSeller:false },
  { name:'Oreo Shake',              category:'thick-shakes', price:129, rating:4.9, description:'Thick blended Oreo milkshake',                       emoji:'🥤', bestSeller:true  },
  { name:'KitKat Shake',            category:'thick-shakes', price:129, rating:4.9, description:'Blended KitKat thick shake',                         emoji:'🥤', bestSeller:false },
  { name:'Butterscotch Shake',      category:'thick-shakes', price:129, rating:4.8, description:'Creamy butterscotch thick shake',                    emoji:'🥤', bestSeller:false },
  { name:'Black Currant Shake',     category:'thick-shakes', price:129, rating:4.8, description:'Black currant thick shake',                          emoji:'🥤', bestSeller:false },
  { name:'Blueberry Shake',         category:'thick-shakes', price:129, rating:4.8, description:'Fresh blueberry thick shake',                        emoji:'🥤', bestSeller:false },
  { name:'Brownie Shake',           category:'thick-shakes', price:129, rating:4.9, description:'Fudgy brownie blended thick shake',                  emoji:'🥤', bestSeller:false },
  { name:'Special Nutella Hazelnut',category:'thick-shakes', price:149, rating:4.9, description:'Indulgent Nutella hazelnut thick shake',              emoji:'🥤', bestSeller:true  },
  { name:'Special Ferrero Rocher',  category:'thick-shakes', price:189, rating:5.0, description:'Premium Ferrero Rocher thick shake',                  emoji:'🥤', bestSeller:false },

  // ── MOCKTAILS ───────────────────────────────────────────────
  { name:'Fresh Lime Soda',         category:'mocktails',    price:99,  rating:4.8, description:'Zesty fresh lime with soda',                         emoji:'🍹', bestSeller:false },
  { name:'Fruit Beer',              category:'mocktails',    price:99,  rating:4.8, description:'Refreshing fruit beer mocktail',                     emoji:'🍹', bestSeller:false },
  { name:'Virgin Mojito',           category:'mocktails',    price:99,  rating:4.9, description:'Classic mint & lime virgin mojito',                  emoji:'🍹', bestSeller:true  },
  { name:'Green Apple',             category:'mocktails',    price:99,  rating:4.9, description:'Unique green apple mocktail — must try!',            emoji:'🍏', bestSeller:true  },
  { name:'Grenadine',               category:'mocktails',    price:99,  rating:4.7, description:'Sweet grenadine mocktail',                           emoji:'🍹', bestSeller:false },
  { name:'Strawberry Mocktail',     category:'mocktails',    price:99,  rating:4.8, description:'Fresh strawberry mocktail',                          emoji:'🍹', bestSeller:false },
  { name:'Raspberry',               category:'mocktails',    price:99,  rating:4.7, description:'Tangy raspberry mocktail',                           emoji:'🍹', bestSeller:false },
  { name:'Passion Fruit',           category:'mocktails',    price:99,  rating:4.8, description:'Exotic passion fruit mocktail',                      emoji:'🍹', bestSeller:false },
  { name:'Monday Blue',             category:'mocktails',    price:99,  rating:4.7, description:'Refreshing blue coloured mocktail',                  emoji:'🍹', bestSeller:false },
  { name:'Blue Berry Mocktail',     category:'mocktails',    price:99,  rating:4.7, description:'Sweet blueberry mocktail',                           emoji:'🍹', bestSeller:false },
  { name:'Tropical Peach',          category:'mocktails',    price:99,  rating:4.8, description:'Tropical peach mocktail',                            emoji:'🍹', bestSeller:false },

  // ── CHAI ────────────────────────────────────────────────────
  { name:'Elaichi Chai',            category:'chai',         price:30,  rating:4.8, description:'Fragrant cardamom chai',                             emoji:'🍵', bestSeller:false },
  { name:'Masala Chai',             category:'chai',         price:40,  rating:4.9, description:'Spiced masala chai — warming & comforting',          emoji:'🍵', bestSeller:true  },

  // ── ICED TEA ────────────────────────────────────────────────
  { name:'Lemon Iced Tea',          category:'iced-tea',     price:110, rating:4.8, description:'Refreshing chilled lemon iced tea',                  emoji:'🧊', bestSeller:false },
  { name:'Peach Iced Tea',          category:'iced-tea',     price:110, rating:4.8, description:'Sweet chilled peach iced tea',                       emoji:'🧊', bestSeller:false },

  // ── DESSERTS ────────────────────────────────────────────────
  { name:'Seven Texture Pastry',    category:'desserts',     price:129, rating:4.9, description:'7 layers of indulgent textures in one pastry',       emoji:'🎂', bestSeller:true  },
  { name:'Truffle Chocolate Pastry',category:'desserts',     price:129, rating:4.9, description:'Rich truffle chocolate pastry',                      emoji:'🍫', bestSeller:false },
  { name:'Brownie Sundae',          category:'desserts',     price:119, rating:4.9, description:'Warm brownie with vanilla ice cream & chocolate sauce',emoji:'🍨',bestSeller:true },
  { name:'Oreo Sundae',             category:'desserts',     price:119, rating:4.9, description:'Oreo cookie ice cream sundae',                       emoji:'🍨', bestSeller:false },
  { name:'KitKat Sundae',           category:'desserts',     price:129, rating:4.9, description:'KitKat ice cream sundae',                            emoji:'🍨', bestSeller:false },
  { name:'Nutella Sundae',          category:'desserts',     price:149, rating:5.0, description:'Rich Nutella ice cream sundae',                      emoji:'🍨', bestSeller:false },
  { name:'Rocher Sundae',           category:'desserts',     price:199, rating:5.0, description:'Premium Ferrero Rocher ice cream sundae',            emoji:'🍨', bestSeller:false },
  { name:'Blueberry Waffle',        category:'desserts',     price:169, rating:5.0, description:'Belgian waffle with blueberry compote & ice cream',  emoji:'🧇', bestSeller:true  },
  { name:'Brownie Bomb Waffle',     category:'desserts',     price:169, rating:5.0, description:'Belgian waffle with brownie bomb & ice cream',       emoji:'🧇', bestSeller:false },
  { name:'Oreo Waffle',             category:'desserts',     price:169, rating:4.9, description:'Belgian waffle with Oreo crumble & ice cream',       emoji:'🧇', bestSeller:false },
  { name:'KitKat Waffle',           category:'desserts',     price:169, rating:4.9, description:'Belgian waffle with KitKat & ice cream',             emoji:'🧇', bestSeller:false },
  { name:'Ferrero Rocher Explosion',category:'desserts',     price:199, rating:5.0, description:'Belgian waffle with Ferrero Rocher & ice cream',     emoji:'🧇', bestSeller:false },
  { name:'Blueberry Pancake',       category:'desserts',     price:139, rating:4.8, description:'Fluffy pancakes with blueberry compote',             emoji:'🥞', bestSeller:false },
  { name:'Brownie Pancake',         category:'desserts',     price:139, rating:4.9, description:'Fluffy pancakes with brownie chunks',                emoji:'🥞', bestSeller:false },
  { name:'Nutella Pancake',         category:'desserts',     price:149, rating:4.9, description:'Fluffy pancakes with Nutella drizzle',               emoji:'🥞', bestSeller:true  },
  { name:'Nutella Brownie Pancake', category:'desserts',     price:159, rating:5.0, description:'Fluffy pancakes with Nutella & brownie — ultimate!', emoji:'🥞', bestSeller:false },
]

module.exports = menuData
