"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const search = searchParams.get("query");

    if (!search) {
        return <p>Please provide a search term.</p>;
    }

    return (
        <div>
            <h1>Search Results</h1>
            <p>Searching for: {search}</p>
        </div>
    );
}
