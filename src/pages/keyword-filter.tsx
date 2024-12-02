import { Button, Form, Input } from 'antd';
import React, { useRef, useState } from 'react';
interface KeywordFilterProps {
    form?: any
}

const KeywordFilter: React.FC<KeywordFilterProps> = () => {
    const inputRef = useRef<any>(null); // Create a ref for the input field

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current?.focus(); // Set focus to the input field
        }
    };
    const [keyw, setKeyw] = useState("test")
    return <>
        <Input
            ref={inputRef} // Attach the ref to the input
            value="test"
            className="me-2"
        />
        <Button type="primary" onClick={handleFocus}>
            Focus Input
        </Button>
    </>
}

export default KeywordFilter
