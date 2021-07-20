const carrito = document.querySelector( '#carrito' ),
        contenerdorCarrito = document.querySelector( '#lista-carrito tbody' ),
        listaCursos = document.querySelector( '#lista-cursos' ),
        vaciarCarritoBtn = document.querySelector( '#vaciar-carrito' );

let articulosCarrito = [];





const cargarEvenListeners = () => {
    listaCursos.addEventListener( 'click', ( e ) => {

        e.preventDefault();
        if( e.target.classList.contains( 'agregar-carrito' ) ){
            leerDatosCurso( e.target.parentElement.parentElement );
        }
        
    } );

    carrito.addEventListener( 'click', ( e ) => {
        if( e.target.classList.contains( 'borrar-curso' ) ) {

            const cursoId = e.target.getAttribute( 'data-id' );
            articulosCarrito = articulosCarrito.filter(  ( { id } )   => id !== cursoId );
            
            carritoHTML();
        }
    });

    vaciarCarritoBtn.addEventListener( 'click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })

}

const leerDatosCurso = ( curso ) => {
    
    const infoCurso = {
        imagen: curso.querySelector( 'img' ).src,
        titulo: curso.querySelector( 'h4' ).textContent,
        precio: curso.querySelector( '.precio span' ).textContent,
        id: curso.querySelector( 'a' ).getAttribute( 'data-id' ),
        cantidad: 1,
    }

    //Estudiar esta parte...
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if ( existe ) {
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;
            }else {
                return curso;
            }
        } );
        articulosCarrito = [ ...cursos ];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso ];
    }

   
    carritoHTML();

}



const carritoHTML = () => {

    limpiarHTML();
    articulosCarrito.forEach( ( { titulo, imagen, precio, cantidad, id } ) => {

        

        const row = document.createElement( 'tr' );
        row.innerHTML = `
            <td><img src="${ imagen }" width = "100"/></td>
            <td>${ titulo }</td>
            <td>${ precio }</td>
            <td>${ cantidad }</td>

            <td><a href="#" class ="borrar-curso" data-id = "${ id }"> X </a></td>
        `;

        contenerdorCarrito.appendChild( row );

    })
}

const limpiarHTML = () => {
    //contenerdorCarrito.innerHTML = '';

    while( contenerdorCarrito.firstChild ) {
        contenerdorCarrito.removeChild( contenerdorCarrito.firstChild );
    }
};


cargarEvenListeners();

