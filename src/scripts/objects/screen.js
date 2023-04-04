const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `
        <div class="info">
            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário">
            <div class="data">
                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                <p class="followers"><i class="fa-solid fa-users"></i> seguidores: ${user.followers}</p>
                <p class="followers"><i class="fa-solid fa-users"></i> seguindo: ${user.following}</p>
             </div>
         </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => {

            if (repo.language === null) {
                repo.language = 'No Language'
            }

            repositoriesItens += `
            <li>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <div class="repositories-info">
                    <p><i class="fa-solid fa-code-branch"></i> ${repo.forks_count}</p>
                    <p><i class="fa-regular fa-star" style="color: #ffea00;"></i> ${repo.stargazers_count}</p>
                    <p><i class="fa-solid fa-eye"></i> ${repo.watchers_count}</p>
                    <p><i class="fa-solid fa-laptop-code"></i> ${repo.language}</p>
            </div>
        </li>`})

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `
                <div class="repositories section">
                    <h2>Repositórios</h2>
                    <ul>${repositoriesItens}</ul>
                </div>`
        } else {
            this.userProfile.innerHTML += `
                <div class="repositories section">
                    <h2>Repositórios</h2>
                    <ul>Não há repositórios</ul>
                </div>`
        }

        let eventsItens = ''
        user.events.forEach((event) => {
            if (event.type === 'CreateEvent') {
                eventsItens += `<li><p><span>${event.repo.name}</span> -${event.payload.description}</p></li>`
            } else {
                eventsItens += `<li><p><span>${event.repo.name}</span> - ${event.payload.commits[0].message}</p></li>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `
            <div class="events section">
                <h2>Eventos Recentes</h2>
                <ul>${eventsItens}</ul>
            </div>`
        } else {
            this.userProfile.innerHTML += `
            <div class="events section">
                <h2>Eventos Recentes</h2>
                <h3>Não há eventos</h3>
            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado ou não existe.</h3>"
    }
}

export { screen }