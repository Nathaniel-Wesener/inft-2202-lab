import tmplHome from './home.ejs';


export default async () => {
    const strHome = tmplHome();
    document.getElementById('app')
        .insertAdjacentHTML("afterbegin", strHome);
}