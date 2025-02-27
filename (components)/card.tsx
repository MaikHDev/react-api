import {CryptoAsset} from "@/app/api/api";

interface CardProps {
    item: CryptoAsset
}

export default function Card({item}: CardProps) {
    return (
        <ul className="flex w-[70%] gap-5">
            <li className="w-[14.2%]">{item.NAME}</li>
            <li className="w-[14.2%]"><img className="h-[30px]" src={item.LOGO_URL} alt={item.NAME}/></li>
            <li className="w-[14.2%]">{item.SYMBOL}</li>
            <li className="w-[14.2%]">{item.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_CONVERSION > 0 && <>+</>}{Math.round(item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD * 100) / 100}% last 24h</li>
            <li className="w-[14.2%]">{Math.round(item.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_CONVERSION * 100) / 100}% last 7days</li>
            <li className="w-[14.2%]">{Math.round(item.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD * 100) / 100}% last month</li>
            <li className="w-[14.2%]"><button>Favorite</button></li>
        </ul>
    );
}