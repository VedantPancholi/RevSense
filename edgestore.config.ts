import { createEdgeStoreNextConfig } from '@edgestore/server/config';

export default createEdgeStoreNextConfig({
  workspace: 'main',
  apiKey: process.env.EDGE_STORE_ACCESS_KEY,
}); 