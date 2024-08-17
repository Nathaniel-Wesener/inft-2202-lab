import Navigo from 'navigo';
import 'bootstrap';
import './scss/styles.scss';
import HeaderComponent from './app/components/header/header.js';
import FooterComponent from './app/components/footer/footer.js';
import HomePage from './app/pages/home/home.js';
import AboutPage from './app/pages/about/about.js';
import ContactPage from './app/pages/contact/contact.js';
import AddPage from './app/pages/create-product/create-product.js';
import ListPage from './app/pages/list-products/list-products.js';
import EditPage from './app/pages/edit-product/edit-product.js';

export const router = new Navigo('/')

window.addEventListener('load', () =>{
    HeaderComponent();
    FooterComponent();
    router
        .on('/', HomePage)
        .on('/about', AboutPage)
        .on('/contact', ContactPage)
        .on('/add', AddPage)
        .on('/list', ListPage)
        .on('/edit', EditPage)
        .resolve();
    
    document.addEventListener('click', (event) =>{
        if (event.target.attributes['route']) {
            event.preventDefault();
            router.navigate(event.target.attributes['route'].value);
            const params = new URL(document.location).searchParams;
            console.log(params);
            const search = params.get("page");
            const search2 = params.get("perPage");
            if (search != null || search2 != null) {
                window.location.reload();
            }

        }

        
    })
})
