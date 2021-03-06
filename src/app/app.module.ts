import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './shared/header/header.component';
import {SignupComponent} from './auth/singup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {PostComponent} from './home/post/post.component';
import {CreatePostComponent} from './home/create-post/create-post.component';
import { EditPostComponent } from './home/edit-post/edit-post.component';
import { PostInfoComponent } from './home/post-info/post-info.component';
import {RouterModule} from '@angular/router';
import {SortPipe} from './shared/pipes/sort.pipe';
import {TagsSortPipe} from './shared/pipes/tags-sort.pipe';
import {DateFilterPipe} from './shared/pipes/date-filter.pipe';
import {AnsweredUnansweredPipe} from './shared/pipes/answered-unanswered.pipe';
import {MyquestionsPipe} from './shared/pipes/myquestions.pipe';
import {ModerationFilterPipe} from './shared/pipes/moderation-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    CreatePostComponent,
    PostComponent,
    EditPostComponent,
    PostInfoComponent,
    SortPipe,
    TagsSortPipe,
    DateFilterPipe,
    AnsweredUnansweredPipe,
    MyquestionsPipe,
    ModerationFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
