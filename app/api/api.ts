interface ApiCallProps {
    parameters?: string
}

export interface CryptoResponse {
    Data: {
        STATS: {
            PAGE: number;
            PAGE_SIZE: number;
            TOTAL_ASSETS: number;
        };
        LIST: CryptoAsset[];
    };
}

export interface CryptoAsset {
    SYMBOL: string;
    NAME: string;
    LOGO_URL: string;
    PRICE_USD: number;
    SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD: number;
    SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_CONVERSION: number;
    SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD: number;
}

export default async function ApiCall({parameters = "asset/v1/top/list?sort_direction=DESC"}: ApiCallProps = {}): Promise<CryptoResponse | null> {
    const apiUrl = `https://data-api.coindesk.com/${encodeURI(parameters)}`;

    try {
        const response = await fetch(`${apiUrl}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`,
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }

    } catch (error: any) {
        return null;
    }
};