import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormsCoreModule } from '@ng2-dynamic-forms/core';
import { SyndesisCommonModule } from '../common/common.module';

import { SetupRootComponent } from './setup-root.component';
import { GitHubOAuthSetupComponent } from './github-oauth.component';

const routes: Routes = [
  {
    path: '',
    component: SetupRootComponent,
    children: [
      {
        path: 'github-account',
        component: GitHubOAuthSetupComponent,
      },
      {
        path: '',
        redirectTo: 'github-account',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    RouterModule.forChild(routes),
    SyndesisCommonModule,
  ],
  exports: [],
  declarations: [
    SetupRootComponent,
    GitHubOAuthSetupComponent,
  ],
  providers: [],
})
export class SetupModule {}
