"use client"

import Header from "@/(components)/header";
import {useEffect, useState} from "react";

export default function Favorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    const FAVORITES_KEY = "favoriteProducts";

    const loadFavorites = () => {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    };

    const saveFavorites = (favorites: string[]) => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    };

    const toggleFavorite = (productId: string) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.includes(productId)
                ? prevFavorites.filter((id) => id !== productId)
                : [...prevFavorites, productId];

            saveFavorites(updatedFavorites);
            return updatedFavorites;
        });
    };

    useEffect(() => {
        setFavorites(loadFavorites());
    }, []);

    return (
        <>
            <Header/>
            <div className="flex flex-col items-center pl-[5%] pr-[5%] mt-10 w-full">
                {favorites.map((favorite) => {
                    return (
                        <div key={favorite} className="flex gap-4 w-[300px] justify-center">
                            <div className="w-[80%] bg-gray-400 p-4 mt-2 mb-2 rounded">
                                {favorite}
                            </div>
                            <button className="bg-red-400 p-3 mt-2 mb-2 rounded"
                                    onClick={() => toggleFavorite(favorite)}>Remove
                            </button>
                        </div>
                    )
                })}
            </div>

        </>
    )
}