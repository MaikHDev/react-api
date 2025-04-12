"use client"

import {CryptoAsset, MetaData} from "@/app/api/api";
import BarChart from "@/(components)/barChart";
import {useEffect, useState} from "react";

interface CardProps {
    item: { PAGE: number; PAGE_SIZE: number; TOTAL_ASSETS: number }
        | CryptoAsset[]
        | MetaData
        | undefined;
}

export default function Card({item}: CardProps) {
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

    const inFavorites = (productId: string): boolean => {
        return favorites.includes(productId);
    }

    useEffect(() => {
        setFavorites(loadFavorites());
    }, []);

    return (
        <section>
            {item && 'UPDATED_ON' in item && (
                <>
                    <div className="flex flex-col w-full items-center">
                        <div className="flex gap-4 mt-3 justify-center items-center">
                            <img
                                src={item.LOGO_URL}
                                alt={item.NAME} width={60}/>
                            <div
                                className="justify-center items-center bg-gray-600 p-3 rounded h-12 text-xl">{item.NAME}</div>
                        </div>

                        <div className="flex gap-4 flex-wrap mt-3 mb-4 w-[500px] justify-center">
                            <div
                                className="justify-center items-center bg-gray-600 p-3 rounded">Symbol: {item.SYMBOL}</div>
                            <div
                                className="justify-center items-center bg-gray-600 p-3 rounded">ID: {item.ID}</div>
                            <div
                                className="justify-center items-center bg-gray-600 p-3 rounded">Website
                                url: <a href={item.WEBSITE_URL} className="text-blue-300">{item.WEBSITE_URL}</a>
                            </div>
                            <div
                                className="justify-center items-center bg-gray-600 p-3 rounded">Blog
                                url: <a href={item.WEBSITE_URL} className="text-blue-300">{item.BLOG_URL}</a>
                            </div>
                            <button onClick={() => toggleFavorite(item.SYMBOL)}
                                    className={`${inFavorites(item.SYMBOL) ? ' bg-red-500 hover:bg-red-600 ' : ' bg-gray-500 hover:bg-gray-600 '} p-2 rounded`}>{inFavorites(item.SYMBOL) ? 'Unfavorite' : 'Favorite'}</button>
                        </div>
                    </div>
                    <div className="w-[800px]">
                        {item.PRICE_USD && item.SPOT_MOVING_24_HOUR_CHANGE_USD && item.SPOT_MOVING_7_DAY_CHANGE_USD
                            && item.SPOT_MOVING_30_DAY_CHANGE_USD && item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD
                            && item.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_CONVERSION && item.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD && (

                                <BarChart
                                    price={[item.SPOT_MOVING_24_HOUR_CHANGE_USD, item.SPOT_MOVING_7_DAY_CHANGE_USD, item.SPOT_MOVING_30_DAY_CHANGE_USD]}
                                    percentage={[item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD, item.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_CONVERSION, item.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD]}/>
                            )}
                    </div>
                </>
            )}
        </section>
    );
}