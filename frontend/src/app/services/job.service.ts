import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class JobService {
  private API = environment.apiUrl + '/api/jobs';

  constructor(private http: HttpClient) {}

  getJobs() {
    return this.http.get<any[]>(this.API, {
      withCredentials: true
    });
  }

  createJob(data: any) {
    return this.http.post(this.API, data, {
      withCredentials: true
    });
  }

  updateJob(id: string, data: any) {
  return this.http.put(`${this.API}/${id}`, data, {
    withCredentials: true
  });
}

  deleteJob(id: string) {
    return this.http.delete(`${this.API}/${id}`, {
      withCredentials: true
    });
  }
}