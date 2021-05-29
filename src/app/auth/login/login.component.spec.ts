import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['signIn']);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [{provide: AuthService, useValue: mockAuthService}],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
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

  it('should be true when invalid form', () => {
    component.form.controls['email'].setValue('check.point@');
    component.form.controls['password'].setValue('231');
    expect(component.form.invalid).toBeTruthy();
  });

  it('should navigate on submit', async () => {
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('1234567');
    mockAuthService.signIn.and.returnValue(Promise.resolve(undefined));
    component.submit();
    await fixture.whenStable();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set error on error', async () => {
    component.form.controls['email'].setValue('alex@test.com');
    component.form.controls['password'].setValue('1234325');
    debugger;
    mockAuthService.signIn.and.returnValue(Promise.reject({message: 'error'}));
    component.submit();
    debugger;
    console.log(component.error);
    await fixture.whenStable();

    expect(component.error).toEqual('error');
  });
});
