import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    Promise.all([
      fetch(import.meta.env.VITE_CATEGORY_SHEET).then(response => response.json()),
      fetch(import.meta.env.VITE_SUBCATEGORY_SHEET).then(response => response.json()),
      fetch(import.meta.env.VITE_ITEM_SHEET).then(response => response.json())
    ]).then(([categoriesData, subcategoriesData, itemsData]) => {
      setCategories(categoriesData)
      setSubcategories(subcategoriesData)
      setItems(itemsData)
      setLoading(false)
      console.log(items)
    }).catch((error) => {
      console.error("Error fetching data:", error)
      setLoading(false)
    })
  }, [])

  // const nestedData = categories.map(category => {
  //   return {
  //     ...category,
  //     subcategories: subcategories.filter(subcategory => category.categoryId === subcategory.categoryId)
  //   };
  // });

  // const doubledNestedData = subcategories.map(subcategory => {
  //   return {
  //     ...subcategory,
  //     items: items.filter(item => subcategory.subcategoryId === item.subcategoryId)
  //   };
  // });

  const nestedData = categories.map(category => {
    // Primero, filtra las subcategorías que pertenecen a esta categoría.
    const subcategoriesWithItems = subcategories
      .filter(subcategory => category.categoryId === subcategory.categoryId)
      .map(subcategory => {
        // Luego, para cada subcategoría, filtra los items que pertenecen a esta subcategoría.
        return {
          ...subcategory,
          items: items.filter(item => item.subcategoryId === subcategory.subcategoryId)
        };
      });

    // Finalmente, retorna la categoría con sus subcategorías (y los items ya anidados dentro de estas).
    return {
      ...category,
      subcategories: subcategoriesWithItems
    };
  });

  console.log(nestedData)

  return (
    <>
      <h1>Recursos</h1>
      {loading && <div class="loader"></div>}
      <nav className='index'>
        {nestedData.map((category) => (
          <a key={category.categoryId} href={`#${category.categoryId}`}>{category.categoryName}</a>
        ))}
      </nav>
      {nestedData.map((category) => (
        <div key={category.categoryId} id={category.categoryId}>
          <h2>{category.categoryName}</h2>
          {category.subcategories.map((subcategory) => (
            <div key={subcategory.id} className="subcategory">

              <h3>{subcategory.subcategoryName}</h3>
              <ul>
                {subcategory.items.map((item) => (
                  <li key={item.itemId}>
                    <a href={item.itemLink}>
                      {item.itemName}
                    </a>
                    <p>{item.itemDesc && item.itemDesc}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
