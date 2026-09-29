
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const FavoriteContext = createContext(null);

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5001/api"
).replace(/\/$/, "");

function getFavoritesStorageKey(user) {
  if (!user) return "healthyDietFavorites_guest";

  const accountId = user._id || user.id || user.email;

  if (!accountId) return null;

  return `healthyDietFavorites_user_${String(accountId)
    .trim()
    .toLowerCase()}`;
}

function readFavorites(key) {
  if (!key) return [];

  try {
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function FavoriteProvider({ children }) {
  const { user, token } = useAuth();

  const isAuthenticated = Boolean(user && token);
  const storageKey = getFavoritesStorageKey(user);

  const [favoriteState, setFavoriteState] = useState({
    key: storageKey,
    items: [],
  });

  // Load favorites for the current account.
  useEffect(() => {
    let cancelled = false;

    setFavoriteState({
      key: storageKey,
      items: [],
    });

    const loadFavorites = async () => {
      // Guests keep favorites in local storage.
      if (!isAuthenticated || !token) {
        if (!cancelled) {
          setFavoriteState({
            key: storageKey,
            items: readFavorites(storageKey),
          });
        }
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/user-data`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load favorites from server"
          );
        }

        const result = await response.json();
        const items = result.data?.favorites;

        if (!Array.isArray(items)) {
          throw new Error(
            "Invalid favorites response from server"
          );
        }

        if (!cancelled) {
          setFavoriteState({
            key: storageKey,
            items,
          });

          if (storageKey) {
            localStorage.setItem(
              storageKey,
              JSON.stringify(items)
            );
          }
        }
      } catch (error) {
        console.error(
          "Error loading saved favorites:",
          error
        );

        // Show the local cache if the API is unavailable.
        if (!cancelled) {
          setFavoriteState({
            key: storageKey,
            items: readFavorites(storageKey),
          });
        }
      }
    };

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [storageKey, token, isAuthenticated]);

  // Prevent displaying another account's favorites.
  const favorites =
    favoriteState.key === storageKey
      ? favoriteState.items
      : [];

  const saveFavorites = (items) => {
    // Update the interface immediately.
    setFavoriteState({
      key: storageKey,
      items,
    });

    // Save a local cache.
    if (storageKey) {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify(items)
        );
      } catch (error) {
        console.error(
          "Error caching favorites:",
          error
        );
      }
    }

    // Persist logged-in customers' favorites in MongoDB.
    if (isAuthenticated && token) {
      fetch(`${API_BASE_URL}/user-data/favorites`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          favorites: items,
        }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const result = await response.json().catch(() => ({}));

            throw new Error(
              result.message || "Failed to save favorites"
            );
          }
        })
        .catch((error) => {
          console.error(
            "Error saving favorites to MongoDB:",
            error
          );
        });
    }
  };

  const isFavorite = (foodId) =>
    favorites.some(
      (food) => String(food.id) === String(foodId)
    );

  const toggleFavorite = (food) => {
    const exists = favorites.some(
      (item) => String(item.id) === String(food.id)
    );

    const updatedFavorites = exists
      ? favorites.filter(
          (item) => String(item.id) !== String(food.id)
        )
      : [...favorites, food];

    saveFavorites(updatedFavorites);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoriteProvider"
    );
  }

  return context;
}