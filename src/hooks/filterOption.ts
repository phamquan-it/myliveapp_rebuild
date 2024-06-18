const filterOption:any = (input: string, option?: { label: string; value: string, key: string }) =>
    (option?.key ?? '').toLowerCase().includes(input.toLowerCase());
export default filterOption