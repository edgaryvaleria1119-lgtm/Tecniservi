const productos = [
    {
        id: 1,
        nombre: "Compresores Hermético Industrial",
        descripcion: "Compresor de alta eficiencia para vitrinas refrigeradas y enfriadores comerciales.",
        precio: 1800000,
        imagen: "imagen/compresores.jpeg"
    },
    {
        id: 2,
        nombre: "Cilindro Gas Refrigerante 13kg ",
        descripcion: "Refrigerante ecológico de alta pureza para sistemas de aire acondicionado Inverter.",
        precio: 640000,
        imagen: "imagen/refrigerantes.jpeg"
    },
    {
        id: 3,
        nombre: "Termostato Digital Programable STC-1000",
        descripcion: "Controlador de temperatura con sonda NTC para cuartos fríos y conservadores.",
        precio: 195000,
        imagen: "imagen/termo.jpeg"
    },
    {
        id: 4,
        nombre: "Juego de Manómetros Digitales Dual",
        descripcion: "Kit de medición de alta y baja presión con mangueras reforzadas de 60 pulgadas.",
        precio: 520000,
        imagen: "imagen/manometro.jpeg"
    },
    {
        id: 5,
        nombre: "Bomba de Vacío 5 CFM Doble Etapa",
        descripcion: "Bomba profesional para evacuación de humedad y gases no condensables en sistemas HVAC.",
        precio: 790000,
        imagen: "imagen/bomba.jpeg"
    },
    {
        id: 6,
        nombre: "Unidad de Aire Acondicionado 1HP",
        descripcion: "Unidad completa lista para instalar, viene con su tuberia en cobre y pintura gold fine.",
        precio: 1450000,
        imagen: "imagen/aa.jpeg"
    },
    {
        id: 7,
        nombre: "Filtro Secador Soldable 3/8 Pulgadas",
        descripcion: "Filtro deshidratador de núcleo sólido para retención de humedad y partículas.",
        precio: 42000,
        imagen: "imagen/filtro.jpeg"
    },
    {
        id: 8,
        nombre: "Válvula de Expansión Termostática R22/R404A",
        descripcion: "Válvula reguladora de flujo de refrigerante hacia el evaporador de alta precisión.",
        precio: 615000,
        imagen: "imagen/val1.jpeg"
    },
    {
        id: 9,
        nombre: "Motor Ventilador Axial 16W Condensador",
        descripcion: "Motor multipropósito silencioso con aspas metálicas para condensadores y evaporadores.",
        precio: 110000,
        imagen: "imagen/motor.jpeg"
    },
    {
        id: 10,
        nombre: "Kit de Mantenimiento y Limpieza Serpentines",
        descripcion: "Incluye líquido desincrustante dieléctrico, peine de aletas y cepillo limpiador.",
        precio: 285000,
        imagen: "imagen/3..jpeg"
    }
];

const COSTO_ENVIO_FIJO = 25000;
let carrito = JSON.parse(localStorage.getItem("tecniservi_carrito")) || [];

const gridProductos = document.getElementById("grid-productos");
const tbodyCarrito = document.getElementById("tbody-carrito");
const tablaCarrito = document.getElementById("tabla-carrito");
const mensajeVacio = document.getElementById("mensaje-carrito-vacio");
const contadorCarrito = document.getElementById("contador-carrito");
const totalUnidadesEl = document.getElementById("total-unidades");
const subtotalGeneralEl = document.getElementById("subtotal-general");
const costoEnvioEl = document.getElementById("costo-envio");
const totalPagarEl = document.getElementById("total-pagar");
const btnVaciar = document.getElementById("btn-vaciar-carrito");
const formCheckout = document.getElementById("form-checkout");
const modalConfirmacion = document.getElementById("modal-confirmacion");
const textoConfirmacion = document.getElementById("texto-confirmacion");
const btnCerrarModal = document.getElementById("btn-cerrar-modal");

// Lógica del Carrusel Principal
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".carousel-dot");
const btnPrevSlide = document.getElementById("btn-prev-slide");
const btnNextSlide = document.getElementById("btn-next-slide");
const heroCarousel = document.getElementById("inicio");

let slideActual = 0;
let intervaloCarrusel = null;

function mostrarSlide(index) {
    if (!slides.length) return;
    slideActual = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === slideActual);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === slideActual);
    });
}

function siguienteSlide() {
    mostrarSlide(slideActual + 1);
}

function anteriorSlide() {
    mostrarSlide(slideActual - 1);
}

function iniciarAutoCarrusel() {
    detenerAutoCarrusel();
    if (slides.length > 1) {
        intervaloCarrusel = setInterval(siguienteSlide, 5000);
    }
}

function detenerAutoCarrusel() {
    if (intervaloCarrusel) {
        clearInterval(intervaloCarrusel);
        intervaloCarrusel = null;
    }
}

if (btnNextSlide && btnPrevSlide) {
    btnNextSlide.addEventListener("click", () => {
        siguienteSlide();
        iniciarAutoCarrusel();
    });

    btnPrevSlide.addEventListener("click", () => {
        anteriorSlide();
        iniciarAutoCarrusel();
    });
}

dots.forEach((dot) => {
    dot.addEventListener("click", () => {
        const targetIndex = Number(dot.dataset.slide);
        mostrarSlide(targetIndex);
        iniciarAutoCarrusel();
    });
});

if (heroCarousel) {
    heroCarousel.addEventListener("mouseenter", detenerAutoCarrusel);
    heroCarousel.addEventListener("mouseleave", iniciarAutoCarrusel);
}

function formatearCOP(valor) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
    }).format(valor) + " COP";
}

function guardarCarrito() {
    localStorage.setItem("tecniservi_carrito", JSON.stringify(carrito));
}

function renderizarCatalogo() {
    gridProductos.innerHTML = "";
    const fallbackImg = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='190' viewBox='0 0 300 190'%3E%3Crect fill='%23134074' width='300' height='190'/%3E%3Ctext fill='%23ffffff' font-family='sans-serif' font-size='18' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3ETecniservi %E2%9D%84%EF%B8%8F%3C/text%3E%3C/svg%3E";

    productos.forEach((prod) => {
        const card = document.createElement("article");
        card.className = "card-producto";
        card.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='${fallbackImg}'">
            <div class="card-body">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <div class="precio">${formatearCOP(prod.precio)}</div>
                <button type="button" class="btn-agregar" onclick="agregarAlCarrito(${prod.id})">
                    + Agregar al carrito
                </button>
            </div>
        `;
        gridProductos.appendChild(card);
    });
}

function agregarAlCarrito(idProducto) {
    const productoEncontrado = productos.find((p) => p.id === idProducto);
    if (!productoEncontrado) return;

    const itemEnCarrito = carrito.find((item) => item.id === idProducto);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1;
    } else {
        carrito.push({
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarInterfazCarrito();
}

function cambiarCantidad(idProducto, delta) {
    const item = carrito.find((i) => i.id === idProducto);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        eliminarDelCarrito(idProducto);
        return;
    }

    guardarCarrito();
    actualizarInterfazCarrito();
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter((item) => item.id !== idProducto);
    guardarCarrito();
    actualizarInterfazCarrito();
}

btnVaciar.addEventListener("click", () => {
    if (carrito.length === 0) return;
    carrito = [];
    guardarCarrito();
    actualizarInterfazCarrito();
});

function actualizarInterfazCarrito() {
    tbodyCarrito.innerHTML = "";
    let totalUnidades = 0;
    let subtotalGeneral = 0;

    if (carrito.length === 0) {
        tablaCarrito.classList.add("oculto");
        btnVaciar.classList.add("oculto");
        mensajeVacio.classList.remove("oculto");
    } else {
        tablaCarrito.classList.remove("oculto");
        btnVaciar.classList.remove("oculto");
        mensajeVacio.classList.add("oculto");

        carrito.forEach((item) => {
            const subtotalProducto = item.precio * item.cantidad;
            totalUnidades += item.cantidad;
            subtotalGeneral += subtotalProducto;

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td><strong>${item.nombre}</strong></td>
                <td>${formatearCOP(item.precio)}</td>
                <td>
                    <div class="controles-cantidad">
                        <button type="button" class="btn-cant" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button type="button" class="btn-cant" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                    </div>
                </td>
                <td><strong>${formatearCOP(subtotalProducto)}</strong></td>
                <td>
                    <button type="button" class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">✕ Eliminar</button>
                </td>
            `;
            tbodyCarrito.appendChild(fila);
        });
    }

    const costoEnvio = carrito.length > 0 ? COSTO_ENVIO_FIJO : 0;
    const totalPagar = subtotalGeneral + costoEnvio;

    contadorCarrito.textContent = totalUnidades;
    totalUnidadesEl.textContent = totalUnidades;
    subtotalGeneralEl.textContent = formatearCOP(subtotalGeneral);
    costoEnvioEl.textContent = formatearCOP(costoEnvio);
    totalPagarEl.textContent = formatearCOP(totalPagar);
}

formCheckout.addEventListener("submit", (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
        alert("⚠️ El carrito está vacío. Agrega al menos un producto antes de finalizar la compra.");
        return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

    if (!nombre || !correo || !telefono || !direccion) {
        alert("⚠️ Por favor completa todos los campos obligatorios de entrega.");
        return;
    }

    const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const totalFinal = subtotal + COSTO_ENVIO_FIJO;

    textoConfirmacion.innerHTML = `
        Gracias por tu compra, <strong>${nombre}</strong>.<br>
        Hemos registrado tu pedido por un valor total de <strong>${formatearCOP(totalFinal)}</strong>.<br><br>
        <small>Dirección de entrega: ${direccion} | Confirmación enviada a: ${correo}</small>
    `;

    modalConfirmacion.classList.remove("oculto");

    carrito = [];
    guardarCarrito();
    actualizarInterfazCarrito();
    formCheckout.reset();
});

btnCerrarModal.addEventListener("click", () => {
    modalConfirmacion.classList.add("oculto");
});

renderizarCatalogo();
actualizarInterfazCarrito();
iniciarAutoCarrusel();
