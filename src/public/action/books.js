import Axios from "axios";

export const getBooks = () => {
  return {
    type: "GET_BOOK",
    payload: Axios.get("https://floating-sierra-16009.herokuapp.com/books/all")
  };
};

export const addBooks = (title, description, image, date_released, genre) => {
  return {
    type: "POST_BOOK",
    payload: Axios.post("https://floating-sierra-16009.herokuapp.com/books/", {
      title,
      description,
      image,
      date_released,
      genre
    })
  };
};

export const updateBook = (idbooks, title, description, image) => {
  return {
    type: "UPDATE_BOOK",
    payload: Axios.patch(`https://floating-sierra-16009.herokuapp.com/books/?idbooks=${idbooks}`, {
      title,
      description,
      image
    })
  };
};

export const deleteBook = idbooks => {
  return {
    type: "DELETE_BOOK",
    payload: Axios.delete(`https://floating-sierra-16009.herokuapp.com/books/?idbooks=${idbooks}`)
  };
};

export const rentBook = idbooks => {
  let token = window.localStorage.getItem("access_token");
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }
  return {
    type: "RENT_BOOK",
    payload: Axios.post(
      `https://floating-sierra-16009.herokuapp.com/books/rent?idbooks=${idbooks}`,
      "",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
          x_token: token
        }
      }
    )
  };
};

export const returnBook = idbooks => {
  return {
    type: "RETURN_BOOK",
    payload: Axios.post(
      `https://floating-sierra-16009.herokuapp.com/books/return/?idbooks=${idbooks}`
    )
  };
};

export const getRent = () => {
  let token = window.localStorage.getItem("access_token");
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }
  return {
    type: "GET_RENT_BOOK",
    payload: Axios.get(`https://floating-sierra-16009.herokuapp.com/books/rent/`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
        x_token: token
      }
    })
  };
};
