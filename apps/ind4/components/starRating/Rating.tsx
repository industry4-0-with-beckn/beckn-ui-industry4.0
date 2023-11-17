import React from 'react'
import Rating from 'react-rating-stars-component'

const ProductRating = ({ rating }) => {
  return (
    <Rating
      count={5}
      value={rating}
      size={24}
      edit={false} // Set to true if you want the user to be able to interactively change the rating
      activeColor="#ffd700" // Color of the active (filled) stars
      isHalf={true} // Enable half-star increments
    />
  )
}

export default ProductRating
