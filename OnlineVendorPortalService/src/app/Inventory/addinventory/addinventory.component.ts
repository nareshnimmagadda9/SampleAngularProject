import { Component, OnInit, OnDestroy } from '@angular/core';
import { QrCodeReader } from '~/../src/app/auth/qr-code-reader.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-addinventory',
  templateUrl: './addinventory.component.html',
  styleUrls: ['./addinventory.component.css']
})
export class AddinventoryComponent implements OnInit {
  subscription: Subscription;
  inventoryID: string="abcd";
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
  onFileChange(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedString => {
        this.inventoryID = decodedString;
        console.log('Value is : ' + decodedString)
      });
  }
  constructor(private qrReader: QrCodeReader) { }

  ngOnInit() {

  }


}
