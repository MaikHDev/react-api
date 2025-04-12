"use client"

import {CryptoAsset} from "@/app/api/api";
import Link from "next/link";

interface CardProps {
    item: CryptoAsset,
    favorite: boolean,
    setFavorite: (coinName: string) => void,
}

export default function SmallCard({item, favorite, setFavorite}: CardProps) {

    const Favorite = (CoinName: string) => {
        console.log(CoinName);
    }

    return (
        <div className="flex w-[1000px] gap-3">
            <Link href={`/api/${item.SYMBOL}`}
                  className="flex sm:w-[80%] w-[50%] max-w-[1000px] gap-5 justify-between p-5 bg-gray-400 text-black mt-2 mb-2 rounded cursor-pointer list-none">
                <li className="">{item.NAME}</li>
                <li className=""><img className="h-[30px]" src={item.LOGO_URL} alt={item.NAME}/></li>
                <li className="">{item.SYMBOL}</li>
                {item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD && (
                    <li className="">{item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD >= 0.01 && <>+</>}{Math.round(item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD * 100) / 100}%
                        last 24h
                    </li>
                )}
                {item.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_CONVERSION && (
                    <li className="">{item.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_CONVERSION >= 0.01 && <>+</>}{Math.round(item.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_CONVERSION * 100) / 100}%
                        last 7 days
                    </li>
                )}
                {item.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD && (
                    <li className="">{item.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD >= 0.01 && <>+</>}{Math.round(item.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD * 100) / 100}%
                        last month
                    </li>
                )}

            </Link>
            <button className={`p-4 ${favorite ? ' bg-red-500 hover:bg-red-600 ' : ' bg-gray-500 hover:bg-gray-600 '} text-black mt-2 mb-2 rounded `}
                    onClick={() => setFavorite(item.SYMBOL)}>Favorite</button>
        </div>
    );
}