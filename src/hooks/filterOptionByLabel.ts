const filterOptionByLabel:any = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
export default filterOptionByLabel