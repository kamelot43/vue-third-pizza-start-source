import { ApiService } from "../api/api.service";

export class SauceResource extends ApiService {
  constructor() {
    super("/sauces");
  }

  getSauces() {
    return this.get();
  }
}
