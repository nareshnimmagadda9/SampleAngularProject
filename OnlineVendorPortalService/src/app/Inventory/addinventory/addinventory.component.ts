import { Component, OnInit, OnDestroy } from '@angular/core';
import { QrCodeReader } from '~/../src/app/auth/qr-code-reader.service';
import { Subscription } from 'rxjs/Subscription';
import { inventoryInfo } from '~/../src/app/model/inventoryInfo';
declare var $: any;

@Component({
  selector: 'app-addinventory',
  templateUrl: './addinventory.component.html',
  styleUrls: ['./addinventory.component.css']
})
export class AddinventoryComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  inventoryID: string;
  inventoryInfo: inventoryInfo[] = [{
    InventoryID: "",
    ItemID: "",
    ItemDescription: "",
    ItemName: "",
    ItemQuantity: ""
  }];
  ngOnDestroy(): void {
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }
  onFileChange(event) {
    $("#InventoryTable").addClass("hide");
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedString => {
        this.inventoryID = decodedString;
        if (this.inventoryID == "123435ASDFTY56G4F8876") {
          this.inventoryInfo["ItemDescription"] = "Cement Grade 3 has been ordered for approval";
          this.inventoryInfo["ItemID"] = "1020";
          this.inventoryInfo["ItemName"] = "Cement Grade 3";
          this.inventoryInfo["ItemQuantity"] = "300";
        } else {
          this.inventoryInfo["ItemDescription"] = "10MM AGGR has been ordered for approval";
          this.inventoryInfo["ItemID"] = "1120";
          this.inventoryInfo["ItemName"] = "AGGR";
          this.inventoryInfo["ItemQuantity"] = "250";
        }
        $("#InventoryTable").removeClass("hide");
      });
  }
  constructor(private qrReader: QrCodeReader) { }
  ngOnInit() {

  }


}
