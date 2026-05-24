import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  // Array para guardar productos
  const [productos, setProductos] = useState([]);
  // Objeto prar manejar formulario
  const [producto, setProducto] = useState({
    
    id: "",
    nombre: "",
    descripcion: "",
    compra: "",
    venta: "",
  });
  // entrada de datos
  const handleChange = (e) => {
    setProducto({...producto, [e.target.name]: e.target.value,});

  };
  // guardar productos
  const guardarProducto = (e) => { e.preventDefault();
    // Validar campos vacios
    if (
      producto.id === "" || producto.nombre === "" || producto.descripcion === "" || producto.compra === "" || producto.venta === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }
    // Validar precio venta > compra

    if (parseFloat(producto.venta) <= parseFloat(producto.compra)) {
      alert("El precio de venta debe ser mayor al precio de compra");
      return;
    }
    // Agregar productos a la tablas
    setProductos([...productos, producto]);

    alert("Producto guardado correctamente");
    // Limpiar formulario
    setProducto({
      id: "",
      nombre: "",
      descripcion: "",
      compra: "",
      venta: "",
    });
  };
  // Eliminar productos
  const eliminarProducto = (id) => {
    // mensaje de confirmacion
    const confirmar = window.confirm("Seguro que desea eliminar el producto ");

    if (confirmar) {
      // 
      const nuevaLista = productos.filter( (item) => item.id !== id);

      setProductos(nuevaLista);
    }
  };

  //  HtML

  return (
    <div className="container mt-5 mb-5">

      {/* Contenedor para el formulario */}
      <div className="card shadow p-4 formulario">
        <h2 className="titulo mb-4">
          Productos
        </h2>
        /* FORMULARIO */
        <form onSubmit={guardarProducto}>
          <div className="row">
            {/* Entrada iD*/}
            <div className="col-md-6 mb-3">
              <input type="text" className="form-control" placeholder="ID producto" name="id" value={producto.id}
                onChange={handleChange}
              />
            </div>
            {/* Entrada nombre */}
            <div className="col-md-6 mb-3">
              <input type="text" className="form-control" placeholder="Nombre producto" name="nombre" value={producto.nombre}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* eentrada texto descripcion */}
          <div className="mb-3">
            <textarea className="form-control" placeholder="Descripcion del producto" name="descripcion" rows="3"
              value={producto.descripcion}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            {/* Entrada precio compra */}
            <div className="col-md-6 mb-3">
              <input type="number" className="form-control" placeholder="Precio compra" name="compra" value={producto.compra}
                onChange={handleChange}
              />
            </div>
            {/* Enrtada  precio venta */}
            <div className="col-md-6 mb-3">
              <input type="number" className="form-control" placeholder="Precio venta" name="venta" value={producto.venta}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Btn guardar */}
          
          <button type="submit" className="btn btn-success w-100 boton-guardar"><i className="bi bi-save me-2"></i>
            Guardar
          </button>
        </form>
      </div>
      {/* Tabla de productos */}
      <div className="card shadow p-4 mt-5 tabla-productos">
        <h3 className="mb-4 text-center">
          Lista de Productos
        </h3>
        {
          productos.length === 0 ? (
            <div className="alert alert-warning text-center">No hay
             productos registrados</div>) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>iD</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
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
                          {/* Boton eliminar */}
                          <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(item.id)}>
                            Eliminar</button>
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