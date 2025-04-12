"use client"

import {CryptoAsset, MetaData} from "@/app/api/api";
import BarChart from "@/(components)/barChart";

interface CardProps {
    item: { PAGE: number; PAGE_SIZE: number; TOTAL_ASSETS: number }
        | CryptoAsset[]
        | MetaData
        | undefined;
}

export default function Card({item}: CardProps) {
    return (
        <section>
            {item && (
                <div>
                    {'UPDATED_ON' in item && (
                        <>
                            <span>Created on: {new Date(item.CREATED_ON * 1000).toDateString()}</span>
                            <span>Updated on: {new Date(item.UPDATED_ON * 1000).toDateString()}</span>
                            <BarChart/>
                        </>
                    )}
                </div>
            )}
        </section>
    );
}