import tmplHeader from './header.ejs';

export default async () => {
    const strHeader = tmplHeader();
    document.getElementById('app')
        .insertAdjacentHTML("beforebegin", strHeader);
}