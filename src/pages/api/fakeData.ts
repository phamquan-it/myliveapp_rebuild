const fakeData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 3, name: 'Sam Smith', email: 'sam@example.com' },
  ];
  
  export default function handler(req:any, res:any) {
    // Check the request method
    if (req.method === 'GET') {
      // Return the fake data for GET requests
      res.status(200).json(fakeData);
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }