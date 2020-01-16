import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export enum Icons {
  Word  = 'doc',
  Excel = 'xls',
  Ppt   = 'ppt'
}

@Injectable({
  providedIn: 'root'
})
export class IconServiceService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  public registerIcons(): void {
    this.loadIcons(Object.values(Icons), 'assets/');
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
  }
}
