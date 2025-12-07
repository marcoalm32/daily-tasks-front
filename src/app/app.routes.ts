import { Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { NoAuthGuard } from './shared/guard/no-auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => AuthModule),
        canActivate: [NoAuthGuard]
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/tasks',
                pathMatch: 'full'
            },
            {
                path: 'tasks',
                loadChildren: () => import('./task/task.module').then(m => m.TaskModule)
            }
        ]
    },
    { path: '**', redirectTo: 'auth/login' }
];
