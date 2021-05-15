import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampaignModalComponent } from './create-campaign-modal.component';

describe('CreateCampaignModalComponent', () => {
  let component: CreateCampaignModalComponent;
  let fixture: ComponentFixture<CreateCampaignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCampaignModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
