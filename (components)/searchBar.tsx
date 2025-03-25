import React, {useState, useEffect} from "react";
import ApiCall, {CryptoResponse} from "@/app/api/api";
import Link from "next/link";
import {redirect} from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [apiData, setApiData] = useState<CryptoResponse>();

    const getApi = async () => {
        const data = await ApiCall({parameters: `asset/v1/search?search_string=${query != null ? query : ''}&limit=10`});
        setApiData(data);
    }

    useEffect(() => {
        if (query.length > 1) {
            const delayDebounce = setTimeout(() => {
                getApi();
            }, 300);

            return () => clearTimeout(delayDebounce);
        } else {
            setApiData({
                Data: {
                    LIST: [],
                },
                Err: {}
            });
        }
    }, [query]);

    return (
        <form action={() => redirect(`/api/search?q=${query}`)} className="h-10 self-center">
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                className="p-2 outline-none rounded text-black"
            />
            {apiData && (
                <ul className="mt-2">
                    {apiData.Data.LIST.map((item) => (
                        <Link key={item.NAME} href={`/api/${item.NAME}`}
                              className="bg-slate-500 px-3 py-2 cursor-pointer relative flex hover:bg-slate-600">
                            {item.NAME}
                        </Link>
                    ))}
                    {apiData.Data.LIST.length > 0 && (
                        <input type="submit"
                               className="bg-slate-600 px-3 py-2 cursor-pointer relative flex w-full text-start hover:bg-slate-700"
                               value="See all"/>
                    )}
                </ul>
            )}
        </form>
    );
};