import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  // ARRAY DONDE SE GUARDAN LOS PRODUCTOS
  const [productos, setProductos] = useState([]);
  // OBJETO PARA MANEJAR EL FORMULARIO
  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    compra: "",
    venta: "",
  });

  // CAPTURA LOS DATOS DE LOS INPUTS
  const handleChange = (e) => {

    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  // FUNCIÓN PARA GUARDAR PRODUCTOS
  const guardarProducto = (e) => {

    // EVITA QUE LA PÁGINA SE RECARGUE
    e.preventDefault();

    // VALIDAR CAMPOS VACÍOS
    if (
      producto.id === "" ||
      producto.nombre === "" ||
      producto.descripcion === "" ||
      producto.compra === "" ||
      producto.venta === ""
    ) {

      alert("Todos los campos son obligatorios");
      return;
    }

    // VALIDAR QUE EL PRECIO DE VENTA
    // SEA MAYOR AL DE COMPRA
    if (parseFloat(producto.venta) <= parseFloat(producto.compra)) {

      alert("El precio de venta debe ser mayor al precio de compra");
      return;
    }

    // AGREGAR PRODUCTO AL ARRAY
    setProductos([...productos, producto]);

    // MENSAJE DE ÉXITO
    alert("Producto guardado correctamente");

    // LIMPIAR FORMULARIO
    setProducto({
      id: "",
      nombre: "",
      descripcion: "",
      compra: "",
      venta: "",
    });
  };

  // FUNCIÓN PARA ELIMINAR PRODUCTOS
  const eliminarProducto = (id) => {

    // VENTANA DE CONFIRMACIÓN
    const confirmar = window.confirm(
      "¿Seguro que desea eliminar el producto?"
    );

    // SI EL USUARIO ACEPTA
    if (confirmar) {

      // FILTRAR PRODUCTOS DIFERENTES AL ID
      const nuevaLista = productos.filter(
        (item) => item.id !== id
      );

      // ACTUALIZAR ARRAY
      setProductos(nuevaLista);
    }
  };
  // RETORNA TODO EL HTML
  return (
    <div className="container mt-5 mb-5">

      {/* CARD DEL FORMULARIO */}
      <div className="card shadow p-4 formulario">

        <h2 className="titulo mb-4">
           Productos
        </h2>

        <form onSubmit={guardarProducto}>

          <div className="row">

            {/* INPUT ID */}
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="ID Producto"
                name="id"
                value={producto.id}
                onChange={handleChange}
              />
            </div>

            {/* INPUT NOMBRE */}
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre Producto"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* TEXTAREA DESCRIPCIÓN */}
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Descripción del Producto"
              name="descripcion"
              rows="3"
              value={producto.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="row">

            {/* INPUT PRECIO COMPRA */}
            <div className="col-md-6 mb-3">
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="Precio Compra"
                name="compra"
                value={producto.compra}
                onChange={handleChange}
              />
            </div>

            {/* INPUT PRECIO VENTA */}
            <div className="col-md-6 mb-3">
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="Precio Venta"
                name="venta"
                value={producto.venta}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* BOTÓN GUARDAR */}
          <button type="submit" className="btn btn-success w-100 boton-guardar">
            Guardar Producto
          </button>

        </form>

      </div>

      {/* TABLA DE PRODUCTOS */}
      <div className="card shadow p-4 mt-5 tabla-productos">

        <h3 className="mb-4 text-center">
          Lista de Productos
        </h3>

        {
          productos.length === 0 ? (

            // MENSAJE SI NO HAY PRODUCTOS
            <div className="alert alert-warning text-center">
              No existen productos registrados
            </div>

            ) : (

            <div className="table-responsive">

              <table className="table table-hover table-bordered align-middle">

                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Compra</th>
                    <th>Venta</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>

                  {
                    productos.map((item) => (

                      <tr key={item.id}>

                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.descripcion}</td>
                        <td>${item.compra}</td>
                        <td>${item.venta}</td>

                        <td>

                          {/* BOTÓN ELIMINAR */}
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => eliminarProducto(item.id)}
                          >
                            Eliminar
                          </button>

                        </td>

                      </tr>
                    ))
                  }

                </tbody>

              </table>

            </div>
          )
        }

      </div>

    </div>
  );
}
export default App;
