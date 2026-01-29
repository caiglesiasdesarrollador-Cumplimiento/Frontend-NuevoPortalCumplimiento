import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * FakeLoginComponent - Simulación de ingreso IDM para desarrollo
 *
 * Este componente simula el ingreso del usuario a través del IDM (Identity Management)
 * para ambientes de desarrollo y staging.
 */
@Component({
  selector: 'app-fake-login',
  templateUrl: './fake-login.component.html',
  styleUrls: ['./fake-login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FakeLoginComponent implements OnInit {
  // ========================================
  // OPCIONES DE DROPDOWNS
  // ========================================

  tiposDocumento = [
    { value: 'CC', label: 'CC - Cédula de ciudadanía' },
    { value: 'NT', label: 'NT - Nit' },
    { value: 'CE', label: 'CE - Cédula de Extranjería' },
    { value: 'PP', label: 'PP - Pasaporte' },
    { value: 'PE', label: 'PE - Permiso de Permanencia' },
  ];

  tiposUsuario = [
    { value: '48', label: '48 - Administrativo' },
    { value: '2', label: '2 - Intermediario' },
  ];

  tiposNomina = [
    { value: '1', label: '1 - Administrativo' },
    { value: '2', label: '2 - Grupos Homogéneos - Bancaseguros' },
    { value: '4', label: '4 - Intermediarios de Seguros' },
    { value: '7', label: '7 - Aprendices y Practicantes' },
    { value: '8', label: '8 - Personal por Honorarios' },
    { value: '9', label: '9 - Temporales o trabajadores en misión' },
    { value: '10', label: '10 - Outsourcing' },
  ];

  // ========================================
  // MODELO DE DATOS - VALORES POR DEFECTO
  // ========================================

  fakeLoginData = {
    employeeType: 'CC', // Tipo de documento (CC funciona en Postman)
    userName: '53049440', // Número de documento que funciona en Postman
    fullName: 'USUARIO PRUEBAS DEV', // Nombre
    sbCodeActBenef: '2', // Tipo de usuario (2 = Intermediario)
    usrSubTipo: '4', // Tipo de nómina (4 = Intermediarios) 
    workForceId: '54384', // Clave de intermediación
    email: 'correoprueba@segurosbolivar.com',
    usrLocationCode: '1505', // Código de localidad
    company: '3', // Código de compañía
    jobCode: 'V11200', // Código del cargo
    country: '1', // País
  };

  // Estado del formulario
  isLoading = false;
  showSuccess = false;
  tipoIngreso: 'intermediario' | 'administrativo' = 'intermediario';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.actualizarTipoIngreso();
  }

  /**
   * Actualiza el tipo de ingreso basado en sbCodeActBenef
   */
  actualizarTipoIngreso(): void {
    this.tipoIngreso =
      this.fakeLoginData.sbCodeActBenef === '48' ? 'administrativo' : 'intermediario';
  }

  /**
   * Manejador cuando cambia el tipo de usuario
   */
  onTipoUsuarioCambio(): void {
    this.actualizarTipoIngreso();

    // Ajustar tipo de nómina según tipo de usuario
    if (this.fakeLoginData.sbCodeActBenef === '48') {
      // Administrativo
      this.fakeLoginData.usrSubTipo = '1';
    } else {
      // Intermediario
      this.fakeLoginData.usrSubTipo = '4';
    }
  }

  /**
   * Reinicia el formulario a valores por defecto
   */
  onReset(): void {
    this.fakeLoginData = {
      employeeType: 'CC',
      userName: '49787610',
      fullName: 'USUARIO PRUEBAS DEV',
      sbCodeActBenef: '2',
      usrSubTipo: '4',
      workForceId: '54384',
      email: 'correoprueba@segurosbolivar.com',
      usrLocationCode: '1505',
      company: '3',
      jobCode: 'V11200',
      country: '1',
    };
    this.actualizarTipoIngreso();
  }

  /**
   * Carga valores de ejemplo para Administrativo
   * Datos: CINDY VIVIANA CAMACHO AREVALO
   */
  cargarEjemploAdministrativo(): void {
    this.fakeLoginData = {
      employeeType: 'CC',
      userName: '53049440',
      fullName: 'CINDY VIVIANA CAMACHO AREVALO',
      sbCodeActBenef: '48',
      usrSubTipo: '1',
      workForceId: '16659',
      email: 'cindy.camacho@segurosbolivar.com',
      usrLocationCode: '',
      company: '2',
      jobCode: 'E96160',
      country: '1',
    };
    this.actualizarTipoIngreso();
  }

  /**
   * Carga valores de ejemplo para Intermediario
   * Usando documento que funciona en Postman: 53049440 con CC
   */
  cargarEjemploIntermediario(): void {
    this.fakeLoginData = {
      employeeType: 'CC', // Tipo que funciona en Postman
      userName: '53049440', // Documento que funciona en Postman
      fullName: 'USUARIO PRUEBAS INTERMEDIARIO',
      sbCodeActBenef: '2',
      usrSubTipo: '4',
      workForceId: '54384',
      email: 'correoprueba@segurosbolivar.com',
      usrLocationCode: '1505',
      company: '3',
      jobCode: 'V11200',
      country: '1',
    };
    this.actualizarTipoIngreso();
  }

  /**
   * ✅ Envía los datos del fake login y redirige al redirect
   * El redirect será el encargado de consultar Multiclaves según el documento
   */
  onSubmit(): void {
    this.isLoading = true;
    this.showSuccess = false;

    // ✅ Guardar datos de sesión básicos (sin consultar Multiclaves aún)
    const timestamp = new Date().toISOString();
    const sessionData = {
      ...this.fakeLoginData,
      tipoUsuario: this.tipoIngreso,
      timestamp,
      isAuthenticated: true,
    };
    sessionStorage.setItem('fakeLoginSession', JSON.stringify(sessionData));

    // ✅ Preparar parámetros para el redirect
    const redirectParams = {
      company: this.fakeLoginData.company,
      country: this.fakeLoginData.country,
      email: this.fakeLoginData.email,
      employeeType: this.fakeLoginData.employeeType,
      fullName: this.fakeLoginData.fullName,
      jobCode: this.fakeLoginData.jobCode,
      usrLocationCode: this.fakeLoginData.usrLocationCode,
      sbCodeActBenef: this.fakeLoginData.sbCodeActBenef,
      userName: this.fakeLoginData.userName,
      workForceId: this.fakeLoginData.workForceId,
      usrSubTipo: this.fakeLoginData.usrSubTipo,
    };

    this.showSuccess = true;
    this.isLoading = false;

    // ✅ Redirigir al redirect (quien consultará Multiclaves)
    setTimeout(() => {
      this.router.navigate(['/redirect'], { queryParams: redirectParams });
    }, 500);
  }

  /**
   * Obtiene la etiqueta del tipo de documento seleccionado
   */
  getLabelTipoDocumento(): string {
    const tipo = this.tiposDocumento.find(t => t.value === this.fakeLoginData.employeeType);
    return tipo ? tipo.label : '';
  }
}
