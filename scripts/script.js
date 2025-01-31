document.getElementById('searchBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const profileDiv = document.getElementById('profile');

    if (username) {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.message === "Not Found") {
                    profileDiv.innerHTML = `<div class="alert alert-danger" role="alert">User not Found. Please try again.</div>`;
                } else {
                    profileDiv.innerHTML = `
                        <div class="profile-card">
                            <img src="${data.avatar_url}" alt="${data.name}" class="profile-avatar">
                            <h2>${data.name}</h2>
                            <p>Username: ${data.login}</p>
                            <p>Bio: ${data.bio || 'No bio available'}</p>
                            <p>Location: ${data.location || 'No location available'}</p>
                            <p>Public Repos: ${data.public_repos}</p>
                            <p>Followers: ${data.followers}</p>
                            <p>Following: ${data.following}</p>
                            <p>Member Since: ${new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <a href="${data.html_url}" target="_blank" class="profile-link">View Profile on GitHub</a>
                        </div>
                    `;
                }
            })
            .catch(error => {
                profileDiv.innerHTML = `<div class="alert alert-danger" role="alert">Error fetching data. Please try again.</div>`;
                console.error('Error:', error);
            });
    } else {
        profileDiv.innerHTML = `<div class="alert alert-warning" role="alert">Please Enter a Username</div>`;
    }
});