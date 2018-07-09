export class SearchResult {
  id: string;
  title: string;
  summary: string;
  image: string;
  alt: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.title = obj && obj.title || null;
    this.summary = obj && obj.summary || null;
    this.image = obj && obj.image || null;
    this.alt = obj && obj.alt || `https://book.douban.com/subject/${this.id}/`;
  }
}
