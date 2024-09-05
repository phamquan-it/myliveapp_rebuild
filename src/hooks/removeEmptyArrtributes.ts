function removeEmptyAttributes(obj:any) {
  for (const key in obj) {
    if (obj[key] === '') {
      delete obj[key];
    }
  }
  return obj;
}
export default  removeEmptyAttributes
