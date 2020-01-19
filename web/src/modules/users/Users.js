import React from 'react'

function users({user}){

    return(
        <li>
            <article>
                <header>
                    <img src={user.avatar_url} alt={user.name} />
                    <div className="infos">
                        <h2>{user.name}</h2>
                        <span>{user.techs.join(', ')}</span>
                    </div>
                </header>
                    <div className="bio-user">
                    <p>{user.bio}</p>
                    <a href={`https://www.github.com/${user.github_username}`} >Perfil no github</a>
                </div>
            </article>
        </li>
    )
}

export default users