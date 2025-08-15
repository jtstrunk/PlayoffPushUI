import React, { useState, useEffect } from "react";

type PlayerInfo = {
  name: string;
  position: string;
  team: string;
};

const initialPlayers: PlayerInfo[] = [
  { name: "Joe Burrow", position: "QB", team: "CIN" },
  { name: "Ja'marr Chase", position: "WR", team: "CIN" },
  { name: "Tee Higgins", position: "WR", team: "CIN" },
  { name: "Mike Gesicki", position: "TE", team: "CIN" },
  { name: "Chase Brown", position: "RB", team: "CIN" },
  { name: "Josh Allen", position: "QB", team: "BUF" },
  { name: "Khalil Shakir", position: "WR", team: "BUF" },
  { name: "Keon Coleman", position: "WR", team: "BUF" },
  { name: "Dalton Kincaid", position: "TE", team: "BUF" },
  { name: "James Cook", position: "RB", team: "BUF" },
  { name: "Lamar Jackson", position: "QB", team: "BAL" },
  { name: "Zay Flowers", position: "WR", team: "BAL" },
  { name: "Rashod Batemen", position: "WR", team: "BAL" },
  { name: "Mark Andrews", position: "TE", team: "BAL" },
  { name: "Derrick Henry", position: "RB", team: "BAL" },
  { name: "Patrick Mahomes", position: "QB", team: "KC" },
  { name: "Rashee Rice", position: "WR", team: "KC" },
  { name: "Xavier Worthy", position: "WR", team: "KC" },
  { name: "Travis Kelce", position: "TE", team: "KC" },
  { name: "Isiah Pacheco", position: "RB", team: "KC" },
];

const users: string[] = ["Josh", "Nate", "Sam", "Ethan"]

type Team = {
  userName: string;
  players: PlayerInfo[];
};

const initialUserTeams: Team[] = [
  {userName: users[0], players: []},
  {userName: users[1], players: []},
  {userName: users[2], players: []},
  {userName: users[3], players: []}
]

export function UserTeam(draftedTeam: Team){
  return(
    <div>
      <h1>{draftedTeam.userName}</h1>
      <div className='draft-board'>
        {draftedTeam.players.map((player) => (
          <div className='draftable-player-div'> 
            <h1>{player.name}</h1>
            <span>{player.position}</span><span> - </span><span>{player.team}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// export function DraftedPlayer({playerInformation, onRemove}: { playerInformation: PlayerInfo; onRemove: (name: string) => void; }) {
export function DraftedPlayer({playerInformation}: { playerInformation: PlayerInfo }) {
  function handleClick() {
    console.log('drafted', playerInformation.name)
    // onRemove(playerInformation.name);
  }

  return(
    <div className={`draftable-player-div ${playerInformation.position.toLowerCase()}`} onClick={handleClick}> 
      <h1>{playerInformation.name}</h1>
      <span>{playerInformation.position}</span><span> - </span><span>{playerInformation.team}</span>
    </div>
  )
}

export function Welcome() {
  const [selectedUser, setSelectedUser] = useState('current');
  const [players, setPlayers] = React.useState(initialPlayers);
  const [userTeams, setUserTeams] = useState<Team[]>(initialUserTeams);
  const { turnIndex, nextTurn } = useSnakeDraftTurns(users.length);

  function draftPlayer(draftedPlayer: PlayerInfo) {
    console.log(users[turnIndex], 'drafted', draftedPlayer.name);
    // check if they can draft the player
    setPlayers(players.filter(player => player.name !== draftedPlayer.name));
    console.log(draftedPlayer)

    setUserTeams(prevUserTeams => {
      // Find index of the current team
      const teamIndex = prevUserTeams.findIndex(team => team.userName === users[turnIndex]);
      if (teamIndex === -1) return prevUserTeams; // team not found

      // Copy the team and add drafted player
      const updatedTeam = {
        ...prevUserTeams[teamIndex],
        players: [...prevUserTeams[teamIndex].players, draftedPlayer],
      };

      // Copy the entire userTeams array replacing the updated team
      const newUserTeams = [...prevUserTeams];
      newUserTeams[teamIndex] = updatedTeam;

      return newUserTeams;
    })
    
    nextTurn();
  }


  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <h1>Draft Page</h1>
        </header>
        <div>
          <div className="test">
            <p style={{width: '86px'}}></p>
            <p style={{width: '154px', textAlign: 'center'}}>Round One</p>
            <p style={{width: '154px', textAlign: 'center'}}>Round Two</p>
            <p style={{width: '154px', textAlign: 'center'}}>Round Three</p>
            <p style={{width: '154px', textAlign: 'center'}}>Round Four</p>
            <p style={{width: '154px', textAlign: 'center'}}>Round Five</p>
            <p style={{width: '154px', textAlign: 'center'}}>Round Six</p>
            <p style={{width: '154px', textAlign: 'center'}}>Round Seven</p>
            <p style={{width: '154px', textAlign: 'center'}}>Round Eight</p>
            <p style={{width: '154px', textAlign: 'center'}}>Round Nine</p>
            <p style={{width: '154px', textAlign: 'center'}}>Round Ten</p>
          </div>
          {userTeams.map((team) => (
            <div key={team.userName} className='drafted-row'>
              <p style={{width: '80px', marginRight: '6px'}}>{team.userName}</p>
              <ul className='test'>
                {team.players.length > 0 ? (
                  team.players.map((player) => (
                    <DraftedPlayer playerInformation={player} key={player.name} />
                    // <li key={player.name}>
                    //   {player.name} - {player.position} ({player.team})
                    // </li>
                  ))
                ) : (
                  <li>No players assigned</li>
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className='bottom-feed'>
          <div className='draftable-players'>
            <ul className="custom-list">
              {players.map((player) => (
                <li key={player.name} onClick={() => draftPlayer(player)}>
                  {player.name} - {player.position} ({player.team})
                </li>
              ))}
            </ul>
          </div>
          <div className='drafted-players'>
            <div key={userTeams[turnIndex].userName}>
              <div style={{ display: 'flex', flexDirection: 'row', width: '430px', justifyContent: 'space-between' }}>
                <p onClick={() => setSelectedUser('current')} style={{ cursor: 'pointer', padding: '0 8px',
                  border: selectedUser === 'current' ? '1px solid black' : 'none'}}>Current</p>
                <p onClick={() => setSelectedUser('playerone')}style={{ cursor: 'pointer', padding: '0 8px',
                  border: selectedUser === 'playerone' ? '1px solid black' : 'none'}}>{users[0]}</p>
                <p onClick={() => setSelectedUser('playertwo')}style={{ cursor: 'pointer', padding: '0 8px',
                  border: selectedUser === 'playertwo' ? '1px solid black' : 'none'}}>{users[1]}</p>
                <p onClick={() => setSelectedUser('playerthree')}style={{ cursor: 'pointer', padding: '0 8px',
                  border: selectedUser === 'playerthree' ? '1px solid black' : 'none'}}>{users[2]}</p>
                <p onClick={() => setSelectedUser('playerfour')}style={{ cursor: 'pointer', padding: '0 8px',
                  border: selectedUser === 'playerfour' ? '1px solid black' : 'none'}}>{users[3]}</p>
              </div>
              {(() => {
                if (selectedUser == 'current') {
                  return (
                    <div>
                       <DraftedTeam playerTeam={userTeams[turnIndex]} />
                    </div>
                  )
                } else if (selectedUser == 'playerone') {
                  return (
                  <div><DraftedTeam playerTeam={userTeams[0]} /></div>
                )
                }else if (selectedUser == 'playertwo') {
                  return (
                    <div><DraftedTeam playerTeam={userTeams[1]} /></div>
                  )
                } else if (selectedUser == 'playerthree') {
                  return (
                    <div><DraftedTeam playerTeam={userTeams[2]} /></div>
                  )
                } else if (selectedUser == 'playerfour') {
                  return (
                    <div><DraftedTeam playerTeam={userTeams[3]} /></div>
                  )
                } else {
                  return (
                    <div><DraftedTeam playerTeam={userTeams[turnIndex]} /></div>
                  )
                }
              })()}
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
export function DraftedTeam({ playerTeam }: { playerTeam: Team }) {
  return (
    <div>
      <div className='test' style={{height: '64px', display: 'flex', alignItems: 'center'}}>
        <p style={{width: '26px', marginRight: '6px'}}>QB</p>
        {playerTeam.players.filter(player => player.position === "QB").map((player) => (
          <DraftedPlayer playerInformation={player} key={player.name} />
        ))}
      </div>
      <div className='test' style={{height: '64px', display: 'flex', alignItems: 'center'}}>
        <p style={{width: '26px', marginRight: '6px'}}>WR</p>
        {playerTeam.players.filter(player => player.position === "WR").map((player) => (
          <DraftedPlayer playerInformation={player} key={player.name} />
        ))}
      </div>
      <div className='test' style={{height: '64px', display: 'flex', alignItems: 'center'}}>
        <p style={{width: '26px', marginRight: '6px'}}>RB</p>
        {playerTeam.players.filter(player => player.position === "RB").map((player) => (
          <DraftedPlayer playerInformation={player} key={player.name} />
        ))}
      </div>
      <div className='test' style={{height: '64px', display: 'flex', alignItems: 'center'}}>
        <p style={{width: '26px', marginRight: '6px'}}>TE</p>
        {playerTeam.players.filter(player => player.position === "TE").map((player) => (
          <DraftedPlayer playerInformation={player} key={player.name} />
        ))}
      </div>
    </div>
  )
}


// Helpers 
function useSnakeDraftTurns(usersCount: number) {
  const [turnIndex, setTurnIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [repeatCount, setRepeatCount] = useState(0);

  function nextTurn() {
    setTurnIndex(prevIndex => {
      let nextIndex = prevIndex + direction;
      let nextRepeat = repeatCount;

      // Handle bounds and snake behavior
      if (nextIndex >= usersCount) {
        // At the end: stay two times then reverse
        if (repeatCount < 1) {
          nextRepeat++;
          setRepeatCount(nextRepeat);
          nextIndex = prevIndex; // stay on last user
        } else {
          // After repeating twice, reverse direction
          setDirection(-1);
          setRepeatCount(0);
          nextIndex = prevIndex - 1; // start going backward
        }
      } else if (nextIndex < 0) {
        // At the start: stay two times then reverse
        if (repeatCount < 1) {
          nextRepeat++;
          setRepeatCount(nextRepeat);
          nextIndex = prevIndex; // stay on first user
        } else {
          setDirection(1);
          setRepeatCount(0);
          nextIndex = prevIndex + 1; // start going forward
        }
      } else {
        // Normal advance, reset repeat count
        setRepeatCount(0);
      }

      return nextIndex;
    });
  }

  return { turnIndex, nextTurn };
}