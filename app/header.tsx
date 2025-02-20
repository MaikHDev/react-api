"use client"
import {useRouter} from "next/navigation";
import {ReactNode} from "react";

interface HeaderProps {
    hyperLinks?: {
    url: string,
    buttonName: string
    }[];
}

const Header = ({hyperLinks}: HeaderProps) => {
    const router = useRouter();
    return (
        <>
            <button type="button" onClick={() => router.push('/')}>link</button>
            {hyperLinks && hyperLinks.map((link, index) => {
                return (
                    <button key={index} onClick={() => router.push(`/${link.url}`)}>{link.buttonName}</button>
                )
            })}
        </>
    );
}
export default Header


