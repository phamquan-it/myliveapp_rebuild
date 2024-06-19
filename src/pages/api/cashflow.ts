// pages/api/generate.js

export default function handler(req:any, res:any) {
    try {
      // Extract query parameters from the request
      const {
        total = 100,
        offset = 0,
        limit = 10,
        keyword = '',
      } = req.query;
  
      // Convert query parameters to appropriate types
      const totalInt = parseInt(total, 10);
      const offsetInt = parseInt(offset, 10);
      const limitInt = parseInt(limit, 10);
  
      // Check for NaN values and set defaults if necessary
      if (isNaN(totalInt) || isNaN(offsetInt) || isNaN(limitInt)) {
        throw new Error("Invalid query parameters");
      }
  
      // Generate data
      const result = generateData(totalInt, offsetInt, limitInt, keyword);
  
      // Send response
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  function generateData(total = 100, offset = 0, limit = 10, keyword = '') {
    const actions = ["create order", "deposit", "destroy order", "withdrawal", "transfer"];
    const emails = ["john", "jane", "sam", "alice", "bob", "charlie", "dave", "eve", "frank", "grace"];
    const domains = ["example.com", "sample.com", "test.com", "demo.com"];
    
    const data = Array.from({ length: total }, (_, index) => ({
      id: index + 1,
      email: `${emails[index % emails.length]}@${domains[index % domains.length]}`,
      action: actions[index % actions.length],
      money: (index + 1) * 100,
      fund: (index % 10) + 1,
      createdAt: new Date().toISOString() // Add createdAt field
    }));
  
    // Apply keyword filter if keyword is provided
    const filteredData = keyword ? data.filter(item => 
      item.email.includes(keyword) || 
      item.action.includes(keyword)
    ) : data;
  
    // Get the paginated result
    const paginatedData = filteredData.slice(offset, offset + limit);
  
    return {
      total: filteredData.length,
      offset,
      limit,
      keyword,
      data: paginatedData,
    };
  }
  