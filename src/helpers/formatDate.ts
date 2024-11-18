import moment from "moment"

const subtractDate = (num: number) => {
    return moment().subtract(num, 'months').format('MM/YYYY')
}

export {
    subtractDate
} 
