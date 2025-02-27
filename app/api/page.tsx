"use client"
import {useEffect, useState} from "react";
import Header from '@/(components)/header'
import ApiCall, {CryptoResponse} from "@/app/api/api";
import Card from "@/(components)/card";

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
        <div className="w-full flex flex-col items-center">
            <Header/>
            <div className="flex flex-col items-center pl-[5%] pr-[5%] mt-10 w-full">
                {apiData && apiData.Data.LIST.map((item, index) => {
                    return (
                        <Card key={index} item={item}/>
                    );
                })}
            </div>
        </div>
    );
}