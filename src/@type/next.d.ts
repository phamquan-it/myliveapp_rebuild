// types/next.d.ts
import 'next';

declare module 'next' {
  // Extend the NextPage type to allow the `Layout` property
  interface NextPage {
    Layout?: React.ComponentType; // You can make it more specific if needed
  }
}

