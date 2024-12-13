import React from 'react';

interface MultiselectTextTruncateProps {
    data: string[]
    props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

const MultiselectTextTruncate: React.FC<MultiselectTextTruncateProps> = ({ data = [], props }) => {
    const txt = data.join(", ")
    return <div {...props} className={`${props.className} whitespace-nowrap text-ellipsis overflow-hidden`}>{txt}</div>
}

export default MultiselectTextTruncate
