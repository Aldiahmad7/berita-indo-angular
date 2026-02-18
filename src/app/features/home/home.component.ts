import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NewsService, NewsItem } from '../../core/services/news.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allNews: NewsItem[] = [];

  headlineList: NewsItem[] = [];
  currentHeadlineIndex = 0;

  popular: NewsItem[] = [];

  recommendations: NewsItem[] = [];
  paginatedRecommendations: NewsItem[] = [];

  currentPage = 1;
  pageSize = 12;

  isHomePage = true;
  currentCategory = 'terbaru';

  totalResults = 97;

  Math = Math;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const kategori = params.get('kategori');

      if (!kategori) {
        this.isHomePage = true;
        this.currentCategory = 'terbaru';
      } else {
        this.isHomePage = false;
        this.currentCategory = kategori;
      }

      this.loadNews(this.currentCategory);
    });
  }

  loadNews(category: string) {
    this.newsService.getNews(category).subscribe((data) => {
      this.allNews = data;

      if (this.isHomePage) {
        this.headlineList = data.slice(0, 1);

        this.popular = data.slice(1, 4);

        this.recommendations = data.slice(4);
      } else {
        this.headlineList = [];
        this.popular = [];
        this.recommendations = data;
      }

      this.currentHeadlineIndex = 0;
      this.currentPage = 1;
      this.updateRecommendationPage();
    });
  }

  get currentHeadline(): NewsItem {
    return this.headlineList[this.currentHeadlineIndex];
  }

  nextHeadline() {
    if (this.currentHeadlineIndex < this.headlineList.length - 1) {
      this.currentHeadlineIndex++;
    }
  }

  prevHeadline() {
    if (this.currentHeadlineIndex > 0) {
      this.currentHeadlineIndex--;
    }
  }

  updateRecommendationPage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedRecommendations = this.recommendations.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateRecommendationPage();
  }

  get totalPages(): number[] {
    const total = Math.ceil(this.recommendations.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
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
        month: 'long',
        year: 'numeric'
      };
      return date.toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateString;
    }
  }

  getCategory(item: NewsItem): string {
    return (item as any).category || this.currentCategory || 'Nasional';
  }
}
