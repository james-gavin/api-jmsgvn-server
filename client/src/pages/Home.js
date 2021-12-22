import React from "react";
import Table from 'react-bootstrap/Table';
import "./Home.css"


export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isLoaded: false };
    }

    componentDidMount() {
        fetch("http://localhost:9000/api")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        server: result.server
                    });
                    console.log(this.state);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {


        if (!this.state.isLoaded) { return null; }
        const players = this.state.server.players.map((player) => (
            <tr>
                <td>{player.username}</td>
                <td>{player.kills}</td>
                <td>{player.deaths}</td>
                <td>{player.joins}</td>
            </tr>
        ));

        const playersOnline = this.state.server.playersOnline;
        const registeredPlayers = this.state.server.registeredPlayers;

        return (
            <div className="Stats">
                <div class="card">
                    <div class="card-header">
                        <b>Server Statistics</b>
                    </div>
                    <div class="card-body">
                        <p>Players online: <b>{playersOnline}</b></p>
                        <p>Registered player: <b>{registeredPlayers}</b></p>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Kills</th>
                                    <th>Deaths</th>
                                    <th>Joins</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players}
                            </tbody>
                        </Table>
                    </div>

                </div>
            </div>
        );
    }
}