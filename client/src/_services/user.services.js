const login = (email, password) => {
  return fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => {
      return response.json();
    }).then(json => {
      localStorage.setItem('accessToken', json.accessToken)
    })
};

const register = (user, callback) => {
  return fetch("http://localhost:4000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...user
    })
  })
};

const getBasket = () => {
  const accessToken = localStorage.getItem("accessToken");

  return fetch("http://localhost:4000/user/basket", {
      method: "GET",
      headers: {
        Authorization: "Basic " + accessToken
      }
    })
    .then(response => response.json())
    .then(json => json);
};

const getProducts = () => {
  return fetch("http://localhost:4000/products", {
      method: "GET",
    })
    .then(response => response.json())
    .then(json => json);
};

const addToBasket = (productId) => {
  const accessToken = localStorage.getItem("accessToken");

  return fetch("http://localhost:4000/user/basket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + accessToken
      },
      body: JSON.stringify({
        id: productId
      })
    })
    .then(response => {
      return response.json()
    })
    .then(json => json);
}

const removeFromBasket = (productId) => {
  const accessToken = localStorage.getItem("accessToken");

  return fetch(`http://localhost:4000/user/basket/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + accessToken
      }
    })
    .then(response => {
      return response.json()
    })
    .then(json => json);
}

const logout = () => {
  return new Promise(resolve => {
    localStorage.removeItem("accessToken");
    resolve()
  })
};


const getSelf = () => {
  const accessToken = localStorage.getItem("accessToken");

  return fetch("http://localhost:4000/user", {
      method: "GET",
      headers: {
        Authorization: "Basic " + accessToken
      }
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Unauthorized");
      }
    })
};


export const userService = {
  login,
  logout,
  register,
  getBasket,
  getSelf,
  getProducts,
  addToBasket,
  removeFromBasket
}