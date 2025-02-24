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

interface CryptoAsset {
    ID: number;
    SYMBOL: string;
    NAME: string;
    LOGO_URL: string;
    SUPPLY_MAX: number;
    SUPPLY_CIRCULATING: number;
}

export default async function ApiCall ({parameters = "asset/v1/top/list?sort_direction=DESC"}: ApiCallProps = {}): Promise<CryptoResponse | null> {
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