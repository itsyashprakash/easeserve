// HomePage.js
import React, { useState } from 'react';
import {
  Croissant,
  Utensils,
  Coffee,
  Soup,
  IceCream,
  Salad,
  ChefHat,
  Beer
} from 'lucide-react';

// Add custom styles for hiding scrollbar
const scrollbarHideStyles = {
  scrollbarWidth: 'none',  /* Firefox */
  msOverflowStyle: 'none',  /* IE and Edge */
  '&::-webkit-scrollbar': {  /* Chrome, Safari and Opera */
    display: 'none'
  }
};

const categories = [
  { name: 'Breakfast', icon: Croissant },
  { name: 'Lunch', icon: Utensils },
  { name: 'Dinner', icon: Coffee },
  { name: 'Soup', icon: Soup },
  { name: 'Desserts', icon: IceCream },
  { name: 'Side Dish', icon: Salad },
  { name: 'Appetizer', icon: ChefHat },
  { name: 'Beverages', icon: Beer },
];

const menuItems = {
  Breakfast: [
    { name: 'Eggs Benedict', description: 'Poached eggs on English muffin with hollandaise sauce', price: 12.99, image: '/placeholder.svg' },
    { name: 'Pancake Stack', description: 'Fluffy pancakes with maple syrup and butter', price: 9.99, image: '/placeholder.svg' },
    { name: 'Avocado Toast', description: 'Smashed avocado on artisan bread with poached egg', price: 11.50, image: '/placeholder.svg' },
  ],
  Lunch: [
    { name: 'Chicken Caesar Salad', description: 'Grilled chicken breast on romaine with Caesar dressing', price: 14.50, image: '/placeholder.svg' },
    { name: 'Beef Burger', description: 'Juicy beef patty with lettuce, tomato, and special sauce', price: 13.99, image: '/placeholder.svg' },
    { name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, mozzarella, and basil', price: 15.99, image: '/placeholder.svg' },
  ],
  Dinner: [
    { name: 'Grilled Salmon', description: 'Fresh salmon fillet with lemon butter sauce', price: 22.99, image: '/placeholder.svg' },
    { name: 'Beef Tenderloin', description: 'Tender beef steak with red wine reduction', price: 28.99, image: '/placeholder.svg' },
    { name: 'Vegetable Risotto', description: 'Creamy Arborio rice with seasonal vegetables', price: 18.99, image: '/placeholder.svg' },
  ],
  Soup: [
    { name: 'Tomato Basil Soup', description: 'Creamy tomato soup with fresh basil', price: 7.99, image: '/placeholder.svg' },
    { name: 'Chicken Noodle Soup', description: 'Classic chicken soup with vegetables and noodles', price: 8.99, image: '/placeholder.svg' },
    { name: 'French Onion Soup', description: 'Rich beef broth with caramelized onions and cheese', price: 9.99, image: '/placeholder.svg' },
  ],
  Desserts: [
    { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center', price: 8.99, image: '/placeholder.svg' },
    { name: 'New York Cheesecake', description: 'Creamy cheesecake with graham cracker crust', price: 7.99, image: '/placeholder.svg' },
    { name: 'Tiramisu', description: 'Italian coffee-flavored dessert with mascarpone', price: 8.50, image: '/placeholder.svg' },
  ],
  'Side Dish': [
    { name: 'Garlic Mashed Potatoes', description: 'Creamy potatoes with roasted garlic', price: 5.99, image: '/placeholder.svg' },
    { name: 'Grilled Asparagus', description: 'Fresh asparagus spears with olive oil and lemon', price: 6.99, image: '/placeholder.svg' },
    { name: 'Mac and Cheese', description: 'Creamy macaroni with a blend of cheeses', price: 7.50, image: '/placeholder.svg' },
  ],
  Appetizer: [
    { name: 'Bruschetta', description: 'Toasted bread with tomatoes, garlic, and basil', price: 8.99, image: '/placeholder.svg' },
    { name: 'Calamari', description: 'Crispy fried squid rings with marinara sauce', price: 11.99, image: '/placeholder.svg' },
    { name: 'Spinach Artichoke Dip', description: 'Creamy dip with spinach and artichokes', price: 9.99, image: '/placeholder.svg' },
  ],
  Beverages: [
    { name: 'Fresh Lemonade', description: 'Homemade lemonade with mint', price: 3.99, image: '/placeholder.svg' },
    { name: 'Iced Tea', description: 'Freshly brewed iced tea', price: 3.99, image: '/placeholder.svg' },
    { name: 'Espresso', description: 'Single shot of espresso', price: 2.50, image: '/placeholder.svg' },
    { name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 3.50, image: '/placeholder.svg' },
    { name: 'Latte', description: 'Espresso with steamed milk', price: 3.99, image: '/placeholder.svg' },
    { name: 'Mocha', description: 'Espresso with chocolate and steamed milk', price: 4.50, image: '/placeholder.svg' },
    { name: 'Hot Chocolate', description: 'Rich chocolate drink with whipped cream', price: 4.99, image: '/placeholder.svg' },
    { name: 'Green Tea', description: 'Traditional Japanese green tea', price: 3.50, image: '/placeholder.svg' },
    { name: 'Orange Juice', description: 'Freshly squeezed orange juice', price: 4.50, image: '/placeholder.svg' },
    { name: 'Smoothie', description: 'Mixed berry smoothie with yogurt', price: 5.99, image: '/placeholder.svg' },
    { name: 'Mineral Water', description: 'Sparkling mineral water', price: 2.99, image: '/placeholder.svg' },
    { name: 'Cola', description: 'Classic carbonated soft drink', price: 2.99, image: '/placeholder.svg' },
  ],
};

function truncateText(text, wordLimit) {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + ' ...';
  }
  return text;
}

function HomePage({ onAddItem }) {
  const [selectedCategory, setSelectedCategory] = useState('Beverages');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Restaurant Menu</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 mb-6">
        {categories.map((category) => {
          const isActive = selectedCategory === category.name;
          return (
            <button
              key={category.name}
              className={`flex flex-col items-center justify-center h-20 px-2 py-1 border rounded ${isActive ? 'bg-primary text-white' : 'bg-white text-black'
                }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {React.createElement(category.icon, {
                className: `w-6 h-6 mb-1 ${isActive ? 'text-white' : 'text-black'}`,
              })}
              <span className="text-xs text-center">{category.name}</span>
            </button>
          );
        })}
      </div>

      <h2 className="text-2xl font-bold mb-4">{selectedCategory} Menu</h2>

      <div 
        className="h-[57dvh] overflow-y-auto pr-4"
        style={scrollbarHideStyles}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pb-4">
          {menuItems[selectedCategory].map((item) => (
            <div 
              key={item.name} 
              className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 rounded-bl-lg text-sm">
                  Rs. {item.price.toFixed(2)}
                </div>
              </div>
              <div className="p-3 flex flex-col h-[140px]">
                <h3 className="text-base font-semibold mb-1">{item.name}</h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2 flex-grow">{item.description}</p>
                <button
                  className="w-full bg-primary text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center mt-auto text-sm"
                  onClick={() => onAddItem({ name: item.name, price: item.price, image: item.image })}
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HomePage;