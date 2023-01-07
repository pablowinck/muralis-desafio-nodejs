export class Pageable {
  private readonly _page: number;
  private readonly _size: number;

  constructor(page: number, size: number) {
    this._page = page;
    this._size = size;
  }

  get page(): number {
    return this._page;
  }

  get size(): number {
    return this._size;
  }
}
