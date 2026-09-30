// ==========================================
// EJERCICIO: CÁLCULO DE SALARIOS
// ==========================================

// 1. Datos originales de los empleados
const empleados = [
    {
        nombre: "Ana",
        salarioBase: 450.00,
        horasExtra: [5, 2],
        antiguedad: 4,
        descuento: 46.16
    },
    {
        nombre: "Luis",
        salarioBase: 550.00,
        horasExtra: [],
        antiguedad: 1,
        descuento: 56.38
    },
    {
        nombre: "Marta",
        salarioBase: 480.00,
        horasExtra: [2],
        antiguedad: 5,
        descuento: 49.20
    }
];


// ==========================================
// 2. Calcular pago de horas extra
// ==========================================

// tarifa tiene $4.00 por defecto
// ...horas recibe una cantidad variable de registros
function calcularHorasExtra(
    ...horas: number[]
): number {
    const tarifa: number = 4.00;

    if (horas.length === 0) {
        return 0;
    }

    let totalHoras: number = 0;

    for (const hora of horas) {
        totalHoras += hora;
    }

    return totalHoras * tarifa;
}


// ==========================================
// 3. Calcular salario bruto
// ==========================================

function calcularSalarioBruto(
    salarioBase: number,
    pagoHorasExtra: number
): number {
    return salarioBase + pagoHorasExtra;
}


// ==========================================
// 4. Bono mediante callback tipado
// ==========================================

// Tipo del callback:
// recibe años de antigüedad y devuelve un número
type CalcularBono = (antiguedad: number) => number;


// Función que determina el bono
function determinarBono(antiguedad: number): number {
    if (antiguedad >= 3) {
        return 20.00;
    }

    return 0;
}


// Función que recibe la antigüedad y el callback
function obtenerBono(
    antiguedad: number,
    callback: CalcularBono
): number {
    return callback(antiguedad);
}


// ==========================================
// 5. Calcular salario neto
// ==========================================

function calcularSalarioNeto(
    salarioBruto: number,
    bono: number,
    descuento?: number
): number {

    const totalAntesDescuento: number = salarioBruto + bono;

    // Si no se proporciona descuento
    if (descuento === undefined) {
        return totalAntesDescuento;
    }

    return totalAntesDescuento - descuento;
}


// ==========================================
// 6. Total de nómina mediante recursividad
// ==========================================

function calcularTotalNomina(
    salarios: number[]
): number {

    if (salarios.length === 0) {
        return 0;
    }

    const primerSalario = salarios[0];

    if (primerSalario === undefined) {
        return 0;
    }

    const restantes: number[] = salarios.slice(1);

    return primerSalario + calcularTotalNomina(restantes);
}


// ==========================================
// 7. Procesar empleados
// ==========================================

const salariosNetos: number[] = [];

console.log("==========================================");
console.log("       NÓMINA DE LA EMPRESA");
console.log("==========================================");

for (const empleado of empleados) {

    // Calcular horas extra
    const pagoHorasExtra: number =
        calcularHorasExtra(...empleado.horasExtra);

    // Calcular salario bruto
    const salarioBruto: number =
        calcularSalarioBruto(
            empleado.salarioBase,
            pagoHorasExtra
        );

    // Calcular bono usando callback
    const bono: number =
        obtenerBono(
            empleado.antiguedad,
            determinarBono
        );

    // Calcular salario neto
    const salarioNeto: number =
        calcularSalarioNeto(
            salarioBruto,
            bono,
            empleado.descuento
        );

    // Guardar salario neto
    salariosNetos.push(salarioNeto);

    // Mostrar resultado
    console.log(`Empleado: ${empleado.nombre}`);
    console.log(`Salario base: $${empleado.salarioBase.toFixed(2)}`);
    console.log(`Pago horas extra: $${pagoHorasExtra.toFixed(2)}`);
    console.log(`Salario bruto: $${salarioBruto.toFixed(2)}`);
    console.log(`Bono: $${bono.toFixed(2)}`);
    console.log(`Descuento: $${empleado.descuento.toFixed(2)}`);
    console.log(`Salario neto: $${salarioNeto.toFixed(2)}`);
    console.log("------------------------------------------");
}


// ==========================================
// Total de la nómina
// ==========================================

const totalNomina: number =
    calcularTotalNomina(salariosNetos);

console.log(`TOTAL DE LA NÓMINA: $${totalNomina.toFixed(2)}`);


// ==========================================
// COMPROBACIONES
// ==========================================

console.log("\n==========================================");
console.log("          COMPROBACIONES");
console.log("==========================================");

// Empleado sin horas extra
const sinHorasExtra: number = calcularHorasExtra();

console.log(
    `Empleado sin horas extra: $${sinHorasExtra.toFixed(2)}`
);

// Llamada sin descuento
const salarioSinDescuento: number =
    calcularSalarioNeto(500, 20);

console.log(
    `Salario sin descuento: $${salarioSinDescuento.toFixed(2)}`
);

// Arreglo vacío
const arregloVacio: number[] = [];

const totalVacio: number =
    calcularTotalNomina(arregloVacio);

console.log(
    `Total de arreglo vacío: $${totalVacio.toFixed(2)}`
);