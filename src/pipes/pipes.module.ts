import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { SummaryPipe } from './summary/summary';
@NgModule({
	declarations: [ThumbnailPipe,
    SummaryPipe],
	imports: [],
	exports: [ThumbnailPipe,
    SummaryPipe]
})
export class PipesModule {}
