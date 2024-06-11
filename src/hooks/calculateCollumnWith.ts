const calculateColumnWidth = <T, >(data: T[], key: keyof T, formatter: (text: any) => string): number => {
    let maxLength = 0;
    data.forEach(item => {
      const text = formatter(item[key]);
      if (text.length > maxLength) {
        maxLength = text.length;
      }
    });
    return maxLength * 8; // Adjust multiplier as necessary
  };