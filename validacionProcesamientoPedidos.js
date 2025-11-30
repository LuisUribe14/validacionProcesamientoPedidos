const productos = [
    { nombre: "Laptop", precio: 15000 },
    { nombre: "Mouse", precio: 300 },
    { nombre: "Teclado", precio: 500 },
    { nombre: "Audifonos", precio: 600 },
    { nombre: "Monitor", precio: 4500 }
];

const promociones = {
    "PROMO1": 0.10,  
    "PROMO2": 0.20,  
    "PROMO3": 0.30   
};

const validarNombreCliente = (nombre) => 
    typeof nombre === "string" && nombre.trim().length >= 3;

const validarProducto = (producto) => 
    productos.some(p => p.nombre.toLowerCase() === producto.toLowerCase());

const validarCantidad = (cantidad) => 
    Number.isInteger(cantidad) && cantidad > 0;

const validarPromocion = (codigo) => 
    !codigo || promociones[codigo] !== undefined;

const obtenerPrecioProducto = (nombreProducto) => {
    const prod = productos.find(p => p.nombre.toLowerCase() === nombreProducto.toLowerCase());
    return prod ? prod.precio : null;
};

const calcularSubtotal = (precio, cantidad) => precio * cantidad;

const aplicarDescuento = (subtotal, codigoPromo) => {
    if (!codigoPromo) return subtotal;
    const descuento = promociones[codigoPromo];
    return subtotal - (subtotal * descuento);
};

const generarReporte = (pedido, subtotal, totalFinal) => {
    console.log("=========== REPORTE DEL PEDIDO ===========");
    console.log(`Cliente:        ${pedido.nombre}`);
    console.log(`Producto:       ${pedido.producto}`);
    console.log(`Cantidad:       ${pedido.cantidad}`);
    console.log(`Subtotal:       $${subtotal}`);
    console.log(`Promocion:      ${pedido.promo || "Ninguna"}`);
    console.log(`Total final:    $${totalFinal}`);
    console.log("==========================================");
};

const procesarPedido = (pedido) => {

    console.log("Procesando pedido...\n");

    const { nombre, producto, cantidad, promo } = pedido;

    if (!validarNombreCliente(nombre)) {
        console.error("nombre invalido debe tener minimo 3 caracteres.");
        return;
    }

    if (!validarProducto(producto)) {
        console.error("el producto no existe.");
        return;
    }

    if (!validarCantidad(cantidad)) {
        console.error("cantidad invalida. Debe ser un entero mayor a 0.");
        return;
    }

    if (!validarPromocion(promo)) {
        console.error("codigo de promocion invalido.");
        return;
    }

    const precioUnit = obtenerPrecioProducto(producto);
    const subtotal = calcularSubtotal(precioUnit, cantidad);
    const totalFinal = aplicarDescuento(subtotal, promo);

    generarReporte(pedido, subtotal, totalFinal);
};

const pedidoEjemplo = {
    nombre: "Juan Pablo",
    producto: "Laptop",
    cantidad: 2,
    promo: "PROMO1"
};

procesarPedido(pedidoEjemplo);
