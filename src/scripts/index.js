import { getUser } from '/src/scripts/services/user.js'
import { getRepositories } from "/src/scripts/services/repositories.js"
import { getEvents } from "/src/scripts/services/events.js"

import { user } from '/src/scripts/objects/user.js'
import { screen } from '/src/scripts/objects/screen.js'

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

document.querySelector('#btn-search').addEventListener('click', () => {
    const userName = document.querySelector('#input-search').value

    if (validateEmptyInput(userName)) return

    getUserData(userName)
})

document.querySelector('#input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressd = key === 13

    if (isEnterKeyPressd) {
        if (validateEmptyInput(userName)) return

        getUserData(userName)
    }
})

async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if (userResponse.message === 'Not Found') {
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)

    const eventsReponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsReponse)

    screen.renderUser(user)
}