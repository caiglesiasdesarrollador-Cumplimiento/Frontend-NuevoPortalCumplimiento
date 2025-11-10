import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {
  private baseUrl = `${environment.apiGateway.baseUrl}/${environment.apiGateway.stage}`;
  private lambdaUrl = `${this.baseUrl}${environment.apiGateway.endpoints.lambda}`;
  private ecsUrl = `${this.baseUrl}${environment.apiGateway.endpoints.ecs}`;

  constructor(private http: HttpClient) {}

  getLambdaData(): Observable<string> {
    return this.http.get(this.lambdaUrl, { responseType: 'text' });
  }

  getEcsData(): Observable<string> {
    return this.http.get(this.ecsUrl, { responseType: 'text' });
  }

  // Método para obtener datos con POST (ejemplo para Lambda)
  postLambdaData(data: any): Observable<string> {
    return this.http.post(this.lambdaUrl, data, { responseType: 'text' });
  }

  // Método para obtener datos con POST (ejemplo para ECS)
  postEcsData(data: any): Observable<string> {
    return this.http.post(this.ecsUrl, data, { responseType: 'text' });
  }
}
