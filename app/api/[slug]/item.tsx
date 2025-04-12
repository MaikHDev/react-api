"use client"

import {useEffect, useState} from "react";
import ApiCall, {CryptoResponse} from "@/app/api/api";
import Header from "@/(components)/header";
import Card from "@/(components)/card";
import LoadAnimation from "@/(components)/loadAnimation";

interface ItemProps {
    slug: string;
}

export default function Item({slug}: ItemProps) {
    const [apiData, setApiData] = useState<CryptoResponse>();
    const [loadingAnimation, setLoadingAnimation] = useState(false);


    const getApi = async () => {
        setLoadingAnimation(true);

        await ApiCall({
            parameters: `asset/v2/metadata?assets=${slug}&quote_asset=EUR`
        }).then((data) => {
            setLoadingAnimation(false);
            setApiData(data);
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
                {apiData && Object.keys(apiData.Err).length != 0 && (
                    <>
                        <div>{apiData.Err?.type}</div>
                        <div>{apiData.Err?.message}</div>
                        <div>{apiData.Err?.custom}</div>
                    </>
                )}
                {apiData && (
                    <Card item={apiData.Data[slug]}/>
                )}
                {apiData && apiData.Data[slug] == null && Object.keys(apiData.Err).length == 0 && (
                    <>
                        <span>No items found!</span>
                    </>
                )}
            </div>
        </div>
    );
}