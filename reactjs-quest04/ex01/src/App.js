import List from './List.js';
import './App.css';

function App() {
  const list_shoes = ['Adidas Kampung', 'Ballet shoe', 'Pointe shoe', 'Bast shoe', 'Blucher shoe', 'Boat shoe', 'Brogan', 'Brogue shoe', 'Brothel creeper', 'Bucks', 'Cantabrian albarcas', 'Chelsea boot', 'Chopine', 'Chukka boot', 'Climbing shoe', 'Clog', 'Court shoe', 'Cross country running shoe', 'Derby shoe', 'Desert Boot', 'Diabetic shoe', 'Dress shoe', 'Duckbill shoe', 'Driving moccasins', 'Earth shoe', 'Elevator shoes', 'Espadrille', 'Fashion boot', 'Galesh', 'Geta', 'Giveh', 'High-heeled footwear'];

  const list_animals = ['Aardvark', 'Abyssinian', 'Adelie Penguin', 'Affenpinscher', 'Afghan Hound', 'African Bullfrog', 'African Bush Elephant', 'African Civet', 'African Clawed Frog', 'African Forest Elephant', 'African Palm Civet', 'African Penguin', 'African Tree Toad', 'African Wild Dog', 'Ainu', 'Airedale Terrier', 'Airedoodle', 'Akbash', 'Akita', 'Alaskan Malamute', 'Alaskan Shepherd', 'Albacore Tuna', 'Albatross', 'Aldabra Giant Tortoise', 'Alligator', 'Alligator Gar', 'Alpaca', 'Alpine Dachsbracke', 'Amazon River Dolphin (Pink Dolphin)', 'American Alsatian', 'American Bulldog', 'American Cocker Spaniel', 'American Coonhound', 'American Eskimo Dog', 'American Foxhound', 'American Hairless Terrier', 'American Pit Bull Terrier', 'American Staffordshire Terrier', 'American Water Spaniel', 'Amur Leopard', 'Anatolian Shepherd Dog', 'Anchovies', 'Angelfish', 'Ant', 'Anteater', 'Antelope', 'Appenzeller Dog', 'Arapaima', 'Arctic Fox', 'Arctic Hare', 'Arctic Wolf', 'Armadillo', 'Asian Elephant', 'Asian Giant Hornet', 'Asian Palm Civet', 'Asiatic Black Bear', 'Aurochs', 'Aussiedoodle', 'Aussiedor', 'Australian Cattle Dog', 'Australian Kelpie Dog', 'Australian Labradoodle', 'Australian Mist', 'Australian Shepherd', 'Australian Terrier', 'Avocet', 'Axolotl', 'Aye Aye']

  return (
    <div className="App">
        <List title="My Favorite Shoes" list={list_shoes} />
        <List title="My Favorite Animals" list={list_animals} />
    </div>
  );
}

export default App;