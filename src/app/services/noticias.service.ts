import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
	'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

	headlinesPage = 0;

	categoriaActual = '';
	categoriaPage = 0;


  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){
  	query = apiUrl + query;
  	return this.http.get<T>(query, { headers });
  }

  getTopHeadlines(){
  	this.headlinesPage++;
  	//return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f80a40c4e8b0411fbbac449b1abd9a30`);
  	return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategoria(categoria: string){

  	if ( this.categoriaActual === categoria) { 
  		this.categoriaPage++;
  	} else {
  		this.categoriaPage = 1;
  		this.categoriaActual = categoria;
  	}

  	//return this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=f80a40c4e8b0411fbbac449b1abd9a30`);
  	return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${ categoria}&page=${this.categoriaPage}`);
  }

}
