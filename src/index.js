import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/leaderboard.css'

function convertOverallBR(br) {
  if (br >= 10 ** 9) {
    br /= 10 ** 9;
    return br.toFixed(1) + 'B';
  }
  if (br >= 10 ** 7) {
    br /= 10 ** 6;
    return br.toFixed(0) + 'M';
  }
  if (br >= 10 ** 6) {
    br /= 10 ** 6;
    return br.toFixed(1) + 'M';
  }
  if (br >= 10 ** 4) {
    br /= 10 ** 4;
    return br.toFixed(0) + 'K';
  }
  if (br >= 10 ** 3) {
    br /= 10 ** 3;
    return br.toFixed(1) + 'K';
  }
  return 'X';
}

const customBackgrounds = {
  '-mg425-': 'custom/1000',
  'Skopos': 'custom/1001',
}
const getUserBackground = (username, currBackground) => {
  return customBackgrounds[username] || currBackground;
}
class LeaderboardPlayerContainer extends React.Component {
  render() {
    const data = []
    for (let i in this.props.leaderboardData) {
      data.push(this.props.leaderboardData[i]);
    }
    console.log(data);
    return (
      <div className='leaderboard-player-container'>
        {data.map((leaderboard_row, rank) => (
          <div className='leaderboard-player-row' key={rank}>
            <div className='leaderboard-rank'>{rank+1}</div>
            <div className='leaderboard-player'>
              <div className='leaderboard-player-background'>
                <img src={require(`./img/mp/player_backgrounds/${getUserBackground(leaderboard_row.username, leaderboard_row.player_background)}.webp`)} alt=''/>
              </div>
              <div className='leaderboard-player-info'>
                <div className={`leaderboard-player-name`}>{leaderboard_row.username}</div>
                <div className='leaderboard-player-overall-br'>{convertOverallBR(leaderboard_row.overall_br)}</div>
              </div>
            </div>
            <div className='leaderboard-offense'>{`${leaderboard_row.offense_wins.toLocaleString("en-US")}/${(leaderboard_row.offense_wins+leaderboard_row.offense_losses).toLocaleString("en-US")}`}</div>
            <div className='leaderboard-defense'>{`${leaderboard_row.defense_wins.toLocaleString("en-US")}/${(leaderboard_row.defense_wins+leaderboard_row.defense_losses).toLocaleString("en-US")}`}</div>
            <div className='leaderboard-br'>{leaderboard_row.battle_rating.toLocaleString("en-US")}</div>
          </div>
        ))};
      </div>
    )
  }
}

class LeaderboardContainer extends React.Component {
  render() {
    const currSeasonText = 'Batman Ninja Helmet Season: Mar 15, 2023 - Mar 22, 2023';
    return (
      <div className='leaderboard-container'>
        <div className='leaderboard-header'>
          <div className='leaderboard-status'>{currSeasonText}</div>
          <div className='leaderboard-name'>{this.props.platform} TOP 25</div>
        </div>

        <div className='leaderboard-column-headings'>
          <div className='leaderboard-column-heading'>RANK</div>
          <div className='leaderboard-column-heading'>PLAYER</div>
          <div className='leaderboard-column-heading'>OFFENSE</div>
          <div className='leaderboard-column-heading'>DEFENSE</div>
          <div className='leaderboard-column-heading'>BATTLE RATING</div>
        </div>

        <LeaderboardPlayerContainer
          leaderboardData={this.props.leaderboardData}
         /> 
      </div>
    )
  }
}

class LeaderboardPageContainer extends React.Component {
  render() {
    const context = require.context('./data/leaderboards', true, /.json$/);
    const all = {};
    context.keys().forEach((key) => {
      const fileName = key.replace('./', '');
      const resource = require(`./data/leaderboards/${fileName}`);
      const namespace = fileName.replace('.json', '');
      all[namespace] = JSON.parse(JSON.stringify(resource));
    });
    console.log(all)

    return (
      <div className='leaderboard-page-container'>
        <LeaderboardContainer
          platform={'ANDROID'}
          leaderboardData={all['ANDROID']}
        />
        <div className='middle-bar'></div>
        <LeaderboardContainer
          platform={'iOS'}
          leaderboardData={all['iOS']}
        />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LeaderboardPageContainer />);
