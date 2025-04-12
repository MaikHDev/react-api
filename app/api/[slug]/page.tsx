import Item from "@/app/api/[slug]/item";

export default async function Page({params}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug;


    return (
        <>
            {slug && (
                <Item slug={slug}/>
            )}
        </>
    );
}