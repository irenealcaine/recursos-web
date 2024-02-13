import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(import.meta.env.VITE_CATEGORY_SHEET)
      .then((response) => response.json())
      .then((data) => setCategories(data))

    fetch(import.meta.env.VITE_ITEM_SHEET)
      .then((response) => response.json())
      .then((data) => setItems(data))
  }, [])
  // console.log(categories);
  // console.log(items);

  const nestedData = categories.map(category => {
    return {
      ...category,
      items: items.filter(item => item.categoryId === category.categoryId)
    };
  });
  // console.log(nestedData)

  return (
    <>
      <h1>Recursos</h1>
      <nav className='index'>
        {nestedData.map((category) => (
          <a key={category.categoryId} href={`#${category.categoryId}`}>{category.categoryName}</a>
        ))}
      </nav>
      {nestedData.map((category) => (
        <div key={category.categoryId} id={category.categoryId}>
          <h2>{category.categoryName}</h2>
          <ul>
            {category.items.map((item) => (
              <li key={item.itemId}>
                <a href={item.itemLink}>
                  {item.itemName}
                </a>
                <p>{item.itemDesc && item.itemDesc}</p>
              </li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
      <nav className='footer'>
        <a href="mailto:irenealcainealvarez@gmail.com?Subject=Charlemos!" rel="noopener noreferrer" target="_blank">Contacto</a>
        <a href="https://github.com/irenealcaine" rel="noopener noreferrer" target="_blank">Github</a>
        <a href="https://www.linkedin.com/in/irenealcaine/" rel="noopener noreferrer" target="_blank">Linkedin</a>
        <a href="https://irenealcainealvarez.es" rel="noopener noreferrer" target="_blank">Portfolio</a>
      </nav>
    </>
  )
}

export default App
