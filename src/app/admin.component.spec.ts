import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { AdminAppComponent } from '../app/admin.component';

beforeEachProviders(() => [AdminAppComponent]);

describe('App: Admin', () => {
  it('should create the app',
      inject([AdminAppComponent], (app: AdminAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'admin works!\'',
      inject([AdminAppComponent], (app: AdminAppComponent) => {
    expect(app.title).toEqual('admin works!');
  }));
});
