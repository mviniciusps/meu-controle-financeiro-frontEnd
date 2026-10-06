import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        loadComponent: () =>
            import('./layout/layout.component')
                .then(m => m.LayoutComponent),

        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/dashboard.component')
                        .then(m => m.DashboardComponent)
            },
            {
                path: 'lancamentos',
                loadComponent: () =>
                    import('./features/lancamentos/lancamentos.component')
                        .then(m => m.LancamentosComponent)
            },
            {
                path: 'cartoes',
                loadComponent: () =>
                    import('./features/cartoes/cartoes.component')
                        .then(m => m.CartoesComponent)
            },
            {
                path: 'relatorios',
                loadComponent: () =>
                    import('./features/relatorios/relatorios.component')
                        .then(m => m.RelatoriosComponent)
            },
            {
                path: 'objetivos',
                loadComponent: () =>
                    import('./features/objetivos/objetivos.component')
                        .then(m => m.ObjetivosComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];