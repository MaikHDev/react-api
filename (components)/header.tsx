"use client"

import {redirect} from "next/navigation";

export default function Header() {
    return (
        <div className="flex w-full h-[60px] bg-slate-300">
            <div className="w-[10%] flex items-center justify-center">
                <button type="button" onClick={() => redirect('/')}>Home</button>
            </div>
            <div className="flex grow justify-center gap-5">
                <button onClick={() => redirect('/api')}>Crypto api</button>
            </div>
            <div className="w-[10%] flex items-center justify-center">
                <button type="button" onClick={() => redirect('/api/favorites')}>Favorites</button>
            </div>
        </div>
    );
}

