// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       const savedUser = localStorage.getItem("healthyDietUser");
//       return savedUser ? JSON.parse(savedUser) : null;
//     } catch {
//       return null;
//     }
//   });

//   const [token, setToken] = useState(
//     () => localStorage.getItem("healthyDietToken") || null
//   );

//   const login = (userData, userToken) => {
//     localStorage.setItem(
//       "healthyDietUser",
//       JSON.stringify(userData)
//     );

//     localStorage.setItem(
//       "healthyDietToken",
//       userToken
//     );

//     setUser(userData);
//     setToken(userToken);
//   };

//   const logout = () => {
//     localStorage.removeItem("healthyDietUser");
//     localStorage.removeItem("healthyDietToken");

//     setUser(null);
//     setToken(null);
//   };

//   const isAuthenticated = Boolean(token && user);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         isAuthenticated,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error(
//       "useAuth must be used inside AuthProvider"
//     );
//   }

//   return context;
// }




import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5001/api"
).replace(/\/+$/, "");

function getUserCartKey(user) {
  if (!user) return null;

  const accountId = user._id || user.id || user.email;

  if (!accountId) return null;

  return `healthyDietCart_user_${String(accountId)
    .trim()
    .toLowerCase()}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("healthyDietUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("healthyDietToken") || null
  );

  const login = (userData, userToken) => {
    localStorage.setItem(
      "healthyDietUser",
      JSON.stringify(userData)
    );

    localStorage.setItem("healthyDietToken", userToken);

    setUser(userData);
    setToken(userToken);
  };

  const logout = async () => {
    const currentUser = user;
    const currentToken = token;

    // Remove locally saved cart data for this session.
    const userCartKey = getUserCartKey(currentUser);

    if (userCartKey) {
      localStorage.removeItem(userCartKey);
    }

    localStorage.removeItem("healthyDietCart_guest");

    // Clear the cart saved in MongoDB before finishing logout.
    if (currentToken) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/user-data/cart`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentToken}`,
            },
            body: JSON.stringify({
              cartItems: [],
            }),
          }
        );

        if (!response.ok) {
          console.error(
            "The saved cart could not be cleared on the server."
          );
        }
      } catch (error) {
        console.error(
          "Error clearing the saved cart:",
          error
        );
      }
    }

    // Finish logout even if the backend is unavailable.
    localStorage.removeItem("healthyDietUser");
    localStorage.removeItem("healthyDietToken");

    setUser(null);
    setToken(null);
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

