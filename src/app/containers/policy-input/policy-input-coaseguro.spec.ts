/**
 * ✅ RF-007 Regla 7.5: Pruebas Unitarias para Coaseguro
 * 
 * Cobertura completa de:
 * - Tipo de coaseguro (Sin Coaseguro, Cedido, Aceptado)
 * - Restricción para usuarios intermediarios
 * - Coaseguro Cedido (agregar/editar/eliminar)
 * - Validación de participación total ≤ 100%
 * - Ajuste automático de participación de Bolívar
 * - Coaseguro Aceptado
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyInputComponent } from './policy-input.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CupoService } from '../../shared/services/cupo.service';
import { GrupoBolivarService } from '../../shared/services/grupo-bolivar.service';
import { ProgramaService } from '../../shared/services/programa.service';
import { ClienteValidacionService } from '../../shared/services/cliente-validacion.service';
import { ProductoValidacionService } from '../../shared/services/producto-validacion.service';
import { ClienteEnfoqueService } from '../../shared/services/cliente-enfoque.service';

describe('PolicyInputComponent - RF-007 Regla 7.5: Coaseguro', () => {
  let component: PolicyInputComponent;
  let fixture: ComponentFixture<PolicyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PolicyInputComponent,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        CupoService,
        GrupoBolivarService,
        ProgramaService,
        ClienteValidacionService,
        ProductoValidacionService,
        ClienteEnfoqueService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Tipo de Coaseguro - Selección y Por Defecto', () => {
    it('debe inicializar con "Sin Coaseguro" por defecto', () => {
      expect(component.tipoCoaseguro).toBe('sin-coaseguro');
    });

    it('debe cambiar a "Cedido" cuando se selecciona', () => {
      component.tipoCoaseguro = 'cedido';
      component.onTipoCoaseguroChange();
      
      expect(component.tipoCoaseguro).toBe('cedido');
      expect(component.coasegurosCedidos.length).toBe(1);
      expect(component.coasegurosCedidos[0].coaseguradora).toBe(component.COASEGURADORA_BOLIVAR);
      expect(component.coasegurosCedidos[0].participacion).toBe(100);
      expect(component.coasegurosCedidos[0].esDefecto).toBe(true);
    });

    it('debe cambiar a "Aceptado" cuando se selecciona', () => {
      component.tipoCoaseguro = 'aceptado';
      component.onTipoCoaseguroChange();
      
      expect(component.tipoCoaseguro).toBe('aceptado');
      expect(component.coasegurosCedidos.length).toBe(0);
    });

    it('debe limpiar coaseguros cuando se cambia a "Sin Coaseguro"', () => {
      // Arrange: Configurar con coaseguro cedido
      component.tipoCoaseguro = 'cedido';
      component.onTipoCoaseguroChange();
      component.coasegurosCedidos.push({
        coaseguradora: '2 - SEGUROS GENERALES SURAMERICANA S.A.',
        participacion: 20,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });
      component.coaseguroAceptadoCoaseguradora = '24 - LIBERTY SEGUROS S.A.';
      component.coaseguroAceptadoNumeroPol = '1000345678901';

      // Act
      component.tipoCoaseguro = 'sin-coaseguro';
      component.onTipoCoaseguroChange();

      // Assert
      expect(component.coasegurosCedidos.length).toBe(0);
      expect(component.coaseguroAceptadoCoaseguradora).toBe('');
      expect(component.coaseguroAceptadoNumeroPol).toBe('');
      expect(component.coaseguroAceptadoCertificado).toBe('');
      expect(component.coaseguroAceptadoParticipacion).toBe(20);
    });
  });

  describe('Restricción para Usuarios Intermediarios', () => {
    it('debe deshabilitar radio buttons para usuarios intermediarios', () => {
      component.tipoUsuario = 'intermediario';
      fixture.detectChanges();

      const radioButtons = fixture.nativeElement.querySelectorAll('input[name="tipoCoaseguro"]');
      radioButtons.forEach((radio: HTMLInputElement) => {
        expect(radio.disabled).toBe(true);
      });
    });

    it('debe ocultar sección de Coaseguro Cedido para usuarios intermediarios', () => {
      component.tipoUsuario = 'intermediario';
      component.tipoCoaseguro = 'cedido';
      fixture.detectChanges();

      const seccionCedido = fixture.nativeElement.querySelector('.coaseguro-subsection');
      expect(seccionCedido).toBeNull();
    });

    it('debe ocultar sección de Coaseguro Aceptado para usuarios intermediarios', () => {
      component.tipoUsuario = 'intermediario';
      component.tipoCoaseguro = 'aceptado';
      fixture.detectChanges();

      const seccionAceptado = fixture.nativeElement.querySelector('.coaseguro-subsection');
      expect(seccionAceptado).toBeNull();
    });

    it('debe permitir acceso para usuarios administrativos', () => {
      component.tipoUsuario = 'administrador';
      component.tipoCoaseguro = 'cedido';
      fixture.detectChanges();

      const radioButtons = fixture.nativeElement.querySelectorAll('input[name="tipoCoaseguro"]');
      radioButtons.forEach((radio: HTMLInputElement) => {
        expect(radio.disabled).toBe(false);
      });
    });
  });

  describe('Coaseguro Cedido - Agregar', () => {
    beforeEach(() => {
      component.tipoCoaseguro = 'cedido';
      component.tipoUsuario = 'administrador';
      component.onTipoCoaseguroChange();
    });

    it('debe abrir modal para agregar coaseguro cedido', () => {
      component.abrirModalCoaseguroCedido();

      expect(component.showModalCoaseguroCedido).toBe(true);
      expect(component.coaseguroCedidoEditIndex).toBeNull();
      expect(component.coaseguroCedidoCoaseguradora).toBe('');
      expect(component.coaseguroCedidoParticipacion).toBe(0);
      expect(component.errorParticipacionCoaseguro).toBe('');
    });

    it('debe agregar coaseguro cedido correctamente', () => {
      component.coaseguroCedidoCoaseguradora = '2 - SEGUROS GENERALES SURAMERICANA S.A.';
      component.coaseguroCedidoParticipacion = 20;
      component.coaseguroCedidoGastosAdmin = 2;
      component.coaseguroCedidoNumeroPol = 'POL123';
      component.coaseguroCedidoCertificado = 'CERT456';

      component.guardarCoaseguroCedido();

      expect(component.coasegurosCedidos.length).toBe(2); // Bolívar + nuevo
      expect(component.coasegurosCedidos[1].coaseguradora).toBe('2 - SEGUROS GENERALES SURAMERICANA S.A.');
      expect(component.coasegurosCedidos[1].participacion).toBe(20);
      expect(component.coasegurosCedidos[1].gastosAdmin).toBe(2);
      expect(component.coasegurosCedidos[1].numeroPol).toBe('POL123');
      expect(component.coasegurosCedidos[1].certificado).toBe('CERT456');
      expect(component.coasegurosCedidos[1].esDefecto).toBe(false);
      expect(component.showModalCoaseguroCedido).toBe(false);
    });

    it('debe actualizar participación de Bolívar al agregar coaseguro', () => {
      component.coaseguroCedidoCoaseguradora = '2 - SEGUROS GENERALES SURAMERICANA S.A.';
      component.coaseguroCedidoParticipacion = 30;

      component.guardarCoaseguroCedido();

      const bolivarIndex = component.coasegurosCedidos.findIndex(c => c.esDefecto);
      expect(component.coasegurosCedidos[bolivarIndex].participacion).toBe(70);
    });

    it('NO debe agregar si falta coaseguradora', () => {
      component.coaseguroCedidoCoaseguradora = '';
      component.coaseguroCedidoParticipacion = 20;

      const initialLength = component.coasegurosCedidos.length;
      component.guardarCoaseguroCedido();

      expect(component.coasegurosCedidos.length).toBe(initialLength);
    });

    it('NO debe agregar si falta participación', () => {
      component.coaseguroCedidoCoaseguradora = '2 - SEGUROS GENERALES SURAMERICANA S.A.';
      component.coaseguroCedidoParticipacion = 0;

      const initialLength = component.coasegurosCedidos.length;
      component.guardarCoaseguroCedido();

      expect(component.coasegurosCedidos.length).toBe(initialLength);
    });
  });

  describe('Coaseguro Cedido - Editar', () => {
    beforeEach(() => {
      component.tipoCoaseguro = 'cedido';
      component.tipoUsuario = 'administrador';
      component.onTipoCoaseguroChange();
      component.coasegurosCedidos.push({
        coaseguradora: '2 - SEGUROS GENERALES SURAMERICANA S.A.',
        participacion: 20,
        gastosAdmin: 2,
        numeroPol: 'POL123',
        certificado: 'CERT456',
        esDefecto: false,
      });
      component.actualizarParticipacionBolivar();
    });

    it('debe abrir modal con datos del coaseguro a editar', () => {
      component.editarCoaseguroCedido(1);

      expect(component.showModalCoaseguroCedido).toBe(true);
      expect(component.coaseguroCedidoEditIndex).toBe(1);
      expect(component.coaseguroCedidoCoaseguradora).toBe('2 - SEGUROS GENERALES SURAMERICANA S.A.');
      expect(component.coaseguroCedidoParticipacion).toBe(20);
      expect(component.coaseguroCedidoGastosAdmin).toBe(2);
      expect(component.coaseguroCedidoNumeroPol).toBe('POL123');
      expect(component.coaseguroCedidoCertificado).toBe('CERT456');
      expect(component.errorParticipacionCoaseguro).toBe('');
    });

    it('debe actualizar coaseguro existente correctamente', () => {
      component.editarCoaseguroCedido(1);
      component.coaseguroCedidoParticipacion = 25;
      component.coaseguroCedidoGastosAdmin = 3;

      component.guardarCoaseguroCedido();

      expect(component.coasegurosCedidos[1].participacion).toBe(25);
      expect(component.coasegurosCedidos[1].gastosAdmin).toBe(3);
      expect(component.coasegurosCedidos.length).toBe(2); // No se agrega uno nuevo
    });

    it('debe actualizar participación de Bolívar al editar coaseguro', () => {
      component.editarCoaseguroCedido(1);
      component.coaseguroCedidoParticipacion = 40; // Aumenta de 20 a 40

      component.guardarCoaseguroCedido();

      const bolivarIndex = component.coasegurosCedidos.findIndex(c => c.esDefecto);
      expect(component.coasegurosCedidos[bolivarIndex].participacion).toBe(60); // 100 - 40
    });
  });

  describe('Coaseguro Cedido - Eliminar', () => {
    beforeEach(() => {
      component.tipoCoaseguro = 'cedido';
      component.tipoUsuario = 'administrador';
      component.onTipoCoaseguroChange();
      component.coasegurosCedidos.push({
        coaseguradora: '2 - SEGUROS GENERALES SURAMERICANA S.A.',
        participacion: 20,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });
      component.actualizarParticipacionBolivar();
    });

    it('NO debe permitir eliminar la fila de Bolívar', () => {
      const initialLength = component.coasegurosCedidos.length;
      component.eliminarCoaseguroCedido(0); // Bolívar está en índice 0

      expect(component.coasegurosCedidos.length).toBe(initialLength);
      expect(component.showAlertaEliminarCoaseguro).toBe(false);
    });

    it('debe mostrar alerta de confirmación al eliminar', () => {
      component.eliminarCoaseguroCedido(1);

      expect(component.showAlertaEliminarCoaseguro).toBe(true);
      expect(component.coaseguroAEliminarIndex).toBe(1);
    });

    it('debe cancelar eliminación correctamente', () => {
      component.eliminarCoaseguroCedido(1);
      component.cancelarEliminarCoaseguro();

      expect(component.showAlertaEliminarCoaseguro).toBe(false);
      expect(component.coaseguroAEliminarIndex).toBeNull();
      expect(component.coasegurosCedidos.length).toBe(2);
    });

    it('debe eliminar coaseguro al confirmar', () => {
      component.eliminarCoaseguroCedido(1);
      component.confirmarEliminarCoaseguro();

      expect(component.coasegurosCedidos.length).toBe(1); // Solo queda Bolívar
      expect(component.showAlertaEliminarCoaseguro).toBe(false);
      expect(component.coaseguroAEliminarIndex).toBeNull();
    });

    it('debe actualizar participación de Bolívar al eliminar coaseguro', () => {
      component.eliminarCoaseguroCedido(1);
      component.confirmarEliminarCoaseguro();

      const bolivarIndex = component.coasegurosCedidos.findIndex(c => c.esDefecto);
      expect(component.coasegurosCedidos[bolivarIndex].participacion).toBe(100);
    });
  });

  describe('Validación de Participación Total ≤ 100%', () => {
    beforeEach(() => {
      component.tipoCoaseguro = 'cedido';
      component.tipoUsuario = 'administrador';
      component.onTipoCoaseguroChange();
    });

    it('debe validar participación en tiempo real', () => {
      component.coaseguroCedidoParticipacion = 101;
      component.validarParticipacionCoaseguro();

      expect(component.errorParticipacionCoaseguro).toBe('La participación no puede superar el 100%');
    });

    it('debe validar que la suma total no supere 100% al agregar', () => {
      component.coasegurosCedidos.push({
        coaseguradora: '2 - SEGUROS GENERALES SURAMERICANA S.A.',
        participacion: 60,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });
      component.actualizarParticipacionBolivar();

      component.coaseguroCedidoCoaseguradora = '3 - Otra Coaseguradora';
      component.coaseguroCedidoParticipacion = 50; // 60 + 50 = 110 > 100

      component.guardarCoaseguroCedido();

      expect(component.errorParticipacionCoaseguro).toContain('La participación total no puede superar el 100%');
      expect(component.coasegurosCedidos.length).toBe(2); // No se agregó el nuevo
    });

    it('debe validar que la suma total no supere 100% al editar', () => {
      component.coasegurosCedidos.push({
        coaseguradora: '2 - SEGUROS GENERALES SURAMERICANA S.A.',
        participacion: 20,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });
      component.coasegurosCedidos.push({
        coaseguradora: '3 - Otra Coaseguradora',
        participacion: 50,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });
      component.actualizarParticipacionBolivar();

      component.editarCoaseguroCedido(1);
      // Participación disponible: 100 - (50 - 20) = 70%
      // Intentamos poner 80%, que es mayor a 70%, debería fallar
      component.coaseguroCedidoParticipacion = 80; // 50 - 20 + 80 = 110 > 100

      component.guardarCoaseguroCedido();

      expect(component.errorParticipacionCoaseguro).toContain('La participación total no puede superar el 100%');
      expect(component.coasegurosCedidos[1].participacion).toBe(20); // No se actualizó
    });

    it('debe permitir participación válida que no supere 100%', () => {
      component.coaseguroCedidoCoaseguradora = '2 - SEGUROS GENERALES SURAMERICANA S.A.';
      component.coaseguroCedidoParticipacion = 30;

      component.guardarCoaseguroCedido();

      expect(component.errorParticipacionCoaseguro).toBe('');
      expect(component.coasegurosCedidos.length).toBe(2);
    });

    it('debe calcular participación disponible correctamente', () => {
      component.coasegurosCedidos.push({
        coaseguradora: '2 - SEGUROS GENERALES SURAMERICANA S.A.',
        participacion: 40,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });
      component.actualizarParticipacionBolivar();

      component.coaseguroCedidoParticipacion = 61; // 40 + 61 = 101 > 100
      component.validarParticipacionCoaseguro();

      expect(component.errorParticipacionCoaseguro).toContain('Participación disponible: 60%');
    });
  });

  describe('Ajuste Automático de Participación de Bolívar', () => {
    beforeEach(() => {
      component.tipoCoaseguro = 'cedido';
      component.tipoUsuario = 'administrador';
      component.onTipoCoaseguroChange();
    });

    it('debe calcular participación de Bolívar como 100% cuando no hay otros coaseguros', () => {
      component.actualizarParticipacionBolivar();

      const bolivarIndex = component.coasegurosCedidos.findIndex(c => c.esDefecto);
      expect(component.coasegurosCedidos[bolivarIndex].participacion).toBe(100);
    });

    it('debe calcular participación de Bolívar como resto al agregar coaseguros', () => {
      component.coasegurosCedidos.push({
        coaseguradora: '2 - SEGUROS GENERALES SURAMERICANA S.A.',
        participacion: 30,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });
      component.coasegurosCedidos.push({
        coaseguradora: '3 - Otra Coaseguradora',
        participacion: 20,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });

      component.actualizarParticipacionBolivar();

      const bolivarIndex = component.coasegurosCedidos.findIndex(c => c.esDefecto);
      expect(component.coasegurosCedidos[bolivarIndex].participacion).toBe(50); // 100 - 30 - 20
    });

    it('debe establecer participación de Bolívar en 0% si otros coaseguros suman 100%', () => {
      component.coasegurosCedidos.push({
        coaseguradora: '2 - SEGUROS GENERALES SURAMERICANA S.A.',
        participacion: 100,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });

      component.actualizarParticipacionBolivar();

      const bolivarIndex = component.coasegurosCedidos.findIndex(c => c.esDefecto);
      expect(component.coasegurosCedidos[bolivarIndex].participacion).toBe(0);
    });

    it('debe recalcular participación de Bolívar al eliminar coaseguro', () => {
      component.coasegurosCedidos.push({
        coaseguradora: '2 - SEGUROS GENERALES SURAMERICANA S.A.',
        participacion: 30,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });
      component.actualizarParticipacionBolivar();

      component.eliminarCoaseguroCedido(1);
      component.confirmarEliminarCoaseguro();

      const bolivarIndex = component.coasegurosCedidos.findIndex(c => c.esDefecto);
      expect(component.coasegurosCedidos[bolivarIndex].participacion).toBe(100);
    });
  });

  describe('Coaseguro Aceptado', () => {
    beforeEach(() => {
      component.tipoCoaseguro = 'aceptado';
      component.tipoUsuario = 'administrador';
      component.onTipoCoaseguroChange();
    });

    it('debe inicializar campos de coaseguro aceptado', () => {
      expect(component.coaseguroAceptadoCoaseguradora).toBe('');
      expect(component.coaseguroAceptadoNumeroPol).toBe('');
      expect(component.coaseguroAceptadoCertificado).toBe('');
      expect(component.coaseguroAceptadoParticipacion).toBe(20);
    });

    it('debe limpiar coaseguros cedidos al cambiar a aceptado', () => {
      component.tipoCoaseguro = 'cedido';
      component.onTipoCoaseguroChange();
      component.coasegurosCedidos.push({
        coaseguradora: '2 - SEGUROS GENERALES SURAMERICANA S.A.',
        participacion: 20,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });

      component.tipoCoaseguro = 'aceptado';
      component.onTipoCoaseguroChange();

      expect(component.coasegurosCedidos.length).toBe(0);
    });
  });

  describe('Métodos Auxiliares', () => {
    beforeEach(() => {
      component.tipoCoaseguro = 'cedido';
      component.tipoUsuario = 'administrador';
      component.onTipoCoaseguroChange();
    });

    it('debe calcular total de participación de coaseguros correctamente', () => {
      component.coasegurosCedidos.push({
        coaseguradora: '2 - SEGUROS GENERALES SURAMERICANA S.A.',
        participacion: 30,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });
      component.coasegurosCedidos.push({
        coaseguradora: '3 - Otra Coaseguradora',
        participacion: 20,
        gastosAdmin: 0,
        numeroPol: '',
        certificado: '',
        esDefecto: false,
      });

      const total = component.getTotalParticipacionCoaseguro();

      expect(total).toBe(150); // 100 (Bolívar) + 30 + 20
    });

    it('debe cerrar modal correctamente', () => {
      component.showModalCoaseguroCedido = true;
      component.coaseguroCedidoEditIndex = 1;

      component.cerrarModalCoaseguroCedido();

      expect(component.showModalCoaseguroCedido).toBe(false);
      expect(component.coaseguroCedidoEditIndex).toBeNull();
    });
  });
});
