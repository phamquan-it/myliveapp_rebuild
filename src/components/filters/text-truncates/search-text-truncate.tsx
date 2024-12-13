import React from 'react';
interface SearchTextTruncateProps {
    text: string
}

const SearchTextTruncate: React.FC<SearchTextTruncateProps> = ({ text }) => {
    return <div className="w-12 text-ellipsis overflow-hidden">
        {text}
    </div>
}

export default SearchTextTruncate
