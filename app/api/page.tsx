"use client"
import {useEffect, useState} from "react";
import type {NextApiResponse} from 'next';
import Header from '../header'

export default function ApiPage() {
    const [apiData, setApiData] = useState([""]);
    const [pressedFetch, setPressedFetch] = useState(false);
    const [response, setResponse] = useState<NextApiResponse>();


    const [url, setUrl] = useState<string[] | null>(null);

    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (pressedFetch) {
            setPressedFetch(false);
            if (timeLeft < 1) {
                // fetch data
                setTimeLeft(90);
            }
        }

    }, [pressedFetch]);

    useEffect(() => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);


            // Clean up the interval when the component unmounts
            return () => clearInterval(interval);
        }
    }, [timeLeft]);

    return (
        <section className="w-full flex flex-col items-center">
            <Header/>
            <div>
                <button onClick={() => setPressedFetch(true)}>Fetch data</button>
                <br/>
                {apiData && apiData.length > 0 && <div>{apiData} + hello</div>}
                <br/>
                {timeLeft > 0 &&
                    <p>Time left: {Math.floor(timeLeft / 60)} minutes : {Math.floor(timeLeft % 60)} seconds</p>}

                {/*<button onClick={() => setUrl()}>Fetch data all</button>*/}
            </div>

        </section>
    );
}
