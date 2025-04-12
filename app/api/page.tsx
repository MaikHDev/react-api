import Header from '@/(components)/header'
import CoinList from "@/(components)/coinList";

export default function ApiPage() {
    const apiParams = 'asset/v1/top/list?sort_direction=DESC';

    return (
        <div className="w-full flex flex-col items-center">
            <Header/>
            <CoinList apiParameters={apiParams}/>
        </div>
    );
}