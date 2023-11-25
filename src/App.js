import { useState } from "react";
import products from "./products.json";

export default function App() {
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);

  const addToBasket = (product) => {
    const randomId = Math.floor(Math.random() * 1000000);
    const productWithId = { ...product, id: randomId };

    setBasket([...basket, productWithId]);
    updateTotal([...basket, productWithId]);
  };

  const removeFromBasket = (productId) => {
    const updatedBasket = basket.filter((item) => item.id !== productId);
    setBasket(updatedBasket);
    updateTotal(updatedBasket);
  };

  const updateTotal = (updatedBasket) => {
    const newTotal = updatedBasket.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
  };

  return (
    <div>
      <header>
        <p className="title">React Racers</p>
        <p className="introduction">
          Welcome to React Racers, where speed meets excitement! We're not just
          a toy company; we're the creators of high-octane fun. Our sleek and
          innovative toy race cars are designed for thrilling adventures,
          bringing the excitement of the racetrack to life. Join us for a
          journey where every race is a burst of joy and competition. Get ready
          to experience the thrill with React Racers!
        </p>
      </header>
      <div className="main">
        <List products={products} addToBasket={addToBasket} />
        <Basket basket={basket} removeFromBasket={removeFromBasket} />
      </div>
      <CartTotal total={total} />
    </div>
  );
}

function List({ products, addToBasket }) {
  return (
    <ul className="productList">
      {products.map((product) => (
        <Item key={product.id} product={product} addToBasket={addToBasket} />
      ))}
    </ul>
  );
}

function Item({ product, addToBasket }) {
  const { title, description, price, imageUrl } = product;

  return (
    <div className="item">
      <h2>{title}</h2>
      <img src={imageUrl} alt="Car" style={{ width: "10rem" }}></img>
      <p>${price}</p>
      <Button onClick={() => addToBasket(product)}>+</Button>
    </div>
  );
}

function Basket({ basket, removeFromBasket }) {
  const [openBasket, setOpenBasket] = useState(false);

  function handleOpenBasket() {
    setOpenBasket(!openBasket);
  }

  return (
    <div className={openBasket ? "basket basketExtend" : "basket"}>
      <button onClick={handleOpenBasket}>🛒</button>
      {openBasket && (
        <div>
          <h2>{basket.length > 0 ? "Your basket:" : "Your basket is empty"}</h2>
          <ul>
            {basket.map((item, index) => (
              <BasketItem
                key={item.id}
                imageUrl={item.imageUrl}
                item={item}
                removeFromBasket={removeFromBasket}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function BasketItem({ item, removeFromBasket }) {
  return (
    <div className="basketItem">
      <img src={item.imageUrl} style={{ width: "50px" }} alt={item.title} />
      <span>{item.title}</span>
      <Button onClick={() => removeFromBasket(item.id)}>x</Button>
    </div>
  );
}

function CartTotal({ total }) {
  let formattedTotal = `$${total.toFixed(2)}`;
  return (
    <div className="cartTotal">
      <p>{formattedTotal}</p>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
