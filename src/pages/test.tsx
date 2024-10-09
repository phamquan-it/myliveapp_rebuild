import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect } from 'react'
import Reloadbtn from './reloadbtn';

function Todos() {

    // Queries
    //
    const { data, isFetching, isError } = useQuery({
        queryKey: ['todos'],
        queryFn: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(Math.random());
                }, 2000); // Delay of 2 seconds
            });
        }
    });

    // Mutations

    useEffect(() => {
        console.log(data)
    }, [data])
    if (isFetching) return 'loading...'
    return (
        <div>
            {data}
            <Reloadbtn />
        </div>
    )
}

export default Todos

