"use client";

import {useSearchParams} from "next/navigation";
import Header from "@/(components)/header";
import CoinList from "@/(components)/coinList";

export default function SearchPage() {
    const search = useSearchParams().get("q");
    const apiParams = `asset/v1/search?search_string=${search != null ? search : ''}&limit=100`;

    return (
        <div className="w-full flex flex-col items-center">
            <Header/>
            <CoinList apiParameters={apiParams}/>
        </div>
    );
}
