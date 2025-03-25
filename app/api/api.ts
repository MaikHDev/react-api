interface ApiCallProps {
    parameters?: string
}

export interface CryptoResponse {
    Data: {
        STATS?: {
            PAGE: number;
            PAGE_SIZE: number;
            TOTAL_ASSETS: number;
        };
        LIST: CryptoAsset[] | [];
    };
    Err: {
        type?: number;
        message?: string;
        custom?: string;
    }
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

export default async function ApiCall({parameters = "asset/v1/top/list?sort_direction=DESC"}: ApiCallProps = {}): Promise<CryptoResponse> {
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
            const data: CryptoResponse = await response.json();
            return {
                Data: {
                    STATS: undefined,
                    LIST: [],
                },
                Err: data.Err
            }
        }

    } catch (error: any) {
        return {
            Data: {
                STATS: undefined,
                LIST: [],
            },
            Err: {
                custom: error.message,
            }
        };
    }
};