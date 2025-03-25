"use client";

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import ApiCall, {CryptoResponse} from "@/app/api/api";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const search = searchParams.get("query");
    const [apiData, setApiData] = useState<CryptoResponse>();

    const getApi = async () => {
        const data = await ApiCall({parameters: `/asset/v1/search?search_string=${search}`});
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
        <>
            <div>
                <h1>Search Results</h1>
                <p>Searching for: {search}</p>
            </div>
            {apiData && apiData.Data.LIST.length == 0 && apiData.Err && (
                <>
                    <div>{apiData.Err?.type}</div>
                    <div>{apiData.Err?.message}</div>
                    <div>{apiData.Err?.custom}</div>
                </>
            )
            }
        </>
    );
}
