/* eslint-disable react/jsx-props-no-spreading */
import 'regenerator-runtime/runtime';
import React, { useState } from 'react';

import { TextField, Box, CircularProgress } from '@mui/material';

import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import axios from 'axios';

export default function PlaceSearch({ setSelectedRestaurant }) {
  const [restaurant, setRestaurant] = useState('');

  const searchOptions = {
    location: new google.maps.LatLng(1.3640957742836468, 103.80437940687283),
    radius: 2000,
    types: ['restaurant'],
  };

  const handleSelect = async (name) => {
    const results = await geocodeByAddress(name);
    const { formatted_address, place_id } = results[0];

    console.log('selecting a place');
    console.log(results);

    const restaurantData = {
      restaurantName: name,
      address: formatted_address,
      placeId: place_id,
    };

    axios.post('/restaurant', restaurantData).then((result) => {
      if (result.status === 200) {
        console.log(result.data);
        setSelectedRestaurant(result.data);
        localStorage.setItem('selectedRestaurant', JSON.stringify(result.data));
      }
    });
  };

  return (
    <PlacesAutocomplete
      value={restaurant}
      onChange={setRestaurant}
      onClick={setRestaurant}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({
        getInputProps, suggestions, getSuggestionItemProps, loading,
      }) => {
        console.log();

        return (
          <div id="place-search">
            <TextField
              {...getInputProps({ placeholder: 'Type in a location' })}
              label="Find a restaurant"
              variant="outlined"
              sx={{ input: { backgroundColor: 'whitesmoke' } }}
              fullWidth
            />

            {loading ? <CircularProgress /> : null}

            {suggestions.map((suggestion, index) => {
              const style = {
                backgroundColor: suggestion.active ? 'whitesmoke' : '#fff',
              };

              return (
                <Box
                  {...getSuggestionItemProps(suggestion, { style })}
                  key={`index-${index}`}
                  sx={{
                    p: 3,
                    m: '-1px',
                    border: '1px solid #2470a0',
                    zIndex: 'modal',
                    backgroundColor: 'whitesmoke',
                  }}
                  onClick={() => {
                    setRestaurant(suggestion.description);
                    handleSelect(suggestion.description);
                  }}
                >
                  {suggestion.description}
                </Box>
              );
            })}
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
}
