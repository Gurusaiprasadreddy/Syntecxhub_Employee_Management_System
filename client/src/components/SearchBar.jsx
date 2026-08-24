import { MdSearch } from 'react-icons/md';
import './SearchBar.css';

const SearchBar = ({ search, setSearch, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <MdSearch className="search-icon" />
      <input 
        type="text" 
        placeholder="Search employees..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="btn btn-primary search-btn">Search</button>
    </form>
  );
};

export default SearchBar;
