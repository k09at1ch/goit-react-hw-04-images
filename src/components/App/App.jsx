import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import style from './App.module.css';
import handleSearchImages from '../../API/fetchFunc';
const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [hasSearchPerformed, setHasSearchPerformed] = useState(false);

  const performSearch = (searchQuery, searchPage = 1) => {
    handleSearchImages(searchQuery, searchPage)
      .then((newImages) => {
        if (searchPage === 1) {
          setImages(newImages);
        } else {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const fetchImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setIsLoading(true);

    performSearch(query, nextPage);
  };

  const handleSearchSubmit = (searchQuery) => {
    setImages([]);
    setPage(1);
    setQuery(searchQuery);
    setIsLoading(true);
    setHasSearchPerformed(true);

    performSearch(searchQuery);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedImageUrl('');
    setShowModal(false);
  };

  useEffect(() => {
    if (query !== '') {
      performSearch(query);
    }
  }, [query]);

  return (
    <div className={style.App}>
      <SearchBar onSubmit={handleSearchSubmit} />
      {hasSearchPerformed && (
        <ImageGallery images={images} onClick={handleImageClick} />
      )}
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && images.length > 0 && (
        <Button onClick={fetchImages} />
      )}
      {showModal && (
        <Modal imageUrl={selectedImageUrl} onClose={handleModalClose}>
          <img src={selectedImageUrl} alt="Selected" />
        </Modal>
      )}
    </div>
  );
};

App.propTypes = {
  apiKey: PropTypes.string,
};

export default App;
