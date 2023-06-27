import axios from 'axios';
const handleSearchImages = (query, page = 1) => {
  
  return axios
    .get(
      `https://pixabay.com/api/?key=37472312-0ce04a1f581e4d9faa34fba80&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => {
      return response.data.hits;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export default handleSearchImages;
