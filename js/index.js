
// Run functions once DOM content loaded

document.addEventListener('DOMContentLoaded', runFunctions);
function runFunctions() {
    fireSearch();
// insert functions here
}

// Add Event Listener to form to fire searches

function fireSearch() {
    const form = document.getElementById('github-form')
    form.addEventListener('submit', userSearch)
}

function userSearch(e){
    e.preventDefault();
    let search = e.target.children[0].value;
    fetch(`https://api.github.com/search/users?q=${search}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
        },
    })
    .then(resp => resp.json())
    .then(data => {
        const results = data["items"];
        for (let result of results) {
            const userList = document.getElementById('user-list');
            const userName = document.createElement('div');
            userName.innerHTML = `
            <li><ul><a href="#">Username: ${result["login"]}</a></li>
            <li>Avatar: ${result["avatar_url"]}</li>
            <li><a href=${result["html_url"]}>Link to Profile</a></li>
            </ul>
            <br>
             `
            userList.append(userName);
            userName.addEventListener('click', function() {
                fetch(`https://api.github.com/users/${result["login"]}/repos`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/vnd.github.v3+json",
                    },
                })
                .then(resp => resp.json())
                .then(repos => {
                    const repoContainer = document.getElementById('repos-list')
                    for(let repo of repos) {
                        const repoEntry = document.createElement('div');
                        repoEntry.innerHTML = `
                        <li>${repo["name"]}/<li>
                        <li><a href=${repo["html_url"]}>Link</a></li>
                        </div>
                        <br>
                        `
                        repoContainer.append(repoEntry);
                    }
                })
                
            })
        }
    })
}

// Might need this in above function to access variables.
function fetchRepo() {
    fetch(`https://api.github.com/users/${result["login"]}/repos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
        },
    })
    .then(resp => resp.json())
    .then(repos => {
        for(let repo of repos) {
            console.log(repo)
        }
    })

}

// for user repo get reuqest :https://api.github.com/users/${result["login"]}/repos