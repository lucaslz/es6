import axiosConfig from './api';

class App {
    constructor () {
        this.repositories = [];
        this.formEl = document.getElementById("repo-form");
        this.inputEl = document.querySelector("input[name=repository]");
        this.listEl = document.getElementById("repo-list");
        this.registerOnSubmitHandle();
    }

    registerOnSubmitHandle() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true) {
        if (loading) {
            let span = document.createElement("span");
            span.appendChild(document.createTextNode("Carregando..."));
            span.setAttribute("id", "loading");
            this.formEl.appendChild(span);
            span.remove
        } else {
            document.getElementById("loading").remove();
        }
    }

    async addRepository(event) {
        
        event.preventDefault();

        try {
            this.setLoading();

            let nameRepo = this.inputEl.value;

            if (nameRepo.length == 0) return 0;
    
            const response = await axiosConfig.get(`/repos/${nameRepo}`);
    
            const { name , description, html_url, owner:{ avatar_url } } = response.data;
    
            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url
            });
    
            this.render();
        } catch (error) {
            console.error("Erro ao buscar dados no GitHub");
        }

        this.setLoading(false);
    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let li = document.createElement("li");

            let img = document.createElement("img");
            img.setAttribute('src', repo.avatar_url);

            let strong = document.createElement("strong");
            let titutlo = document.createTextNode(repo.name);
            strong.appendChild(titutlo);

            let p = document.createElement("p");
            let desc = document.createTextNode(repo.description);
            p.appendChild(desc);

            let link = document.createElement("a");
            link.setAttribute("target", "_blank");
            link.setAttribute("href", repo.html_url);
            let texto = document.createTextNode("Acessar");
            link.appendChild(texto);

            li.appendChild(img);
            li.appendChild(strong);
            li.appendChild(p);
            li.appendChild(link);

            this.listEl.appendChild(li);
        });
    }
}

new App();