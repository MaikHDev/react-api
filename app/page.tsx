import Header from './header'

const hyperLinks = [
    {
        url: "api", buttonName: "Crypto api"
    },
]

export default function Home() {
    return (
        <>
            <Header hyperLinks={hyperLinks}/>
        </>
    );
}
