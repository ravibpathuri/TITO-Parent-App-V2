import { StylePipe } from './style.pipe';
import {DomSanitizer} from "@angular/platform-browser";
describe('StylePipe', () => {
  it('create an instance', () => {
    const pipe = new StylePipe(this.DomSanitizer);
    expect(pipe).toBeTruthy();
  });
});
