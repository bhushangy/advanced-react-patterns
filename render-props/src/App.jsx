import { useState } from "react";
import { faker } from "@faker-js/faker";
import "./styles.css";

const products = Array.from({ length: 20 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };
});

const companies = Array.from({ length: 15 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  };
});

function ProductItem({ product }) {
  return (
    <li className="product">
      <p className="product-name">{product.productName}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
    </li>
  );
}

function CompanyItem({ company, defaultVisibility }) {
  const [isVisible, setIsVisisble] = useState(defaultVisibility);

  return (
    <li
      className="company"
      onMouseEnter={() => setIsVisisble(true)}
      onMouseLeave={() => setIsVisisble(false)}
    >
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
}

function List({ title, items, render }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const displayItems = isCollapsed ? items.slice(0, 3) : items;

  function toggleOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="list-container">
      <div className="heading">
        <h2>{title}</h2>
        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>
      {isOpen && <ul className="list">{displayItems.map(render)}</ul>}

      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        <List
          title="Products"
          items={products}
          render={(product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />
        <List
          title="Companies"
          items={companies}
          render={(company) => (
            <CompanyItem
              key={company.companyName}
              company={company}
              defaultVisibility={false}
            />
          )}
        />
      </div>
    </div>
  );
}


/*

function Input(props) {

  const [value, setValue] = useState("");


  return (

    <>

      <input

        type="text"

        value={value}

        onChange={e => setValue(e.target.value)}

        placeholder="Temp in °C"

      />

      {props.render(value)}

    </>

  );

}


export default function App() {

  return (

    <div className="App">

      <h1>☃️ Temperature Converter 🌞</h1>

      <Input

        render={value => (

          <>

            <Kelvin value={value} />

            <Fahrenheit value={value} />

          </>

        )}

      />

    </div>

  );

}


function Kelvin({ value }) {

  return <div className="temp">{parseInt(value || 0) + 273.15}K</div>;

}


function Fahrenheit({ value }) {

  return <div className="temp">{(parseInt(value || 0) * 9) / 5 + 32}°F</div>;

}


*/


/*
With children prop

function Input(props) {

  const [value, setValue] = useState(0);


  return (

    <>

      <input

        type="number"

        value={value}

        onChange={e => setValue(e.target.value)}

        placeholder="Temp in °C"

      />

      {props.children(value)}

    </>

  );

}


export default function App() {

  return (

    <div className="App">

      <h1>☃️ Temperature Converter 🌞</h1>

      <Input>

        {value => (

          <>

            <Kelvin value={value} />

            <Fahrenheit value={value} />

          </>

        )}

      </Input>

    </div>

  );

}


function Kelvin({ value }) {

  return <div className="temp">{parseInt(value || 0) + 273.15}K</div>;

}


function Fahrenheit({ value }) {

  return <div className="temp">{(parseInt(value || 0) * 9) / 5 + 32}°F</div>;

}



*/