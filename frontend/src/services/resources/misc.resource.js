import { ApiService } from "../api/api.service";

export class MiscResource extends ApiService {
  constructor() {
    super("/misc");
  }

  getMisc() {
    return this.get();
  }
}
