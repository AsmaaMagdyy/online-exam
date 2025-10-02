import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { BASE_URL } from 'authLib';
import { environment } from './core/environment/environment';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { questionsReducer } from './store/questions/questions.reducer';
import { QuestionsEffects } from './store/questions/questions.effects';
import { errorsInterceptor } from './error.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
    {
        provide: BASE_URL,
        useValue: environment.baseUrl
    },
    provideHttpClient(withFetch(), withInterceptors([headersInterceptor,errorsInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),
    provideAnimations(),
    provideToastr(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideRouter(routes, withHashLocation(), withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
    })),
    provideStore({
        questions:questionsReducer
    }),
    provideEffects([QuestionsEffects])
]
};
