import { Injectable } from '@angular/core';
import { AbstractService } from '../../shared/abstract/abstract.service';
import { PersonalInfoModel } from '../models/personal-info.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../shared/models/response-api';
import { environment } from '../../../environments/environment';
import { AccountSecurityDTO } from '../models/dto/account-security.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends AbstractService<PersonalInfoModel> {

  constructor(
    protected override readonly http: HttpClient
  ) {
    super(environment.apiUrl + '/profile', http);
  }

  getProfile(): Observable<ResponseApi<PersonalInfoModel>> {
    return this.http.get<ResponseApi<PersonalInfoModel>>(this.endpoint);
  }

  override update(id: string, item: PersonalInfoModel): Observable<ResponseApi<PersonalInfoModel>> {
    return this.http.put<ResponseApi<PersonalInfoModel>>(`${this.endpoint}/personal-info/${id}`, item);
  }

  updatePassword(id: string, item: AccountSecurityDTO): Observable<ResponseApi<boolean>> {
    return this.http.put<ResponseApi<boolean>>(`${this.endpoint}/account-security/${id}`, item);
  }

  
}
