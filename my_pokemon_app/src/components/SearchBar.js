import './SearchBar.css';

export default function SearchBar({onSearch}){
    const handleSearch = (event) => {
        onSearch(event.target.value);
      };
    
      return (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search here..."
            onChange={handleSearch}
          />
        </div>
      );
}