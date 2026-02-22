import { ApiService } from "../api/api.service";

export class SizeResource extends ApiService {
  constructor() {
    super("/sizes");
  }

  getSizes() {
    return this.get();
  }
}
