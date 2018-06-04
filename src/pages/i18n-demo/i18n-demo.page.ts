import { Component } from '@angular/core';


import { NavController } from 'ionic-angular';
import { availableLanguages, sysOptions } from './i18n-demo.constants';
import { TranslateService } from 'ng2-translate';
import { HomePage } from '../home/home';

@Component({
	templateUrl: 'i18n-demo.html'
})
export class I18nDemoPage {
    languages = availableLanguages;
	selectedLanguage = sysOptions.systemLanguage;

	param = { value: 'world' };

	private translate: TranslateService;

	constructor(translate: TranslateService, public navCtrl: NavController) {
		this.translate = translate;

	}

	applyLanguage() {
		this.translate.use(this.selectedLanguage);
	}
    goAnOtherPage(){
		this.navCtrl.push(HomePage);
	}

}