import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // ✅ Ruta por defecto: Portal de Intermediarios (pantalla principal)
  {
    path: '',
    redirectTo: '/portal',
    pathMatch: 'full',
  },

  // ✅ Ruta de login
  {
    path: 'login',
    loadChildren: () => import('./containers/login/login.module').then(m => m.LoginModule),
  },

  // ✅ FAKE LOGIN - Simulación de ingreso IDM (Solo Dev/Stage)
  {
    path: 'fake-login',
    loadChildren: () => import('./containers/fake-login/fake-login.module').then(m => m.FakeLoginModule),
  },

  // ✅ PORTAL DE INTERMEDIARIOS - Pantalla principal inspirada en imagen 1
  {
    path: 'portal',
    loadChildren: () => import('./containers/portal/portal.module').then(m => m.PortalModule),
  },

  // ✅ SELECCIÓN DE PRODUCTOS - Pantalla intermedia entre portal y dashboard
  {
    path: 'product-selection',
    loadChildren: () =>
      import('./containers/product-selection/product-selection.module').then(
        m => m.ProductSelectionModule,
      ),
  },

  // ✅ SELECCIÓN DE MODIFICACIONES - Pantalla intermedia entre portal y modificaciones
  {
    path: 'modification-selection',
    loadChildren: () =>
      import('./containers/modification-selection/modification-selection.module').then(
        m => m.ModificationSelectionModule,
      ),
  },

  // ✅ SISTEMA DE CUMPLIMIENTO - Dashboard con opciones "Emitir/Cotizar" y "Retomar"
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./containers/dashboard/dashboard.module').then(m => m.DashboardModule),
  },

  // ✅ SISTEMA DE CUMPLIMIENTO - Gestión diaria
  {
    path: 'management',
    loadChildren: () =>
      import('./containers/management/management.module').then(m => m.ManagementModule),
  },

  // ✅ SISTEMA DE CUMPLIMIENTO - Formulario policy-input con stepper
  {
    path: 'policy-input',
    loadChildren: () =>
      import('./containers/policy-input/policy-input.module').then(m => m.PolicyInputModule),
  },

  // ✅ VISTA DE DETALLES - Resumen independiente de cotización
  {
    path: 'quote-details/:id',
    loadChildren: () =>
      import('./containers/quote-details/quote-details.module').then(m => m.QuoteDetailsModule),
  },

  // ✅ SISTEMA DE CUMPLIMIENTO - Lector de contratos
  {
    path: 'contract-reader',
    loadChildren: () =>
      import('./containers/contract-reader/contract-reader.module').then(
        m => m.ContractReaderModule,
      ),
  },

  // ✅ SISTEMA DE CUMPLIMIENTO - Lector de estados financieros
  {
    path: 'financial-statement-reader',
    loadChildren: () =>
      import('./containers/financial-statement-reader/financial-statement-reader.module').then(
        m => m.FinancialStatementReaderModule,
      ),
  },

  // ✅ SISTEMA DE CUMPLIMIENTO - Validación de terceros
  {
    path: 'third-party-validation',
    loadChildren: () =>
      import('./containers/third-party-validation/third-party-validation.module').then(
        m => m.ThirdPartyValidationModule,
      ),
  },

  // ✅ SISTEMA DE CUMPLIMIENTO - Validación de límite de crédito
  {
    path: 'credit-limit-validation',
    loadChildren: () =>
      import('./containers/credit-limit-validation/credit-limit-validation.module').then(
        m => m.CreditLimitValidationModule,
      ),
  },

  // ✅ SISTEMA DE CUMPLIMIENTO - Generación automatizada de pólizas
  {
    path: 'policy-generation',
    loadChildren: () =>
      import('./containers/policy-generation/policy-generation.module').then(
        m => m.PolicyGenerationModule,
      ),
  },

  // ✅ SISTEMA DE CUMPLIMIENTO - Configuración del sistema
  {
    path: 'settings',
    loadChildren: () => import('./containers/settings/settings.module').then(m => m.SettingsModule),
  },

  // ✅ SISTEMA DE CUMPLIMIENTO - Modificación de pólizas
  {
    path: 'policy-modification',
    loadChildren: () =>
      import('./containers/policy-modification/policy-modification.module').then(
        m => m.PolicyModificationModule,
      ),
  },

  // ✅ MODIFICACIÓN DE VALOR ASEGURADO - Pantalla específica para disminución/aumento de valor
  {
    path: 'valor-asegurado-modification',
    loadChildren: () =>
      import(
        './containers/policy-modification/valor-asegurado-modification/valor-asegurado-modification.module'
      ).then(m => m.ValorAseguradoModificationModule),
  },

  // ✅ MODIFICACIONES NOMINATIVAS - Pantalla para cambios en datos generales y ubicación del riesgo
  {
    path: 'modificaciones-nominativas',
    loadChildren: () =>
      import(
        './containers/policy-modification/modificaciones-nominativas/modificaciones-nominativas.module'
      ).then(m => m.ModificacionesNominativasModule),
  },

  // ✅ EXISTENTE - Formulario dinámico (mantener compatibilidad)
  {
    path: 'dynamic-form',
    loadChildren: () =>
      import('./containers/dynamic-form/dynamic-form.module').then(m => m.DynamicFormModule),
  },

  // ✅ Mantener compatibilidad con ruta anterior (opcional)
  {
    path: 'formulario-dinamico',
    redirectTo: '/dynamic-form',
    pathMatch: 'full',
  },

  // ✅ Páginas de error
  {
    path: 'error',
    loadChildren: () =>
      import('./shared/components/error-pages/error-pages.module').then(m => m.ErrorPagesModule),
  },

  // ✅ Ruta wildcard para páginas no encontradas - Redirige a error 404
  {
    path: '**',
    redirectTo: '/error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
