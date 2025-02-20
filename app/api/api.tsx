import type {NextApiResponse} from 'next';

interface ApiCallProps {
    res: NextApiResponse,
    url: string
}

const ApiCall = async ({res}: ApiCallProps) => {
    const apiUrl = 'https://data-api.coindesk.com/';

    try {
        const response = await fetch(`${apiUrl}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`,
            },
        });


        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
            return res;
        } else {
            return new Error('Failed to fetch external API');
        }

    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}

export default ApiCall