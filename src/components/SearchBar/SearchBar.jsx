import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(query);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <header className={style.Searchbar}>
      <form onSubmit={handleSubmit} className={style.SearchForm}>
        <button className={style.SearchFormbutton}>
          <span className="button-label">Search</span>
        </button>

        <input
          className={style.SearchForminput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
