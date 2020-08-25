import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  
  private count =0;
  private spinner$ = new BehaviorSubject<string>('');

  
  constructor() { }
}
