import { NgModule } from "@angular/core";
import { LimitTextPipe } from "./limit-text.pipe";

@NgModule({
  declarations: [LimitTextPipe],
  exports: [LimitTextPipe]
})
export class PipeModule {}