import Error from "next/error";

interface ApiCallProps {
    parameters: string
}

const ApiCall = async ({parameters = "asset/v1/top/list?sort_direction=DESC"}: ApiCallProps): Promise<unknown> => {
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
            return response.statusText;
        }

    } catch (error: any) {
        return new Error(error);
    }
}

export default ApiCall