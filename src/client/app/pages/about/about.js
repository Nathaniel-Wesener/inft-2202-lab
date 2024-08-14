import tmplAbout from './about.ejs';

export default async () => {
    const strAbout = tmplAbout();
    document.getElementById('app')
        .insertAdjacentHTML("afterbegin", strAbout);
}