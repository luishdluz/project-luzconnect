import products from "./data/products.json";

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, time);
  });
};

const Services = {};

Services.getProducts = async () => {
  await fetch(products, 1000);
  return products;
};

export default Services;
