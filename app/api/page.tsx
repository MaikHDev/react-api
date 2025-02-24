"use client"
import {useEffect, useState} from "react";
import Header from '@/(components)/header'
import ApiCall, {CryptoResponse} from "@/app/api/api";

export default function ApiPage() {
    const [apiData, setApiData] = useState<CryptoResponse | null>();

    const getApi = async () => {
        const data = await ApiCall();
        setApiData(data);
    }

    useEffect(() => {
        getApi();

        const interval = setInterval(() => {
            getApi();
        }, 60000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full flex flex-col items-center">
            <Header/>
            <div>
                <br/>
                {apiData && apiData.Data.LIST.map((item, index) => {
                    return (
                        <ul key={index} className="flex gap-4 w-[500px]">
                            <li>{item.NAME}</li>
                            <li><img className="h-[30px]" src={item.LOGO_URL} alt={item.NAME}/></li>
                            <li>{item.SYMBOL}</li>
                            <li>{Math.ceil(item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD * 100) / 100}%</li>
                            <li>{Math.ceil(item.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_CONVERSION * 100) / 100}%</li>
                            <li>{Math.round(item.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD * 100) / 100}%</li>
                        </ul>
                    );
                })}
                <br/>
            </div>

        </section>
    );
}
