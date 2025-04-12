"use client"
import {useEffect, useState} from "react";
import Header from '@/(components)/header'
import ApiCall, {CryptoResponse} from "@/app/api/api";
import SmallCard from "@/(components)/smallCard";
import LoadAnimation from "@/(components)/loadAnimation";

export default function ApiPage() {
    const [apiData, setApiData] = useState<CryptoResponse>();
    const [loadingAnimation, setLoadingAnimation] = useState(false);

    const getApi = async () => {
        setLoadingAnimation(true);
        await Promise.resolve();

        await ApiCall({
            parameters: "asset/v1/top/list?sort_direction=DESC",
        }).then((data) => {
            setApiData(data);
            setLoadingAnimation(false);
        });
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
                {apiData?.Data.LIST?.map((item, index) => {
                    return (
                        <SmallCard key={index} item={item} favorite={favorite} setFavorite={setFavorite}/>
                    );
                })}
                {apiData && apiData.Data.LIST?.length == 0 && !apiData.Err && (
                    <>
                        <span>No items found!</span>
                    </>
                )}
            </div>
        </div>
    );
}