// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5001/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;


// import axios from "axios";

// const api = axios.create({
//   baseURL:
//     import.meta.env.VITE_API_URL ||
//     "http://localhost:5001/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;



import axios from "axios";

const api = axios.create({
  baseURL: (
    import.meta.env.VITE_API_URL ||
    "http://localhost:5001/api"
  ).replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;