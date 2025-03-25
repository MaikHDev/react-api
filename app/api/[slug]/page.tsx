import Header from "@/(components)/header";


export default async function Page({params}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug;

    return (
        <>
            <Header/>
            <div>My Post: {slug}</div>
        </>
    );
}