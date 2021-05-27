import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {HeaderComponent} from '../../shared/header/header.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const MockAuthService: any = {
    signIn: () => {
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [{provide: AuthService, useValue: MockAuthService}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 2 controls', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  // it('should render error message', () => {
  //   const errorMessage = 'Error';
  //   component.error = errorMessage;
  //   console.log(component.error);
  //   const debug = fixture.debugElement.query(By.css('.form__error'));
  //   const el: HTMLElement = debug.nativeElement.textContent;
  //   expect(el).toContain(errorMessage);
  // });
});
