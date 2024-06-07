// pages/api/fake-delete.js
export default function handler(req:any, res:any) {
    if (req.method === "DELETE") {
      // Simulate successful deletion (HTTP 204 No Content)
      res.status(204).end();
    } else {
        console.log(req.method);
        
      // Handle other HTTP methods (e.g., GET, POST, PUT)
      res.status(405).end(); // Method Not Allowed
    }
  }
  