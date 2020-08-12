import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TimerComponent } from 'src/app/pages/timer/timer.component';
import { FaqComponent } from 'src/app/pages/faq/faq.component';
import { SponserComponent } from 'src/app/pages/sponser/sponser.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: SponserComponent },
    { path: 'dashboard_manager',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'faq',           component: FaqComponent },
    { path: 'sponsor',           component: SponserComponent },
    { path: 'market',           component: SponserComponent },
    { path: 'bonus',           component: TimerComponent },
];
