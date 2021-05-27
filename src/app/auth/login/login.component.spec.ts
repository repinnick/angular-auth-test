import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {User} from '../../shared/interfaces';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const MockAuthService: any = {
    signIn: (user: User) => {
      return new Promise(resolve => resolve(user));
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [{provide: AuthService, useValue: MockAuthService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('should render error message', () => {
    const errorMessage = 'Error';
    component.error = errorMessage;
    fixture.detectChanges();
    const debug = fixture.debugElement.query(By.css('.form__error'));
    const el: HTMLElement = debug.nativeElement.textContent;
    expect(el).toContain(errorMessage);
  });

  it('component initial state', () => {
    expect(component.submit).toBeDefined();
    expect(component.googleAuth).toBeDefined();
    expect(component.facebookAuth).toBeDefined();
    expect(component.githubAuth).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
    expect(component.error).toBeUndefined();
  });

  it('error should be undefined when submit() and valid form', () => {
    component.form.controls['email'].setValue('check.point@gmail.com');
    component.form.controls['password'].setValue('234325');
    component.submit();
    expect(component.error).toBeUndefined();
  });

  it('should be true when invalid form', () => {
    component.form.controls['email'].setValue('check.point@');
    component.form.controls['password'].setValue('231');
    expect(component.form.invalid).toBeTruthy();
  });

  // it('should submit if form is valid', () => {
  //   component.form.value.password = '234253';
  //   component.form.value.email = 'ch.point@gmail.com';
  //   const x = component.submit();
  // });
});
