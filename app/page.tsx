import Header from '@/(components)/header'
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Header/>
            <section className="flex flex-col items-center">
                <p className="text-[40px] mt-5">Welcome!</p>
                <p>This website is for comparing prices of bitcoins, it uses graphs to display the data.</p>
                <p>To start with going through the website please go to Api in the top or click here: <Link
                    className="text-blue-400"
                    href="/api" about="Bitcoin api">API</Link></p>
            </section>
        </>
    );
}
