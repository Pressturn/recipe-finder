import React from 'react'
import FavouriteCard from '../../components/FavouriteCard/FavouriteCard'
import { useState } from 'react'

function FavouritePage() {
  const [items, setItems] = useState([

    {
      id: "test1",
      title: "test-title1",
      thumbnail: "https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg"
    },
    {
      id: "test2",
      title: "test-title2",
      thumbnail: "https://www.themealdb.com/images/media/meals/xd9aj21740432378.jpg"
    }
  ])

  function handleDelete(id) {
    const deleteList = items.filter(item => item.id !== id)
    setItems(deleteList)
  }

  return (
    <div>
      <h1>Favourites</h1>
      {items.map(item => (
        <FavouriteCard
          key={item.id}
          id={item.id}
          title={item.title}
          thumbnail={item.thumbnail}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default FavouritePage