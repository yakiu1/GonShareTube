import { initialState } from './../../../state/reducers/app.reducer';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { VideoFormComponent } from './video-form.component';

describe('VideoFormComponent', () => {
  let component: VideoFormComponent;
  let fixture: ComponentFixture<VideoFormComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoFormComponent],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Parse Youtub URL tag expect be RAKts-97hi4', () => {
    const url = 'https://www.youtube.com/watch?v=RAKts-97hi4&feature=youtu.be&ab_channel=HGon&fbclid=IwAR04Wqq0MXTx0_Uksz4Wc19d12BUm-Fz3MvkaIjw4-wdJKAwzVnKVviH8dY';
    const tag = component.parseURLToTag(url);
    expect(tag).toBe('RAKts-97hi4');
  })

});
