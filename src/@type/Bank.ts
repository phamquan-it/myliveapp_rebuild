interface Bank{
    id:number,
    name:  string,
    shortname: string,
    logo:  string,
    bin?: number
}
interface InfoBankPayment{
    accountNo: string,
    accountName: string,
    bank: Bank
}