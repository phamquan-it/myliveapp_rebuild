import React from 'react';
interface SearchTextTruncateProps {
    text: string
}

const SearchTextTruncate: React.FC<SearchTextTruncateProps> = ({ text }) => {
    return <div className="text-ellipsis overflow-hidden  whitespace-nowrap" style={{ maxWidth: 48 }}>
        {text}
    </div>
}

export default SearchTextTruncate
