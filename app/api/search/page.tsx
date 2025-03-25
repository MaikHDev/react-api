"use client";

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import ApiCall, {CryptoResponse} from "@/app/api/api";
import Header from "@/(components)/header";
import SmallCard from "@/(components)/smallCard";

export default function SearchPage() {
    const search = useSearchParams().get("q");
    const [apiData, setApiData] = useState<CryptoResponse>();

    const getApi = async () => {
        const data = await ApiCall({parameters: `asset/v1/search?search_string=${search != null ? search : ''}&limit=100`});
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
                {apiData && Object.keys(apiData.Err).length != 0 && (
                    <>
                        <div>{apiData.Err?.type}</div>
                        <div>{apiData.Err?.message}</div>
                        <div>{apiData.Err?.custom}</div>
                    </>
                )}
                {apiData?.Data.LIST?.map((item, index) => {
                    return (
                        <SmallCard key={index} item={item}/>
                    );
                })}
                {apiData && apiData.Data.LIST.length == 0 && Object.keys(apiData.Err).length == 0 && (
                    <>
                        <span>No items found!</span>
                    </>
                )}
            </div>
        </div>
    );
}
