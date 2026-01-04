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
  standalone: false
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
    { value: 'PE', label: 'PE - Permiso de Permanencia' }
  ];
  
  tiposUsuario = [
    { value: '48', label: '48 - Administrativo' },
    { value: '2', label: '2 - Intermediario' }
  ];
  
  tiposNomina = [
    { value: '1', label: '1 - Administrativo' },
    { value: '2', label: '2 - Grupos Homogéneos - Bancaseguros' },
    { value: '4', label: '4 - Intermediarios de Seguros' },
    { value: '7', label: '7 - Aprendices y Practicantes' },
    { value: '8', label: '8 - Personal por Honorarios' },
    { value: '9', label: '9 - Temporales o trabajadores en misión' },
    { value: '10', label: '10 - Outsourcing' }
  ];

  // ========================================
  // MODELO DE DATOS - VALORES POR DEFECTO
  // ========================================
  
  fakeLoginData = {
    employeeType: 'NT',           // Tipo de documento
    userName: '860352541',         // Número de documento
    fullName: 'DAVID COHEN Y CIA LIMITADA AGENCIA DE SEGUROS', // Nombre
    sbCodeActBenef: '2',          // Tipo de usuario (2 = Intermediario)
    usrSubTipo: '4',              // Tipo de nómina (4 = Intermediarios)
    workForceId: '54384',          // Clave de intermediación
    email: 'correoprueba@segurosbolivar.com',
    usrLocationCode: '1505',       // Código de localidad
    company: '3',                  // Código de compañía
    jobCode: 'V11200',             // Código del cargo
    country: '1'                   // País
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
    this.tipoIngreso = this.fakeLoginData.sbCodeActBenef === '48' ? 'administrativo' : 'intermediario';
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
      employeeType: 'NT',
      userName: '860352541',
      fullName: 'DAVID COHEN Y CIA LIMITADA AGENCIA DE SEGUROS',
      sbCodeActBenef: '2',
      usrSubTipo: '4',
      workForceId: '54384',
      email: 'correoprueba@segurosbolivar.com',
      usrLocationCode: '1505',
      company: '3',
      jobCode: 'V11200',
      country: '1'
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
      country: '1'
    };
    this.actualizarTipoIngreso();
  }

  /**
   * Carga valores de ejemplo para Intermediario
   */
  cargarEjemploIntermediario(): void {
    this.fakeLoginData = {
      employeeType: 'NT',
      userName: '860069265',
      fullName: 'AON RISK SERVICES COLOMBIA SA CORREDORES DE SEGURO',
      sbCodeActBenef: '2',
      usrSubTipo: '4',
      workForceId: '32289',
      email: 'ejemplo@aon.com',
      usrLocationCode: '1025',
      company: '2',
      jobCode: 'V11400',
      country: '1'
    };
    this.actualizarTipoIngreso();
  }

  /**
   * Envía los datos del fake login y redirige al portal
   */
  onSubmit(): void {
    this.isLoading = true;

    // Simular llamada al servicio (en producción esto iría a Redis)
    setTimeout(() => {
      // Guardar datos en sessionStorage para simular sesión
      const sessionData = {
        ...this.fakeLoginData,
        tipoUsuario: this.tipoIngreso,
        timestamp: new Date().toISOString(),
        isAuthenticated: true
      };
      
      sessionStorage.setItem('fakeLoginSession', JSON.stringify(sessionData));
      
      this.isLoading = false;
      this.showSuccess = true;

      // Redirigir a la página de cotización después de mostrar éxito
      setTimeout(() => {
        this.router.navigate(['/policy-input']);
      }, 1500);
    }, 1000);
  }

  /**
   * Obtiene la etiqueta del tipo de documento seleccionado
   */
  getLabelTipoDocumento(): string {
    const tipo = this.tiposDocumento.find(t => t.value === this.fakeLoginData.employeeType);
    return tipo ? tipo.label : '';
  }
}

