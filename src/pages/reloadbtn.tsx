import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message, App } from 'antd';
import React from 'react';

const Reloadbtn = () => {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: () => Promise.resolve([]),
        onSuccess: () => {
            // Invalidate and refetch
            message.success("OK")
            queryClient.invalidateQueries({ queryKey: ['vpsData'] })
        },
    })

    return <>
        <App>
            <button
                onClick={() => {
                    mutate()
                }}
            >
                Add Todo
            </button>
        </App>
    </>
}

export default Reloadbtn
