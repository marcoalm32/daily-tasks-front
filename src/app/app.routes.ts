import { Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => AuthModule)
    },
    {
        path: '',
        component: LayoutComponent,
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
