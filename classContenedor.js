
    const fs = require('fs');
  
    class Contenedor {
        constructor (nombreArchivo){
            this.nombreArchivo = nombreArchivo;
        }
        async getAll(){
            try {
                const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
                const productos = JSON.parse(archivo);
                return productos;
                
            } catch (error) {
                console.log('Se ha producido un error en getAll()', 'error numero: ', error);
            } 
                   
        }

        async getById(id){

            try {
                const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
                const productos = JSON.parse(archivo);

                const producto = productos.find(p  => p.id === id); 
                return producto;
                
            } catch (error) {
                console.log('Se ha producido un error en getById(id)', 'error numero: ', error);
            } 
        }

        async deleteById(id){
            try {
                const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
                const productos = JSON.parse(archivo);

                const newProductos = productos.filter((data)=>data.id !== id);

                const newProductosString = JSON.stringify(newProductos);
    
                await fs.promises.writeFile(this.nombreArchivo, newProductosString)
    
            } catch (error) {
                console.log('Se ha producido un error en deleteById(id)', 'error numero: ', error);
            } 
        }

        async save(producto){
            try {
                const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8');

                let newId =0;

                if (productos.length >0){
                    const auxArray = [];

                    productos.forEach(element => {
                        auxArray.push(element.id);
                    });
                    newId = Math.max(...auxArray);
                }
                newId++;
    
                const newProducto = {...producto, id:newId};
                const auxProductos = [...productos, newProducto];
    

                const newProductosString = JSON.stringify(auxProductos);
    
                await fs.promises.writeFile(this.nombreArchivo, newProductosString)
    
                return newId;
                
            } catch (error) {
                console.log('Se ha producido un error en save()', 'error numero: ', error);
            } 
        }
    
        async deleteAll(){
            try {
                const Productos = [];
                
                const ProductosString = JSON.stringify(Productos);
    
                await fs.promises.writeFile(this.nombreArchivo, ProductosString)
    
            } catch (error) {
                console.log('Se ha producido un error en deleteAll()', 'error numero: ', error);
            } 
        }
    
    }

module.exports = Contenedor;