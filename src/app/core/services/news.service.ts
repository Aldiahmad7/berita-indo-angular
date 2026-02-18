import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable, catchError, of } from 'rxjs'

export interface NewsItem {
  title: string
  link: string
  pubDate: string
  description: string
  thumbnail: string
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly BASE_URL = '/api/cnn-news'

  constructor(private http: HttpClient) {}
  getNews(category: string = 'terbaru'): Observable<NewsItem[]> {
    const endpoint =
      !category || category === 'terbaru'
        ? this.BASE_URL
        : `${this.BASE_URL}/${category}`

    return this.http.get<any>(endpoint).pipe(
      map(res => {

        if (res?.data?.posts) {
          return res.data.posts
        }

        if (Array.isArray(res?.data)) {
          return res.data
        }

        return []
      }),
      catchError(err => {
        console.error('❌ API ERROR:', err)
        return of([])
      })
    )
  }
}
