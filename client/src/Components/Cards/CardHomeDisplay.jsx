import React from 'react'

export default function CardHomeDisplay(person) {
  let first= person.expertise[0];
  let second= person.expertise[1];
  let third= person.expertise[2];
  return (
    <div className="container">
    <div className="avatar-flip">
        <img src={person.photo} height="150" width="150" />
        <img src={person.photo} height="150" width="150" />
    </div>
    <h2>{person.name}</h2>
    <h4>{person.work?person.work: `${first}, ${second}, ${third}`}</h4>
    <p>
    {person.bio
        ? person.bio
        : person.matchscore === 1
            ? <>
                It's a Match!! <br/>
                <a href='https://www.linkedin.com/mynetwork/' target='_blank' rel='noopener noreferrer'>www.linkedin.com/{person.name.toLowerCase()}</a>
              </>
            : <>
                Similar recommended  <br/> <a href='https://www.linkedin.com/mynetwork/' target='_blank' rel='noopener noreferrer'>www.linkedin.com/{person.name.toLowerCase()}</a>
              </>
    }
</p>  
</div>
  )
}
