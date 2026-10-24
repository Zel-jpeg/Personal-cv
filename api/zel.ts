import { handleZelRequest } from '../server/zel.ts';

export default {
  fetch(request: Request) {
    return handleZelRequest(request);
  },
};
