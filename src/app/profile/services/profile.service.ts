import { Injectable } from '@angular/core';
import { AbstractService } from '../../shared/abstract/abstract.service';
import { PersonalInfoModel } from '../models/personal-info.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends AbstractService<PersonalInfoModel> {

  constructor(
    protected override readonly http: HttpClient
  ) {
    super('personal-info', http);
  }

  
}
