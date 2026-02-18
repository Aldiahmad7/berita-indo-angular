import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NewsService, NewsItem } from '../../core/services/news.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  news!: NewsItem | null;
  popular: NewsItem[] = [];
  relatedNews: NewsItem[] = [];

  constructor(
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.news = history.state.data;

    console.log('DETAIL DATA:', this.news);

    if (!this.news) {
      this.router.navigate(['/']);
    }

    this.loadPopularNews();
  }

  loadPopularNews() {
    this.newsService.getNews('terbaru').subscribe((data) => {
      this.popular = data.slice(0, 3);
      this.relatedNews = data.slice(3, 7);
    });
  }

  goToDetail(item: NewsItem) {
    this.router.navigate(['/detail'], {
      state: { data: item },
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      };
      return date.toLocaleDateString('id-ID', options).replace(/\./g, '');
    } catch (e) {
      return dateString;
    }
  }

  getCategory(item: NewsItem): string {
    return (item as any).category || 'Nasional';
  }
}
