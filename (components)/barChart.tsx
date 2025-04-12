import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartProps {
    percentage: number[];
    price: number[];
}

export default function BarChart({percentage, price}: BarChartProps) {
    if (!price && !percentage) {
        return <></>;
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    if (price && percentage) {
        const Price = {
            labels: ['1 Month', '7 Days', '24 Hours'],
            datasets: [
                {
                    label: "Price USD",
                    data: price.toReversed().map((x) => {
                        return x.toFixed(2);
                    }),
                    backgroundColor: "rgba(144, 160, 58, 0.8)",
                },
            ],
        };
        const Percentage = {
            labels: ['1 Month', '7 Days', '24 Hours'],
            datasets: [
                {
                    label: "Percentage",
                    data: percentage.toReversed().map((x) => {
                        return x.toFixed(2);
                    }),
                    backgroundColor: "rgba(97, 160, 58, 0.8)",
                },
            ],
        };
        return (
            <div className="flex flex-col gap-4">
                <Bar data={Price} options={options}/>
                <Bar data={Percentage} options={options}/>
            </div>
        );
    }
};