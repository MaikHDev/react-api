"use client"
import {useEffect, useState} from "react";
import ApiCall, {CryptoAsset, CryptoResponse} from "@/app/api/api";
import SmallCard from "@/(components)/smallCard";
import LoadAnimation from "@/(components)/loadAnimation";

interface CoinListProps {
    apiParameters: string,

}

export default function CoinList({apiParameters}: CoinListProps) {
    const [apiData, setApiData] = useState<CryptoResponse>();
    const [loadingAnimation, setLoadingAnimation] = useState(false);
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

    const getApi = async () => {
        setLoadingAnimation(true);
        await Promise.resolve();

        await ApiCall({
            parameters: apiParameters,
        }).then((data) => {
            setApiData(data);
            setLoadingAnimation(false);
        });
    }

    const filterItems = (items: CryptoAsset[]): CryptoAsset[] => {
        return items.sort((a, b) => {
                if (favorites.includes(a.SYMBOL) !== favorites.includes(b.SYMBOL)) {
                    return favorites.includes(a.SYMBOL) ? -1 : 1;
                }
                return a.ID - b.ID;
            }
        );
    }

    useEffect(() => {
        setFavorites(loadFavorites());
        getApi();

        const interval = setInterval(() => {
            getApi();
        }, 60000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center pl-[5%] pr-[5%] mt-10 w-full">
            {loadingAnimation && (
                <LoadAnimation/>
            )}
            {apiData?.Err && (
                <>
                    <div>{apiData.Err?.type}</div>
                    <div>{apiData.Err?.message}</div>
                    <div>{apiData.Err?.custom}</div>
                </>
            )}
            {apiData?.Data.LIST && filterItems(apiData.Data.LIST).map((item, index) => {
                return (
                    <SmallCard key={index} item={item} favorite={favorites.includes(item.SYMBOL)}
                               setFavorite={() => toggleFavorite(item.SYMBOL)}/>
                );
            })}

            {apiData && apiData.Data.LIST?.length == 0 && !apiData.Err && (
                <>
                    <span>No items found!</span>
                </>
            )}
        </div>
    );
}