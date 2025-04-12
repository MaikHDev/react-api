"use server"

interface ApiCallProps {
    parameters: string
}

export interface CryptoResponse {
    Data: {
        STATS?: {
            PAGE: number;
            PAGE_SIZE: number;
            TOTAL_ASSETS: number;
        };
        LIST?: CryptoAsset[] | [];
        [key: string]:
            { PAGE: number; PAGE_SIZE: number; TOTAL_ASSETS: number }
            | CryptoAsset[]
            | MetaData
            | undefined;
    };
    Err: {
        type?: number;
        message?: string;
        custom?: string;
    }
}

export interface CryptoAsset {
    NAME: string;
    SYMBOL: string;
    LOGO_URL: string;
    CREATED_ON: number;
    PRICE_USD?: number;
    SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD?: number;
    SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_CONVERSION?: number;
    SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD?: number;
}

export interface MetaData extends CryptoAsset {
    UPDATED_ON: number;
}

export default async function ApiCall(
    {parameters}: ApiCallProps): Promise<CryptoResponse> {
    const apiUrl = `https://data-api.coindesk.com/${encodeURI(parameters)}`;

    try {
        const response = await fetch(`${apiUrl}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`,
            },
        });

        if (response.ok) {
            const data: CryptoResponse = await response.json();
            return {
                Data: {
                    ...data.Data,
                    // Ensure LIST is always an array or undefined
                    LIST: data.Data.LIST || [],
                    // Optionally add STATS if it exists
                    STATS: data.Data.STATS
                },
                Err: {}
            }
        } else {
            const data: CryptoResponse = await response.json();
            console.log(data);
            return {
                Data: {
                    LIST: [],
                },
                Err: data.Err
            }
        }

    } catch (error: any) {
        return {
            Data: {
                LIST: [],
            },
            Err: {
                custom: error.toString(),
            }
        };
    }
};