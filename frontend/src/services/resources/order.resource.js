import { ApiService } from "../api/api.service";

export class OrderResource extends ApiService {
  constructor() {
    super(`/orders`);
  }

  getOrders() {
    return this.get();
  }

  createOrder(order) {
    return this.post(order);
  }

  removeOrder(id) {
    return this.delete(id);
  }
}
