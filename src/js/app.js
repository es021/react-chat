import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './chat.js';

class App extends React.Component {
    render() {
        return(<div>
            <div className="app">
                <header>This is header</header>
                <content>
                    <Chat />
                </content>
                <footer>This is footer</footer>
            </div>
        </div>);
    }
}
;

module.exports = App;

