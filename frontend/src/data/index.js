export const cafeInfo = {
  name: 'The Craving Hous',
  tagline: 'Where cravings become memories',
  instagram: 'https://instagram.com/thecravinghous',
  instagramHandle: '@thecravinghous',
  mapsUrl: 'https://share.google/rbjDuoKBnzPNi9ByT',
  address: 'Kharar, Punjab, India',
  priceRange: '₹30 – ₹199',
  rating: 5.0,
  reviewCount: 19,
  isOpen: true,
  gstEnabled: false,
  gstRate: 5,
  hours: {
    'Mon – Fri': '04:00 PM – 02:00 AM',
    'Saturday':  '04:00 PM – 04:00 AM',
    'Sunday':    '04:00 PM – 04:00 AM',
  },
  coupons: [
    { code: 'WELCOME10', percent: 10, label: '10% off — Welcome treat!' },
    { code: 'CRAVE20',   percent: 20, label: '20% off your order!'      },
  ],
}

export const categories = [
  { id: 'all',          label: 'All',            emoji: '✦'  },
  { id: 'combos',       label: 'Combos',         emoji: '🎁' },
  { id: 'burgers',      label: 'Burgers',        emoji: '🍔' },
  { id: 'pasta',        label: 'Pasta',          emoji: '🍝' },
  { id: 'wraps',        label: 'Wraps',          emoji: '🌯' },
  { id: 'hotdog',       label: 'Hot Dog',        emoji: '🌭' },
  { id: 'indo-chinese', label: 'Indo-Chinese',   emoji: '🥡' },
  { id: 'sandwiches',   label: 'Sandwiches',     emoji: '🥪' },
  { id: 'garlic-bread', label: 'Garlic Bread',   emoji: '🧄' },
  { id: 'maggi',        label: 'Maggi',          emoji: '🍜' },
  { id: 'fries',        label: 'Fries',          emoji: '🍟' },
  { id: 'snacks',       label: 'Snacks',         emoji: '🧆' },
  { id: 'nachos',       label: 'Nachos',         emoji: '🫔' },
  { id: 'protein',      label: 'Protein Corner', emoji: '💪' },
  { id: 'frappe',       label: 'Frappe',         emoji: '🧋' },
  { id: 'iced-coffee',  label: 'Iced Coffee',    emoji: '☕' },
  { id: 'hot-coffee',   label: 'Hot Coffee',     emoji: '☕' },
  { id: 'thick-shakes', label: 'Thick Shakes',   emoji: '🥤' },
  { id: 'mocktails',    label: 'Mocktails',      emoji: '🍹' },
  { id: 'chai',         label: 'Chai',           emoji: '🍵' },
  { id: 'iced-tea',     label: 'Iced Tea',       emoji: '🧊' },
  { id: 'desserts',     label: 'Desserts',       emoji: '🍮' },
]

// Section groupings for display
export const menuSections = [
  { id: 'combos',       label: '🎁 Pocket Friendly Combos',  cats: ['combos']                                          },
  { id: 'mains',        label: '🍽️ Signature Mains',         cats: ['burgers','pasta','wraps','hotdog','indo-chinese'] },
  { id: 'grills',       label: '🥪 Grills & Bakes',          cats: ['sandwiches','garlic-bread','maggi']               },
  { id: 'sides',        label: '🍟 Crispy Sides',            cats: ['fries','snacks','nachos']                         },
  { id: 'protein',      label: '💪 Protein Corner',          cats: ['protein']                                         },
  { id: 'beverages',    label: '🧋 Beverages',               cats: ['frappe','iced-coffee','hot-coffee','thick-shakes','mocktails','chai','iced-tea'] },
  { id: 'desserts',     label: '🍮 Dessert Delights',        cats: ['desserts']                                        },
]

export const menu = [
  // ── COMBOS ─────────────────────────────────────────────
  { id:'co1',  name:'Mini Craving Combo',      cat:'combos',       price:79,  rating:4.9, desc:'Cold Coffee + 2 Garlic Bread',                    emoji:'🎁', best:true,  hot:false },
  { id:'co2',  name:'Classic Coffee Break',    cat:'combos',       price:89,  rating:4.8, desc:'Cappuccino + Veg Sandwich',                        emoji:'☕', best:false, hot:false },
  { id:'co3',  name:'Student Saver',           cat:'combos',       price:99,  rating:5.0, desc:'Veg Burger + Small Fries',                         emoji:'🍔', best:true,  hot:true  },
  { id:'co4',  name:'Veg Patty Wrap Combo',    cat:'combos',       price:99,  rating:4.8, desc:'Veg Patty Wrap + Coke',                            emoji:'🌯', best:false, hot:false },
  { id:'co5',  name:'Veg Burger Meal',         cat:'combos',       price:109, rating:4.8, desc:'Veg Burger + Coke',                                emoji:'🍔', best:false, hot:false },
  { id:'co6',  name:'Fries Lover',             cat:'combos',       price:119, rating:4.7, desc:'Peri Peri Fries + Coke',                           emoji:'🍟', best:false, hot:false },

  // ── BURGERS ────────────────────────────────────────────
  { id:'b1',  name:'Classic Veg',              cat:'burgers',      price:69,  rating:4.7, desc:'Classic veg patty with fresh veggies & sauce',     emoji:'🍔', best:false, hot:false },
  { id:'b2',  name:'Premium Veg',              cat:'burgers',      price:89,  rating:4.8, desc:'Premium veg patty, extra toppings & house sauce',   emoji:'🍔', best:false, hot:false },
  { id:'b3',  name:'Classic Paneer Patty',     cat:'burgers',      price:99,  rating:4.8, desc:'Crispy paneer patty, fresh lettuce, house sauce',   emoji:'🍔', best:false, hot:false },
  { id:'b4',  name:'Special Nachos Burger',    cat:'burgers',      price:110, rating:4.8, desc:'Crunchy nachos layered inside with paneer patty',   emoji:'🍔', best:false, hot:true  },
  { id:'b5',  name:'Double Paneer Blast',      cat:'burgers',      price:119, rating:4.9, desc:'Double paneer patty, cheese, jalapeños, sauce',     emoji:'🍔', best:true,  hot:true  },
  { id:'b6',  name:'Makhni Paneer Patty',      cat:'burgers',      price:119, rating:4.9, desc:'Rich makhni-flavoured paneer patty burger',         emoji:'🍔', best:true,  hot:false },
  { id:'b7',  name:'Double Patty Burger',      cat:'burgers',      price:129, rating:4.9, desc:'Two juicy patties, cheese, pickles, special sauce', emoji:'🍔', best:false, hot:true  },
  { id:'b8',  name:'Cheese Bomb',              cat:'burgers',      price:139, rating:4.9, desc:'Oozing cheese-filled patty, toasted bun',           emoji:'🍔', best:false, hot:true  },
  { id:'b9',  name:'Jalapeno Cheese',          cat:'burgers',      price:139, rating:4.8, desc:'Spicy jalapeños, cheese, tangy sauce',              emoji:'🍔', best:false, hot:false },
  { id:'b10', name:'BlockBuster',              cat:'burgers',      price:169, rating:5.0, desc:'Our biggest burger — loaded with everything!',      emoji:'🍔', best:true,  hot:true  },

  // ── PASTA ──────────────────────────────────────────────
  { id:'p1',  name:'White Sauce Pasta',        cat:'pasta',        price:159, rating:5.0, desc:'Creamy béchamel, garlic & herbs — guest favourite',  emoji:'🍝', best:true,  hot:true  },
  { id:'p2',  name:'Red Sauce Pasta',          cat:'pasta',        price:159, rating:4.8, desc:'Classic tangy tomato arrabbiata sauce',              emoji:'🍝', best:false, hot:false },
  { id:'p3',  name:'Pink Sauce Pasta',         cat:'pasta',        price:169, rating:4.9, desc:'Creamy pink sauce — blend of red & white',          emoji:'🍝', best:true,  hot:true  },
  { id:'p4',  name:'Jalapeno Sauce Pasta',     cat:'pasta',        price:169, rating:4.8, desc:'Spicy jalapeño-infused creamy sauce',                emoji:'🍝', best:false, hot:true  },
  { id:'p5',  name:'Makhni Sauce Pasta',       cat:'pasta',        price:169, rating:4.8, desc:'Rich Indian makhni twist on classic pasta',          emoji:'🍝', best:false, hot:false },

  // ── WRAPS ──────────────────────────────────────────────
  { id:'w1',  name:'Veg Patty Wrap',           cat:'wraps',        price:110, rating:4.7, desc:'Crispy veg patty, fresh veggies, house sauce',       emoji:'🌯', best:false, hot:false },
  { id:'w2',  name:'Premium Patty Wrap',       cat:'wraps',        price:119, rating:4.8, desc:'Premium patty, cheese, lettuce, tomato',             emoji:'🌯', best:false, hot:false },
  { id:'w3',  name:'Paneer Patty Wrap',        cat:'wraps',        price:129, rating:4.8, desc:'Crispy paneer patty wrapped with fresh veggies',     emoji:'🌯', best:false, hot:false },
  { id:'w4',  name:'Peri Peri Paneer Patty',   cat:'wraps',        price:139, rating:4.9, desc:'Spicy peri peri paneer patty wrap',                  emoji:'🌯', best:false, hot:true  },
  { id:'w5',  name:'Paneer Wrap',              cat:'wraps',        price:149, rating:4.8, desc:'Soft paneer, onions, peppers, mint chutney',         emoji:'🌯', best:false, hot:false },
  { id:'w6',  name:'Exotic Veggies Wrap',      cat:'wraps',        price:159, rating:4.8, desc:'Grilled exotic vegetables, cheese & house spread',   emoji:'🌯', best:false, hot:false },

  // ── HOT DOG ────────────────────────────────────────────
  { id:'hd1', name:'Veg Hotdog',               cat:'hotdog',       price:89,  rating:4.7, desc:'Classic veg hotdog with mustard & ketchup',          emoji:'🌭', best:false, hot:false },
  { id:'hd2', name:'Special Patty Hotdog',     cat:'hotdog',       price:99,  rating:4.8, desc:'Loaded special patty hotdog with toppings',          emoji:'🌭', best:false, hot:false },
  { id:'hd3', name:'Paneer Patty Hotdog',      cat:'hotdog',       price:110, rating:4.8, desc:'Crispy paneer patty in a toasted hotdog bun',        emoji:'🌭', best:false, hot:false },

  // ── INDO-CHINESE ───────────────────────────────────────
  { id:'ic1', name:'Homestyle Chilli Potato',  cat:'indo-chinese', price:139, rating:4.8, desc:'Crispy potatoes in homestyle chilli sauce',           emoji:'🥡', best:false, hot:false },
  { id:'ic2', name:'Honey Chilli Potato',      cat:'indo-chinese', price:139, rating:4.9, desc:'Sweet & spicy honey chilli glazed potatoes',          emoji:'🥡', best:true,  hot:true  },
  { id:'ic3', name:'Chilli Cauliflower',        cat:'indo-chinese', price:169, rating:4.8, desc:'Crispy cauliflower in chilli sauce',                  emoji:'🥡', best:false, hot:false },
  { id:'ic4', name:'Chilli Paneer (Dry)',       cat:'indo-chinese', price:179, rating:4.9, desc:'Crispy paneer tossed in spicy chilli sauce',          emoji:'🥡', best:false, hot:true  },
  { id:'ic5', name:'Chilli Paneer (Gravy)',     cat:'indo-chinese', price:189, rating:4.9, desc:'Paneer in rich gravy chilli sauce',                   emoji:'🥡', best:false, hot:false },
  { id:'ic6', name:'Peri Peri Paneer Tikka',   cat:'indo-chinese', price:199, rating:4.9, desc:'Paneer tikka with fiery peri peri marinade',          emoji:'🥡', best:true,  hot:true  },
  { id:'ic7', name:'Cheese Paneer Tikka',      cat:'indo-chinese', price:199, rating:4.9, desc:'Cheesy paneer tikka, perfectly grilled',              emoji:'🥡', best:false, hot:false },

  // ── SANDWICHES ─────────────────────────────────────────
  { id:'s1',  name:'Butter Toast',             cat:'sandwiches',   price:49,  rating:4.5, desc:'Classic buttered toast, crisp & warm',               emoji:'🥪', best:false, hot:false },
  { id:'s2',  name:'Classic Veg Sandwich',     cat:'sandwiches',   price:99,  rating:4.7, desc:'Fresh veggies, cheese & house spread',               emoji:'🥪', best:false, hot:false },
  { id:'s3',  name:'Corn Sandwich',            cat:'sandwiches',   price:110, rating:4.8, desc:'Sweet corn with cheese & herbs, grilled',            emoji:'🥪', best:false, hot:false },
  { id:'s4',  name:'Paneer Sandwich',          cat:'sandwiches',   price:139, rating:4.8, desc:'Soft paneer, mint chutney, grilled to perfection',   emoji:'🥪', best:false, hot:false },
  { id:'s5',  name:'Mushroom & Cheese',        cat:'sandwiches',   price:149, rating:4.9, desc:'Sautéed mushrooms, melted cheese, grilled bread',    emoji:'🥪', best:true,  hot:true  },
  { id:'s6',  name:'Special Veg with Exotic Veggies', cat:'sandwiches', price:159, rating:4.9, desc:'Exotic grilled veggies with cheese & spread',   emoji:'🥪', best:false, hot:false },

  // ── GARLIC BREAD ───────────────────────────────────────
  { id:'gb1', name:'Plain Garlic Bread',       cat:'garlic-bread', price:89,  rating:4.7, desc:'Classic buttery garlic bread, crispy baked',         emoji:'🧄', best:false, hot:false },
  { id:'gb2', name:'Cheese Garlic Bread',      cat:'garlic-bread', price:129, rating:4.9, desc:'Loaded with melted cheese, garlic butter',           emoji:'🧄', best:true,  hot:true  },
  { id:'gb3', name:'Paneer, Corn & Cheese',    cat:'garlic-bread', price:139, rating:4.9, desc:'Paneer, sweet corn & cheese on garlic bread',        emoji:'🧄', best:true,  hot:false },
  { id:'gb4', name:'Mushroom & Cheese',        cat:'garlic-bread', price:139, rating:4.9, desc:'Sautéed mushrooms & melted cheese on garlic bread',  emoji:'🧄', best:false, hot:false },

  // ── MAGGI ──────────────────────────────────────────────
  { id:'mg1', name:'Masala Maggi',             cat:'maggi',        price:69,  rating:4.7, desc:'Classic spiced masala Maggi noodles',                emoji:'🍜', best:false, hot:false },
  { id:'mg2', name:'Veggies Loaded Maggi',     cat:'maggi',        price:79,  rating:4.8, desc:'Maggi loaded with fresh veggies',                    emoji:'🍜', best:false, hot:false },
  { id:'mg3', name:'Cheese Loaded Maggi',      cat:'maggi',        price:99,  rating:4.9, desc:'Gooey cheese melted over classic Maggi',             emoji:'🍜', best:true,  hot:true  },
  { id:'mg4', name:'Paneer Masala Maggi',      cat:'maggi',        price:99,  rating:4.9, desc:'Paneer cubes in spiced masala Maggi',                emoji:'🍜', best:false, hot:false },
  { id:'mg5', name:'Veg Loaded Maggi',         cat:'maggi',        price:110, rating:4.8, desc:'Fully loaded veggie Maggi bowl',                     emoji:'🍜', best:false, hot:false },

  // ── FRIES ──────────────────────────────────────────────
  { id:'fr1', name:'Classic Sea Salt Fries',   cat:'fries',        price:89,  rating:4.7, desc:'Golden crispy fries with sea salt',                  emoji:'🍟', best:false, hot:false },
  { id:'fr2', name:'Peri Peri Fries',          cat:'fries',        price:129, rating:4.9, desc:'Crispy fries dusted with peri peri spice',           emoji:'🍟', best:true,  hot:true  },
  { id:'fr3', name:'Pizza Fries',              cat:'fries',        price:139, rating:4.8, desc:'Fries topped with pizza sauce & cheese',             emoji:'🍟', best:false, hot:false },
  { id:'fr4', name:'Cheese Loaded Fries',      cat:'fries',        price:139, rating:4.9, desc:'Fries drowned in melted cheese sauce',               emoji:'🍟', best:true,  hot:true  },
  { id:'fr5', name:'Jalapeno Cheese Loaded',   cat:'fries',        price:139, rating:4.8, desc:'Spicy jalapeños & cheese on crispy fries',           emoji:'🍟', best:false, hot:true  },
  { id:'fr6', name:'Extra Cheese Loaded',      cat:'fries',        price:149, rating:4.9, desc:'Extra extra cheese over golden fries',               emoji:'🍟', best:false, hot:false },
  { id:'fr7', name:'Monster Fries',            cat:'fries',        price:179, rating:4.9, desc:'Massive portion — fully loaded monster fries',       emoji:'🍟', best:false, hot:true  },
  { id:'fr8', name:'Premium Crisper',          cat:'fries',        price:199, rating:5.0, desc:'Premium thick-cut extra crispy fries',               emoji:'🍟', best:false, hot:false },

  // ── SNACKS ─────────────────────────────────────────────
  { id:'sn1', name:'Baby Spring Roll',         cat:'snacks',       price:139, rating:4.8, desc:'Crispy mini spring rolls with dipping sauce',        emoji:'🧆', best:false, hot:false },
  { id:'sn2', name:'Cheese Corn Triangle',     cat:'snacks',       price:149, rating:4.9, desc:'Crispy triangles filled with cheese & corn',         emoji:'🧆', best:true,  hot:true  },
  { id:'sn3', name:'Onion Rings',              cat:'snacks',       price:149, rating:4.8, desc:'Golden battered onion rings',                        emoji:'🧆', best:false, hot:false },
  { id:'sn4', name:'Veggie Finger',            cat:'snacks',       price:149, rating:4.8, desc:'Crispy vegetable fingers with dip',                  emoji:'🧆', best:false, hot:false },
  { id:'sn5', name:'Pizza Pocket',             cat:'snacks',       price:179, rating:4.8, desc:'Stuffed pizza pocket, crispy & cheesy',              emoji:'🧆', best:false, hot:false },

  // ── NACHOS ─────────────────────────────────────────────
  { id:'na1', name:'Nachos with Dip',          cat:'nachos',       price:99,  rating:4.7, desc:'Crunchy nachos served with house dip',               emoji:'🫔', best:false, hot:false },
  { id:'na2', name:'Cheese Nachos',            cat:'nachos',       price:139, rating:4.9, desc:'Nachos smothered in warm cheese sauce',              emoji:'🫔', best:true,  hot:true  },
  { id:'na3', name:'Fries v/s Nachos',         cat:'nachos',       price:149, rating:4.8, desc:'Best of both worlds — fries & nachos platter',       emoji:'🫔', best:false, hot:false },

  // ── PROTEIN CORNER ─────────────────────────────────────
  { id:'pm1', name:'Spinach Paneer Wrap',      cat:'protein',      price:149, rating:4.8, desc:'Protein-rich spinach & paneer whole wheat wrap',     emoji:'💪', best:false, hot:false },
  { id:'pm2', name:'Whole Wheat Paneer Wrap',  cat:'protein',      price:149, rating:4.8, desc:'Healthy whole wheat wrap with paneer filling',       emoji:'💪', best:false, hot:false },
  { id:'pm3', name:'Black Bean Paneer Wrap',   cat:'protein',      price:159, rating:4.9, desc:'Power-packed black bean & paneer protein wrap',      emoji:'💪', best:false, hot:false },
  { id:'pm4', name:'Paneer Salad',             cat:'protein',      price:189, rating:4.9, desc:'Fresh paneer salad with veggies & dressing',         emoji:'💪', best:false, hot:false },
  { id:'ps1', name:'Classic Vanilla Shake',    cat:'protein',      price:179, rating:4.8, desc:'Protein-rich classic vanilla flavour shake',         emoji:'🥛', best:false, hot:false },
  { id:'ps2', name:'Brownie Blast Shake',      cat:'protein',      price:179, rating:4.9, desc:'Brownie flavoured protein shake',                    emoji:'🥛', best:false, hot:true  },
  { id:'ps3', name:'Oreo Crunch Shake',        cat:'protein',      price:179, rating:4.9, desc:'Oreo flavoured protein shake',                       emoji:'🥛', best:false, hot:false },
  { id:'ps4', name:'KitKat Crumble Shake',     cat:'protein',      price:179, rating:4.9, desc:'KitKat flavoured protein shake',                     emoji:'🥛', best:false, hot:false },
  { id:'ps5', name:'Rich Chocolate Shake',     cat:'protein',      price:179, rating:4.9, desc:'Rich chocolate protein shake',                       emoji:'🥛', best:false, hot:false },

  // ── FRAPPE ─────────────────────────────────────────────
  { id:'fp1', name:'Cold Coffee',              cat:'frappe',       price:119, rating:4.8, desc:'Classic chilled cold coffee frappe',                 emoji:'🧋', best:false, hot:false },
  { id:'fp2', name:'Choco Frappe',             cat:'frappe',       price:139, rating:4.9, desc:'Rich chocolate blended frappe',                      emoji:'🧋', best:true,  hot:true  },
  { id:'fp3', name:'Hazelnut Frappe',          cat:'frappe',       price:139, rating:4.9, desc:'Smooth hazelnut frappe with whipped cream',          emoji:'🧋', best:true,  hot:false },
  { id:'fp4', name:'Tiramisu Frappe',          cat:'frappe',       price:139, rating:4.9, desc:'Italian-inspired tiramisu flavoured frappe',         emoji:'🧋', best:false, hot:false },
  { id:'fp5', name:'Cheesecake Cassata',       cat:'frappe',       price:139, rating:4.9, desc:'Indulgent cheesecake cassata frappe',                emoji:'🧋', best:false, hot:false },
  { id:'fp6', name:'Caramel Frappe',           cat:'frappe',       price:139, rating:4.8, desc:'Sweet caramel blended frappe',                       emoji:'🧋', best:false, hot:false },
  { id:'fp7', name:'Brownie Frappe',           cat:'frappe',       price:139, rating:4.9, desc:'Fudgy brownie flavoured frappe',                     emoji:'🧋', best:false, hot:true  },
  { id:'fp8', name:'Roasted Hazelnut',         cat:'frappe',       price:139, rating:4.8, desc:'Deep roasted hazelnut frappe',                       emoji:'🧋', best:false, hot:false },

  // ── ICED COFFEE ────────────────────────────────────────
  { id:'ic_1', name:'Classic Vanilla Iced',   cat:'iced-coffee',  price:129, rating:4.8, desc:'Chilled vanilla iced coffee',                        emoji:'☕', best:false, hot:false },
  { id:'ic_2', name:'Hazelnut Iced Coffee',   cat:'iced-coffee',  price:129, rating:4.8, desc:'Smooth hazelnut iced coffee',                        emoji:'☕', best:false, hot:false },
  { id:'ic_3', name:'Tiramisu Iced Coffee',   cat:'iced-coffee',  price:129, rating:4.9, desc:'Italian tiramisu style iced coffee',                 emoji:'☕', best:false, hot:false },
  { id:'ic_4', name:'Cheesecake Cassata Iced',cat:'iced-coffee',  price:129, rating:4.8, desc:'Cheesecake cassata iced coffee',                     emoji:'☕', best:false, hot:false },
  { id:'ic_5', name:'Caramel Iced Coffee',    cat:'iced-coffee',  price:129, rating:4.8, desc:'Sweet caramel iced coffee',                          emoji:'☕', best:false, hot:false },
  { id:'ic_6', name:'Mocha Iced Coffee',      cat:'iced-coffee',  price:129, rating:4.9, desc:'Rich mocha iced coffee',                             emoji:'☕', best:true,  hot:true  },

  // ── HOT COFFEE ─────────────────────────────────────────
  { id:'hc1', name:'Cappuccino',              cat:'hot-coffee',   price:79,  rating:4.7, desc:'Classic frothy cappuccino',                          emoji:'☕', best:false, hot:false },
  { id:'hc2', name:'Hazelnut Latte',          cat:'hot-coffee',   price:139, rating:4.8, desc:'Smooth hazelnut latte',                              emoji:'☕', best:false, hot:false },
  { id:'hc3', name:'Caramel Latte',           cat:'hot-coffee',   price:139, rating:4.9, desc:'Sweet caramel latte',                                emoji:'☕', best:true,  hot:false },
  { id:'hc4', name:'Tiramisu Latte',          cat:'hot-coffee',   price:139, rating:4.9, desc:'Italian tiramisu latte',                             emoji:'☕', best:false, hot:false },
  { id:'hc5', name:'Vanilla Latte',           cat:'hot-coffee',   price:139, rating:4.8, desc:'Creamy classic vanilla latte',                       emoji:'☕', best:false, hot:false },

  // ── THICK SHAKES ───────────────────────────────────────
  { id:'ts1', name:'Vanilla Shake',           cat:'thick-shakes', price:99,  rating:4.7, desc:'Classic thick vanilla milkshake',                    emoji:'🥤', best:false, hot:false },
  { id:'ts2', name:'Chocolate Shake',         cat:'thick-shakes', price:119, rating:4.8, desc:'Rich thick chocolate milkshake',                     emoji:'🥤', best:false, hot:false },
  { id:'ts3', name:'Strawberry Shake',        cat:'thick-shakes', price:119, rating:4.8, desc:'Fresh strawberry thick shake',                       emoji:'🥤', best:false, hot:false },
  { id:'ts4', name:'Oreo Shake',              cat:'thick-shakes', price:129, rating:4.9, desc:'Thick blended Oreo milkshake',                       emoji:'🥤', best:true,  hot:true  },
  { id:'ts5', name:'KitKat Shake',            cat:'thick-shakes', price:129, rating:4.9, desc:'Blended KitKat thick shake',                         emoji:'🥤', best:false, hot:true  },
  { id:'ts6', name:'Butterscotch Shake',      cat:'thick-shakes', price:129, rating:4.8, desc:'Creamy butterscotch thick shake',                    emoji:'🥤', best:false, hot:false },
  { id:'ts7', name:'Black Currant Shake',     cat:'thick-shakes', price:129, rating:4.8, desc:'Black currant thick shake',                          emoji:'🥤', best:false, hot:false },
  { id:'ts8', name:'Blueberry Shake',         cat:'thick-shakes', price:129, rating:4.8, desc:'Fresh blueberry thick shake',                        emoji:'🥤', best:false, hot:false },
  { id:'ts9', name:'Brownie Shake',           cat:'thick-shakes', price:129, rating:4.9, desc:'Fudgy brownie blended thick shake',                  emoji:'🥤', best:false, hot:false },
  { id:'ts10',name:'Special Nutella Hazelnut',cat:'thick-shakes', price:149, rating:4.9, desc:'Indulgent Nutella hazelnut thick shake',              emoji:'🥤', best:true,  hot:true  },
  { id:'ts11',name:'Special Ferrero Rocher',  cat:'thick-shakes', price:189, rating:5.0, desc:'Premium Ferrero Rocher thick shake',                  emoji:'🥤', best:false, hot:false },

  // ── MOCKTAILS ──────────────────────────────────────────
  { id:'mo1', name:'Fresh Lime Soda',         cat:'mocktails',    price:99,  rating:4.8, desc:'Zesty fresh lime with soda',                         emoji:'🍹', best:false, hot:false },
  { id:'mo2', name:'Fruit Beer',              cat:'mocktails',    price:99,  rating:4.8, desc:'Refreshing fruit beer mocktail',                     emoji:'🍹', best:false, hot:false },
  { id:'mo3', name:'Virgin Mojito',           cat:'mocktails',    price:99,  rating:4.9, desc:'Classic mint & lime virgin mojito',                  emoji:'🍹', best:true,  hot:false },
  { id:'mo4', name:'Green Apple',             cat:'mocktails',    price:99,  rating:4.9, desc:'Unique green apple mocktail — must try!',            emoji:'🍏', best:true,  hot:true  },
  { id:'mo5', name:'Grenadine',               cat:'mocktails',    price:99,  rating:4.7, desc:'Sweet grenadine mocktail',                           emoji:'🍹', best:false, hot:false },
  { id:'mo6', name:'Strawberry Mocktail',     cat:'mocktails',    price:99,  rating:4.8, desc:'Fresh strawberry mocktail',                          emoji:'🍹', best:false, hot:false },
  { id:'mo7', name:'Raspberry',               cat:'mocktails',    price:99,  rating:4.7, desc:'Tangy raspberry mocktail',                           emoji:'🍹', best:false, hot:false },
  { id:'mo8', name:'Passion Fruit',           cat:'mocktails',    price:99,  rating:4.8, desc:'Exotic passion fruit mocktail',                      emoji:'🍹', best:false, hot:false },
  { id:'mo9', name:'Monday Blue',             cat:'mocktails',    price:99,  rating:4.7, desc:'Refreshing blue coloured mocktail',                  emoji:'🍹', best:false, hot:false },
  { id:'mo10',name:'Blue Berry Mocktail',     cat:'mocktails',    price:99,  rating:4.7, desc:'Sweet blueberry mocktail',                           emoji:'🍹', best:false, hot:false },
  { id:'mo11',name:'Tropical Peach',          cat:'mocktails',    price:99,  rating:4.8, desc:'Tropical peach mocktail',                            emoji:'🍹', best:false, hot:false },

  // ── CHAI ───────────────────────────────────────────────
  { id:'ch1', name:'Elaichi Chai',            cat:'chai',         price:30,  rating:4.8, desc:'Fragrant cardamom chai',                             emoji:'🍵', best:false, hot:false },
  { id:'ch2', name:'Masala Chai',             cat:'chai',         price:40,  rating:4.9, desc:'Spiced masala chai — warming & comforting',          emoji:'🍵', best:true,  hot:false },

  // ── ICED TEA ───────────────────────────────────────────
  { id:'it1', name:'Lemon Iced Tea',          cat:'iced-tea',     price:110, rating:4.8, desc:'Refreshing chilled lemon iced tea',                  emoji:'🧊', best:false, hot:false },
  { id:'it2', name:'Peach Iced Tea',          cat:'iced-tea',     price:110, rating:4.8, desc:'Sweet chilled peach iced tea',                       emoji:'🧊', best:false, hot:false },

  // ── DESSERTS ───────────────────────────────────────────
  { id:'dt1', name:'Seven Texture Pastry',    cat:'desserts',     price:129, rating:4.9, desc:'7 layers of indulgent textures in one pastry',       emoji:'🎂', best:true,  hot:false },
  { id:'dt2', name:'Truffle Chocolate Pastry',cat:'desserts',     price:129, rating:4.9, desc:'Rich truffle chocolate pastry',                      emoji:'🍫', best:false, hot:false },
  { id:'di1', name:'Brownie Sundae',          cat:'desserts',     price:119, rating:4.9, desc:'Warm brownie with vanilla ice cream & chocolate sauce',emoji:'🍨',best:true, hot:true  },
  { id:'di2', name:'Oreo Sundae',             cat:'desserts',     price:119, rating:4.9, desc:'Oreo cookie ice cream sundae',                       emoji:'🍨', best:false, hot:false },
  { id:'di3', name:'KitKat Sundae',           cat:'desserts',     price:129, rating:4.9, desc:'KitKat ice cream sundae',                            emoji:'🍨', best:false, hot:false },
  { id:'di4', name:'Nutella Sundae',          cat:'desserts',     price:149, rating:5.0, desc:'Rich Nutella ice cream sundae',                      emoji:'🍨', best:false, hot:true  },
  { id:'di5', name:'Rocher Sundae',           cat:'desserts',     price:199, rating:5.0, desc:'Premium Ferrero Rocher ice cream sundae',            emoji:'🍨', best:false, hot:false },
  { id:'dw1', name:'Blueberry Waffle',        cat:'desserts',     price:169, rating:5.0, desc:'Belgian waffle with blueberry compote & ice cream',  emoji:'🧇', best:true,  hot:true  },
  { id:'dw2', name:'Brownie Bomb Waffle',     cat:'desserts',     price:169, rating:5.0, desc:'Belgian waffle with brownie bomb & ice cream',       emoji:'🧇', best:false, hot:false },
  { id:'dw3', name:'Oreo Waffle',             cat:'desserts',     price:169, rating:4.9, desc:'Belgian waffle with Oreo crumble & ice cream',       emoji:'🧇', best:false, hot:false },
  { id:'dw4', name:'KitKat Waffle',           cat:'desserts',     price:169, rating:4.9, desc:'Belgian waffle with KitKat & ice cream',             emoji:'🧇', best:false, hot:false },
  { id:'dw5', name:'Ferrero Rocher Explosion',cat:'desserts',     price:199, rating:5.0, desc:'Belgian waffle with Ferrero Rocher & ice cream',     emoji:'🧇', best:false, hot:true  },
  { id:'dp1', name:'Blueberry Pancake',       cat:'desserts',     price:139, rating:4.8, desc:'Fluffy pancakes with blueberry compote',             emoji:'🥞', best:false, hot:false },
  { id:'dp2', name:'Brownie Pancake',         cat:'desserts',     price:139, rating:4.9, desc:'Fluffy pancakes with brownie chunks',                emoji:'🥞', best:false, hot:false },
  { id:'dp3', name:'Nutella Pancake',         cat:'desserts',     price:149, rating:4.9, desc:'Fluffy pancakes with Nutella drizzle',               emoji:'🥞', best:true,  hot:true  },
  { id:'dp4', name:'Nutella Brownie Pancake', cat:'desserts',     price:159, rating:5.0, desc:'Fluffy pancakes with Nutella & brownie — ultimate!', emoji:'🥞', best:false, hot:false },
]

export const reviews = [
  { id:1, name:'Yuvi Hayer',       initials:'YH', bg:'#6B8F5E', meta:'Local Guide · 12 reviews · 2 weeks ago', text:"Amazing food, service, and a great vibe. The interior is really cool, the food is delicious. The owner is super humble too. It's like my everyday evening place.", tags:['Food 5/5','Atmosphere 5/5','Service 5/5'] },
  { id:2, name:'Archana Sharma',   initials:'AS', bg:'#C08B3A', meta:'Local Guide · 21 reviews · 2 weeks ago', text:'Cafe ka ambience bahut cozy aur beautiful tha. Virgin Mojito bilkul refreshing tha, Green Apple drink ka taste bhi kaafi unique aur yummy laga. White Sauce Pasta creamy aur super delicious tha.', tags:['Cozy Vibes','No Wait','Food 5/5'] },
  { id:3, name:'Madeeha Malik',    initials:'MM', bg:'#7B4A2D', meta:'1 review · 2 weeks ago',                 text:'What a Pinterest vibe there, and the service is outstanding. I really like the food 😍😍', tags:['Pinterest Vibe','Service 5/5','Food 5/5'] },
  { id:4, name:'Kamal',            initials:'K',  bg:'#2B1206', meta:'1 review · 2 days ago',                  text:'Outstanding food, great ambience, friendly staff, and delicious food that keeps you coming back for more.', tags:['Food 5/5','Ambience 5/5'] },
  { id:5, name:'Jaideep Brar',     initials:'JB', bg:'#3D6B5A', meta:'2 reviews · 2 days ago',                 text:'The atmosphere is really soothing and the food quality is great. Owner and staff nature is great, they are very friendly.', tags:['Friendly Staff','Soothing Vibe'] },
  { id:6, name:'Rahul Verma',      initials:'RV', bg:'#8B5A2B', meta:'2 reviews · 2 days ago',                 text:"Try pasta and frappe — was too gud, must try! You won't regret it.", tags:['Pasta ❤️','Frappe 🧋'] },
  { id:7, name:'Rabiya Bhatt',     initials:'RB', bg:'#5C2E18', meta:'4 reviews · 2 weeks ago',                text:'This place becomes my favorite place now.', tags:['Favourite Spot'] },
  { id:8, name:'Shushant Bhumbla', initials:'SB', bg:'#2A4A35', meta:'11 reviews · 2 days ago',                text:'Great experience overall. Would definitely come back!', tags:['Great Experience'] },
]
