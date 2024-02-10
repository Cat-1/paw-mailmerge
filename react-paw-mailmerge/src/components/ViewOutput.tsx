import React from "react";
import TableOutput from "./table/TableOutput";

interface ViewOutputProps {
    parsedData: object[] | null;
    template: string;
}

const fakeData: Record<string , any>[] = [
    { name: "Apple Inc.", symbol: "AAPL", sector: "Technology", marketCap: 2291.17 },
    { name: "Microsoft Corporation", symbol: "MSFT", sector: "Technology", marketCap: 2049.98 },
    { name: "Alphabet Inc. Class A", symbol: "GOOGL", sector: "Technology", marketCap: 1668.48 },
    { name: "Amazon.com Inc.", symbol: "AMZN", sector: "Consumer Cyclical", marketCap: 1639.3 },
    { name: "Meta Platforms Inc.", symbol: "META", sector: "Technology", marketCap: 748.89 },
    { name: "Tesla Inc.", symbol: "TSLA", sector: "Consumer Cyclical", marketCap: 735.29 },
    { name: "NVIDIA Corporation", symbol: "NVDA", sector: "Technology", marketCap: 739.47 },
    { name: "NXP Semiconductors N.V.", symbol: "NXPI", sector: "Technology", marketCap: 71.98 },
    { name: "PayPal Holdings Inc.", symbol: "PYPL", sector: "Technology", marketCap: 181.68 },
    { name: "ASML Holding N.V.", symbol: "ASML", sector: "Technology", marketCap: 285.58 },
    { name: "Adobe Inc.", symbol: "ADBE", sector: "Technology", marketCap: 293.09 },
    { name: "Cisco Systems Inc.", symbol: "CSCO", sector: "Technology", marketCap: 224.72 },
    { name: "Broadcom Inc.", symbol: "AVGO", sector: "Technology", marketCap: 259.95 },
    { name: "Qualcomm Incorporated", symbol: "QCOM", sector: "Technology", marketCap: 193.17 },
    { name: "Texas Instruments Incorporated", symbol: "TXN", sector: "Technology", marketCap: 169.41 },
    { name: "Intuit Inc.", symbol: "INTU", sector: "Technology", marketCap: 202.45 },
    { name: "Zoom Video Communications Inc.", symbol: "ZM", sector: "Technology", marketCap: 69.15 },
    { name: "Netflix Inc.", symbol: "NFLX", sector: "Communication Services", marketCap: 230.34 },
    { name: "Salesforce.com Inc.", symbol: "CRM", sector: "Technology", marketCap: 193.06 },
    { name: "Pinduoduo Inc. ADR", symbol: "PDD", sector: "Consumer Cyclical", marketCap: 102.32 },
    { name: "Oracle Corporation", symbol: "ORCL", sector: "Technology", marketCap: 187.21 },
    { name: "Costco Wholesale Corporation", symbol: "COST", sector: "Consumer Defensive", marketCap: 230.31 },
    { name: "Comcast Corporation Class A", symbol: "CMCSA", sector: "Communication Services", marketCap: 279.77 },
    { name: "Baidu Inc. ADR", symbol: "BIDU", sector: "Technology", marketCap: 55.29 },
    { name: "Adobe Inc.", symbol: "ADBE", sector: "Technology", marketCap: 293.09 },
    { name: "Applied Materials Inc.", symbol: "AMAT", sector: "Technology", marketCap: 135.98 },
    { name: "Tesla Inc.", symbol: "TSLA", sector: "Consumer Cyclical", marketCap: 735.29 },
    { name: "NVIDIA Corporation", symbol: "NVDA", sector: "Technology", marketCap: 739.47 },
    { name: "American Airlines Group Inc.", symbol: "AAL", sector: "Industrials", marketCap: 12.17 },
    { name: "United Airlines Holdings Inc.", symbol: "UAL", sector: "Industrials", marketCap: 16.38 },
    { name: "Delta Air Lines Inc.", symbol: "DAL", sector: "Industrials", marketCap: 24.87 },
    { name: "Southwest Airlines Co.", symbol: "LUV", sector: "Industrials", marketCap: 35.61 },
    { name: "Alaska Air Group Inc.", symbol: "ALK", sector: "Industrials", marketCap: 8.09 },
    { name: "JetBlue Airways Corporation", symbol: "JBLU", sector: "Industrials", marketCap: 4.71 },
    { name: "Spirit Airlines Inc.", symbol: "SAVE", sector: "Industrials", marketCap: 2.79 },
    { name: "Hawaiian Holdings Inc.", symbol: "HA", sector: "Industrials", marketCap: 0.94 },
    { name: "SkyWest Inc.", symbol: "SKYW", sector: "Industrials", marketCap: 2.69 }
];

const ViewOutput: React.FC<ViewOutputProps> = ({parsedData, template}) => {

    return (
        <div>
            <h1>Mail Merge Output</h1>
            <TableOutput data={fakeData} template={template}/>
        </div>
    )
}

export default ViewOutput