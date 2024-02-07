import React from "react";

interface ViewOutputProps {
    parsedData: object[] | null;
    template: string | null;
}

const ViewOutput: React.FC<ViewOutputProps> = ({parsedData, template}) => {

    return (
        <div>
            <h1>Mail Merge Output</h1>
        </div>
    )
}

export default ViewOutput