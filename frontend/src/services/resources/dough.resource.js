import { ApiService } from "../api/api.service";

export class DoughResource extends ApiService {
  constructor() {
    super("/dough");
  }

  getDoughs() {
    return this.get();
  }
}
