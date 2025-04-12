"use client"

import {redirect} from "next/navigation";
import SearchBar from "@/(components)/searchBar";

export default function Header() {
    return (
        <div className="flex w-full h-[60px] bg-slate-600 pl-[5%] pr-[5%]">
            <div className="w-[10%] flex items-center">
                <button type="button" onClick={() => redirect('/')}>Home</button>
            </div>
            <div className="flex grow justify-center gap-5">
                <button onClick={() => redirect('/api')}>Crypto api</button>
                <SearchBar/>
            </div>
            <div className="w-[10%] flex items-center justify-end">
                <button type="button" onClick={() => redirect('/api/favorites')}>Favorites</button>
            </div>
        </div>
    );
}

