import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the WildflowerFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wildflower-filter',
  templateUrl: 'wildflower-filter.html',
})
export class WildflowerFilterPage {

  private qryString: string;
  @Output('qryString') queryEmitter = new EventEmitter();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WildflowerFilterPage');
  }

  onInput() {
    //this.queryEmitter.emit(this.qryString);
    //this.viewCtrl.dismiss(this.qryString);
  }
  search() {
    this.viewCtrl.dismiss(this.qryString);
  }

}
