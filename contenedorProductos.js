const fs = require("fs")
class Contenedor {
    constructor(name){
        this.filename = name;
    }

    async save(product){
        try {
            if(fs.existsSync(this.filename)){
                const productos = await this.getAll();
                if(productos.length>0){
                    //agregar producto adicional
                    const lastId =productos[productos.legth-1].id+1;
                    product.id = lastId;
                    productos.push(product);
                    await fs.promises.writeFile(this.filename,JSON.stringify(productos,null,2));
                }else{
                    //agregar primer producto
                    product.id =1;
                    await fs.promises.writeFile(this.filename,JSON.stringify([product],null,2));
                }
            } else{
                product.id =1;
                await fs.promises.writeFile(this.filename,JSON.stringify([product],null,2));
            }            
        } catch (error) {
            return"El producto no pudo ser guardado";
        }
    }

    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.filename,"utf-8")
            //console.log(contenido);
            if(contenido.length>0){
                const productos = JSON.parse(contenido);
                return productos;
            }else{
            return [];
            }
        } catch (error){
            return "El archivo no puede ser leido";
        }
    }
    async getById(id){
        try {
            const productos = await this.getAll();
            const producto = productos.find(elemento=>elemento.id === id);
            return producto;
        } catch (error) {
            return "el archivo no se encuentra";
        }
    }

    async deleteById(id){
        try {
            const productos = await this.getAll();
            const newProducts = productos.filter(elemento=>elemento.id !== id);
            await fs.promises.writeFile(this.filename,JSON.stringify(newProducts,null,2));
            return `El producto con el id: ${id} fue eliminado`;
        } catch (error) {
            return "el elemento no puede ser eliminado"
        }
    }

    getName(){
        return this.filename;
    }
}
const producto1 ={
    title: "Escuadra",
    price: 123.55,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}
const producto2 ={
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
}

const manejadorProductos = new Contenedor("productos.txt");
console.log(manejadorProductos);
const getData = async()=>{
    await manejadorProductos.save(producto1);
    await manejadorProductos.save(producto2);
    const productos = await manejadorProductos.getAll();
    console.log("productos",productos);
    const productoEncontrado = await manejadorProductos.getById(1);
    console.log("producto encontrado>", productoEncontrado)
    await manejadorProductos.deleteById(2);
}
getData()